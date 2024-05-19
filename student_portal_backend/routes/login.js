const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Login=require('./../config/Login')

const router = express.Router();

// Login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = Login.findOne({email:email});
  console.log(user)
  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  // Check password
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  // Generate JWT
  const token = jwt.sign(
    { id: user.id, userType: user.userType },
    'anugrahs', // Replace with your secret key
    { expiresIn: '1h' }
  );

  res.json({ token, userType: user.userType });
});
router.post('/credentials',async(req,res)=>{
    const {email,password}=req.body;
    // Generate JWT
    const token = jwt.sign(
    {password:password},
    'anugrahs', // Replace with your secret key
    { expiresIn: '1h' }
    );
    const data=new Login({"email":email,"password":token});
    await data.save()
    res.json(req.body)

})
module.exports = router;
