var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImageSchema = new Schema({
  id: String,
  title: String,
  description: String,
  datetime: Number,
  type: String,
  animated: Boolean,
  width: Number,
  height: Number,
  size: Number,
  views: Number,
  bandwidth: Number,
  deletehash: String,
  name: String,
  section: String,
  link: String,
  gifv: String,
  mp4: String,
  mp4_size: Number,
  looping: Boolean,
  favorite: Boolean,
  nsfw: Boolean,
  vote: String,
  in_gallery: Boolean,
  is_album: Boolean
},
{ strict: false }
);

ImageSchema.index({ '$**': 'text' });

module.exports = mongoose.model('Image', ImageSchema);
