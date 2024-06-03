const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  email: String,
  userName: String,
  Id: String,
  stream: String,
  url: String,
  userType:String,
  password:String,
  placementRegistered: Boolean,
  placementId: String,
  attendedInterviews: Boolean,
  interestArea: [String],
  receivedOffer: Boolean,
  offerDocument: String,
});

const Student = mongoose.model('Student', studentSchema);
module.exports=Student;
