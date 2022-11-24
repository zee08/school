const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  userID: {type: String,  require: true},
  username: {type: String, require: true, unique: true},
  password: {type: String, require: true},
  fullname: {type: String, require: true},
  email: {type: String, require: true},
  phone: {type: Number, require: true},
  occupation: {type: String, require: true},
  position: {type: String, require: false},
  dateofbirth: {type: String, require: true},
staffid: {type: String, require: false},
schoolname: {type: String, require: true},
schoolID: {type: String, require: true},
city:{type:String, require:true},
 role: {type: String, require: true},
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User',userSchema);

