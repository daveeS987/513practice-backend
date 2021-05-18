'use strict';

import mongoose from 'mongoose';
require('mongoose-schema-jsonschema')(mongoose);

const instance = mongoose.Schema({
  caption: String,
  user: String,
  image: String,
  comments: [],
});

export default mongoose.model('instagramPost', instance);
