const mongoose = require('mongoose');

const schoolSchema = mongoose.Schema({
  schoolID: {type: String, required: true},
  schoolname: {type: String, required: true},
  address: {type: String, required: true},
  city: {type: String, required: true},
});

module.exports = mongoose.model('School', schoolSchema);
