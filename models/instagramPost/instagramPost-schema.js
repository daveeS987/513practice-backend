'use strict';

const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);

const instance = mongoose.Schema({
  caption: String,
  user: String,
  image: String,
  comments: [],
});

module.exports = mongoose.model('instagramPost', instance);
