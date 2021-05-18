'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

const server = require('./server.js');
// import pusher from './pusher.js';

// DB config
mongoose.connect(process.env.MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

/*
mongoose.connection.once('open', () => {
  console.log('DB Connected');

  const changeStream = mongoose.connection.collection('posts').watch();
  changeStream.on('change', (change) => {
    console.log('change stream triggered');
    console.log(change);
    console.log('End of Change');

    if (change.operationType === 'insert') {
      const postDetails = change.fullDocument;
      console.log('POSTDETAILS:', postDetails);
      pusher.trigger('posts', 'inserted', {
        message: 'pusher got triggered',
      });
    } else {
      console.log('Unknown trigger from pusher');
    }
  });
});
*/

server.start(process.env.PORT);
