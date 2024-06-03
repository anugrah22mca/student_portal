const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
  email: String,
  userName: String,
  stream:String,
  Id: String,
  password: String,
  userType:String,
  url:String,
});

const Login = mongoose.model('Login', loginSchema);
module.exports=Login;
