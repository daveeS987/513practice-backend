'use strict';

// import Pusher from 'pusher';
const Pusher = require('Pusher');

const pusher = new Pusher({
  appId: process.env.PUSHER_APPID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: 'us2',
  useTLS: true,
});

module.exports = pusher;
