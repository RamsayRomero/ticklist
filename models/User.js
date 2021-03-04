const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  avatar: String,
  ascents: [{ type: mongoose.Types.ObjectId, ref: 'Ascent' }],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
