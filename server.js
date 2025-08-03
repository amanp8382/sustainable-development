// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/yourProjectDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a User schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // serve your frontend files

// Routes
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  // Save user to database
  const user = new User({ username, password });
  await user.save();
  
  res.send('User signed up successfully!');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, password });
  if (user) {
    res.send('Login successful!');
  } else {
    res.status(401).send('Invalid credentials');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
