const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const mongoURL='mongodb+srv://portal:student@clusterlibrary.5fslb.mongodb.net/studentPortal?retryWrites=true&w=majority&appName=ClusterLibrary'
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const studentRoutes = require('./routes/student');
app.use('/api/students', studentRoutes);
const loginRoutes = require('./routes/login');
app.use('/api/auth', loginRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
