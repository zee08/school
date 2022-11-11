const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const adminSchema = mongoose.Schema({
  userID: {type: String, required: true},
  username: {type: String, required: true, unique:true},
  password: {type: String, required: true},
  fullname: {type: String, required: true},
  email: {type: String, required: true},
  phone: {type: Number, required: true},
  staffid: {type: String, required: true},
  position: {type: String, required: true},
  schoolID: {type: String, required: true},
  role: {type: String, required: true},



})

adminSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Admin',adminSchema);
