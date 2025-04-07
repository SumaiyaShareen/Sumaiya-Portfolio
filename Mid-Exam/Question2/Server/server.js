const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// 🔹 MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('✅ Connected to MongoDB'));

// 🔹 Job Schema & Model
const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  description: String,
  requirements: String,
  apply_link: String,
  logo: String,
});

const Job = mongoose.model('Job', jobSchema);

// 🔹 Function to Fetch & Store Jobs in MongoDB
const fetchAndStoreJobs = async () => {
  try {
    const response = await fetch('https://jsonfakery.com/jobs'); // 🔹 API URL
    const jobs = await response.json();

    for (const job of jobs) {
      // Avoid duplicate jobs based on title & company
      const existingJob = await Job.findOne({ title: job.title, company: job.company });
      if (!existingJob) {
        await Job.create(job);
      }
    }

    console.log('✅ Jobs fetched & stored in MongoDB!');
  } catch (error) {
    console.error('❌ Error fetching jobs:', error);
  }
};

// 🔹 API to Get Stored Jobs for React Native App
app.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: '❌ Error fetching jobs from MongoDB' });
  }
});

// 🔹 Fetch & Store Jobs on Server Start
fetchAndStoreJobs();

// 🔹 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
