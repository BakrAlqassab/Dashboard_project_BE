const express = require('express');
const Chart = require('../models/Chart');
const auth = require('../middleware/auth'); // Import the middleware

const router = express.Router();

// Create a new chart
router.post('/charts', auth, async (req, res) => {
  try {
      const { type, color, sensors } = req.body; // Extract the sensors from the request body
      const userId = req.user.userId; // userId from the decoded token
      const chart = new Chart({
          user: userId,
          type,
          color,
          data: sensors, // Assign the sensors array to the data field
      });

      await chart.save();

      res.status(201).json({ message: 'Chart created successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
});
// Get all charts for the logged-in user
router.get('/charts', auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const charts = await Chart.find({ user: userId }).populate('user');
    res.status(200).json(charts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});
  

// Update
router.put('/charts/:id', auth, async (req, res) => {
  try {
    const { type, color, data } = req.body;
    const chartId = req.params.id;
    const userId = req.user.userId;

    // Find the chart and check if the user is the owner
    const chart = await Chart.findOne({ _id: chartId, user: userId });
    if (!chart) {
      return res.status(404).json({ message: 'Chart not found' });
    }

    chart.type = type;
    chart.color = color;
    chart.data = data;

    await chart.save();

    res.status(200).json({ message: 'Chart updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


// Delete a chart
router.delete('/charts/:id', auth, async (req, res) => {
  try {
      const chartId = req.params.id;
      const userId = req.user.userId;

      // Find the chart and check if the user is the owner
      // const chart = await Chart.findOne({ _id: chartId, user: userId });
      // if (!chart) {
      //     return res.status(404).json({ message: 'Chart not found' });
      // }

  // Find the chart and check if the user is the owner
  const chart = await Chart.findOneAndDelete({ _id: chartId, user: userId });
  // or 
  // const chart = await Chart.deleteOne({ _id: chartId, user: userId });
      if (!chart) {
          return res.status(404).json({ message: 'Chart not found' });
      }

      res.status(200).json({ message: 'Chart deleted successfully' });
      // await chart.remove(); Not working

          

  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
});
  
  
  

module.exports = router;
