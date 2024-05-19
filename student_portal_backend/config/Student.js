const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  email: String,
  name: String,
  studentId: String,
  stream: String,
  photo: String,
  placementRegistered: Boolean,
  placementId: String,
  attendedInterviews: Boolean,
  interestArea: [String],
  receivedOffer: Boolean,
  offerDocument: String,
});

const Student = mongoose.model('Student', studentSchema);
module.exports=Student;
