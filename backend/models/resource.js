const mongoose = require('mongoose');

const resourceSchema = mongoose.Schema({
  resID: {type: String, required: true},
  description: {type: String, required: true},
  quantity: {type: Number, required: true},
  resourceType: {type: String, required: true},
  school: {type: String, required: true},
  status: {type:String, required: true}
});

module.exports = mongoose.model('Resource', resourceSchema);
