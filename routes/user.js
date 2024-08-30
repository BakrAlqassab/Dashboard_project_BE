const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path based on your folder structure
require('dotenv').config();

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    
      delete user.password
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'User registered successfully' ,user ,token});
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


// User login
router.post('/login', async (req, res) => {
    try {
      const {email,password } = req.body;
  
      // Check if the user exists
      const user = await User.findOne({ email });
      
      if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }
  
      // Check the password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }
  
      // Generate a JWT token using the secret from the environment variable
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      // console.log("JWT Secret Used:", process.env.JWT_SECRET);

      // Return the token to the client

      delete user.password
 
      res.status(200).json({user ,token });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });


  const authMiddleware = require('../middleware/auth');

// Protected route example
router.get('/me', authMiddleware, async (req, res) => {
  res.send(req.user);
});

module.exports = router;
