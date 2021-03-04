const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const areaSchema = new Schema({
  title: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
});

module.exports = mongoose.model('Area', areaSchema);
