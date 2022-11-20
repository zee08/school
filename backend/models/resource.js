const mongoose = require('mongoose');

const resourceSchema = mongoose.Schema({
  resID: {type: String, required: true},
  description: {type: String, required: true},
  quantity: {type: Number, required: true},
  resourceType: {type: String, required: true},
  schoolname: {type: String, required: true},
  schoolID:{type:String, required:true},
  status: {type:String, required: true},
  // creator: {type: mongoose.Schema.Types.ObjectId,
  //   ref: "User", required: true}
});

module.exports = mongoose.model('Resource', resourceSchema);
