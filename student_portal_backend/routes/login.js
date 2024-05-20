const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Login=require('./../config/Login')

const router = express.Router();

// Login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  Login.findOne({email:email}).then((user)=>{
  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  // Check password
  //const isMatch = bcrypt.compareSync(password, user.password);
  const isMatch = jwt.verify( user.password ,'anugrahs');
  //req.user=isMatch
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  // Generate JWT
  // const token = jwt.sign(
  //   { email: user.email, password:user.password },
  //   'anugrahs', // Replace with your secret key
  //   { expiresIn: '1h' }
  // );

  res.json({ user:isMatch.email });
  })
});
router.post('/credentials',async(req,res)=>{
    const {email,password}=req.body;
    // Generate JWT
    const token = jwt.sign(
    { email: email , password:password},
    'anugrahs', // Replace with your secret key
    { expiresIn: '10h' }
    );
    const data=new Login({"email":email,"password":token});
    await data.save()
    res.json(req.body)

})
module.exports = router;
