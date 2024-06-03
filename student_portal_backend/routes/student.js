const express = require('express');
const router = express.Router();
const Student = require('../config/Student');

router.post('/submit', async (req, res) => {
  const studentData = req.body;
  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { email: studentData.email },
      { $set: studentData },
      { upsert: true, new: true }
    );
    // const student = new Student(studentData);
    // await student.save();
    res.status(200).json({ message: 'Form submitted successfully',student: updatedStudent });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit form' });
  }
});
router.get('/:stream', async (req, res) => {
  const { stream } = req.params;
  try {
    const students = await Student.find({ stream:stream });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});
module.exports = router;
