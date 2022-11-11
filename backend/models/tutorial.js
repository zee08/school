const mongoose = require('mongoose');
const { timestamp } = require('rxjs');

const tutorialSchema = mongoose.Schema({
  tutID: {type: String, required: true},
  description: {type: String, required: true},
  date: {type: Date, default: Date.now, required: true},
  time: {type: String, required: true},
  numOfStudents: {type: Number, required: true},
  studentLevel: {type: String, required: true},
  status: {type:String, required: true},
  school: {type: String, required: true}
});

module.exports = mongoose.model('Tutorial', tutorialSchema);
