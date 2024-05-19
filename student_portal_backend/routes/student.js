const express = require('express');
const router = express.Router();
const Student = require('../config/Student');

router.post('/submit', async (req, res) => {
  const studentData = req.body;
  try {
    const student = new Student(studentData);
    await student.save();
    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit form' });
  }
});

module.exports = router;
