const express = require('express');
const Sensor = require('../models/Sensor'); // Adjust the path based on your folder structure

const router = express.Router();

// Get all sensors
router.get('/sensors', async (req, res) => {
  try {
    const sensors = await Sensor.find();
    res.status(200).json(sensors);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
