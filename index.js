'use strict';

import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

import server from './server.js';
import pusher from './pusher.js';

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

server.start(process.env.PORT);
