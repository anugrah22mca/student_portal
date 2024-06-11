const express = require('express');
const router = express.Router();
const multer = require('multer');
const Student = require('../config/Student');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

router.post('/submit', upload.single('offerDocument'), async (req, res) => {
  const studentData = req.body;
  if (req.file) {
    studentData.offerDocument = req.file.path; // Save file path to the database
  }
  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { email: studentData.email },
      { $set: studentData },
      { upsert: true, new: true }
    );
    res.status(200).json({ message: 'Form submitted successfully', student: updatedStudent });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit form' });
  }
});

router.get('/:stream', async (req, res) => {
  const { stream } = req.params;
  try {
    const students = await Student.find({ stream });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
