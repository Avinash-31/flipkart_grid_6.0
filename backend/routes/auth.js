const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    console.log("user saved");
    
    res.status(201).send('User registered');
  } catch (error) {
    console.log("Error registering");
    
    res.status(400).send(error);
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).send('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ userId: user._id }, 'avinash31803', { expiresIn: '1h' });
    console.log("User logged in");
    
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;