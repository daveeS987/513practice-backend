'use strict';

const Model = require('../mongo.js');
const schema = require('./instagramPost-schema.js');

class InstagramPosts extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = InstagramPosts;
