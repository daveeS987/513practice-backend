'use strict';

import Pusher from 'pusher';

const pusher = new Pusher({
  appId: process.env.PUSHER_APPID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: 'us2',
  useTLS: true,
});

export default pusher;
