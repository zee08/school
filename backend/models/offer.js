const mongoose = require('mongoose');

const offerSchema = mongoose.Schema({
  offerID: {type:String, required:false},
  offerDate:{type:Date, default:mongoose.now, required:true},
  request:{type:String, required:false},
  username: {type:String, required:true},
  status: {type:String, required:false},
  remarks:{type:String, required:true},

});
module.exports = mongoose.model('Offer', offerSchema);
