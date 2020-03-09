const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Post = new Schema({
  title: String,
  body: String
}, {
  collection: 'posts'
});

module.exports = mongoose.model('Post', Post);