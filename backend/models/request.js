const mongoose = require('mongoose');

const requestSchema = mongoose.Schema({
  reqID:{type:String, require:true},
  description: {type:String, require:true},
  quantity:{type:Number, require:true},
  resourceType:{type:String, require:true},
  tutDescription:{type:String, require:true},
  tutdate:{type:Date, require:true},
  time:{type:String, require:true},
  studentLevel: {type:String, require:true},
   numOfStudents: {type:Number, require:true},
   reqDate:{type:Date, default:mongoose.now, require:true},
   schoolname:{type:String, require:true},
   schoolID:{type:String, require:false},
   city:{type:String, require:true},
   status: {type:String, require:true},
    remarks:{type:String, require:true},
  reqType:{type:String, require:true},
  username:{type:String, require:true}
});

module.exports = mongoose.model('Request', requestSchema);
