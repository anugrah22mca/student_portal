const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Login = require("./../config/Login");

const router = express.Router();

// Login route
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  Login.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Verify password using JWT
    try {
      jwt.verify(user.password, password);
      res.json({ user: user.email, userType: user.userType, stream: user.stream });
    } catch (error) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
  });
});

router.post("/credentials", async (req, res) => {
  const { email, password, userName, stream, url, Id, userType } = req.body;

  // Generate JWT token using password as payload
  const token = jwt.sign(
    { email: email },
    password,
    { expiresIn: '7d' }
  );

  const data = new Login({
    email: email,
    password: token,
    stream: stream,
    Id: Id,
    userName: userName,
    url: url,
    userType: userType
  });

  await data.save();
  res.json(req.body);
});

module.exports = router;
