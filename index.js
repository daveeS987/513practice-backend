import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Pusher from 'pusher';

import dbModel from './dbModel.js';

// app config
dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

const pusher = new Pusher({
  appId: '1203482',
  key: 'da2ec1cce9c3a1c021c7',
  secret: 'd8e13cbad941f50e6bdb',
  cluster: 'us2',
  useTLS: true,
});

// middlewares
app.use(express.json());
app.use(cors());

// DB config
mongoose.connect(process.env.MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log('DB Connected');

  const changeStream = mongoose.connection.collection('posts').watch();
  changeStream.on('change', (change) => {
    console.log('change stream triggered');
    console.log(change);
    console.log('End of Change');

    if (change.operationType === 'insert') {
      console.log('Triggering Pusher ***Img Upload');

      const postDetails = change.fullDocument;
      pusher.trigger('posts', 'inserted', {
        user: postDetails.user,
        caption: postDetails.caption,
        image: postDetails.image,
      });
    } else {
      console.log('Unknown trigger from pusher');
    }
  });
});

// api routes
app.get('/', (req, res) => res.status(200).send('hello world'));

app.post('/upload', (req, res) => {
  const body = req.body;

  dbModel.create(body, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get('/sync', (req, res) => {
  dbModel.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// listen
app.listen(port, () => console.log(`listening on port: ${port}`));
