'use strict';

import Model from '../mongo.js';
import schema from './instagramPost-schema.js';

class InstagramPosts extends Model {
  constructor() {
    super(schema);
  }
}

export default InstagramPosts;
