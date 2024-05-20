const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  body: String,
});

const Note = mongoose.model('note', noteSchema);
module.exports = Note