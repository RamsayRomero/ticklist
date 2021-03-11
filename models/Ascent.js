const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ascentSchema = new Schema({
  user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  name: { type: String, required: true },
  grade: { type: String, required: true },
  rating: { type: Number, required: true },
  area: { type: mongoose.Types.ObjectId, required: true, ref: 'Area' },
  beta: { youtube: String, instagram: String },
  flash: { type: Boolean, default: false },
  fa: { type: Boolean, default: false },
  date: { type: Date, required: true },
});

module.exports = mongoose.model('Ascent', ascentSchema);
