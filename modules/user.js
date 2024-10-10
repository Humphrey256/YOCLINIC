const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String },
  contact: { type: String },
  address: { type: String }
});

module.exports = mongoose.model('User ', userSchema);