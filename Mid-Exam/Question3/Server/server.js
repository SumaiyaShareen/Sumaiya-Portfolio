const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken'); // For generating JWT token

// Initialize express app
const app = express();

// Enable CORS for all origins
app.use(cors());

// Middleware to parse JSON data in request body
app.use(express.json());

// MongoDB connection URI
const mongoURI = 'mongodb://localhost:27017/jobListings'; // Replace with your MongoDB URI

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Define a Mongoose schema for the "users" collection
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

// Create a Mongoose model for users
const User = mongoose.model('User', userSchema);

// API endpoint for user registration
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

// API endpoint for user login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });

    res.json({ message: 'Login successful', token, user });
  } catch (err) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

// API endpoint for fetching all jobs (as before)
app.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.find();  // Find all jobs in the jobs collection
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching jobs' });
  }
});

// Example of job routes (already present in your code)
app.get('/jobs/:id', async (req, res) => {
  const jobId = req.params.id;
  try {
    const job = await Job.findById(jobId);
    if (job) {
      res.json(job);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error fetching job' });
  }
});

// Example job creation route (as before)
app.post('/jobs', async (req, res) => {
  const { title, description, location, company, salary } = req.body;
  try {
    const newJob = new Job({ title, description, location, company, salary });
    await newJob.save();
    res.status(201).json({ message: 'Job created successfully', job: newJob });
  } catch (err) {
    res.status(500).json({ error: 'Error creating job' });
  }
});

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
