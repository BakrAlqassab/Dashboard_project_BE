const mongoose = require('mongoose');
const Sensor = require('./models/Sensor'); // Ensure the path is correct
require('dotenv').config();
const dummySensors = [
    {
      type: 'temperature',
      readings: [22, 23, 21, 22, 24, 23, 25],
    },
    {
      type: 'humidity',
      readings: [45, 44, 43, 46, 47, 48, 49],
    },
    {
      type: 'light',
      readings: [300, 320, 310, 330, 340, 350, 360],
    },
  ];

  
  // Function to insert dummy sensors into the database
  const insertDummySensors = async () => {
    try {
      await Sensor.insertMany(dummySensors);
      console.log('Dummy sensors inserted successfully');
      mongoose.connection.close(); // Close the connection after insertion
    } catch (error) {
      console.error('Failed to insert dummy sensors:', error);
      mongoose.connection.close(); // Ensure connection closes even on error
    }
  };

// Connect to MongoDB and run the insert function

  mongoose.connect(process.env.DATABASE_URL).then(() => {
    console.log('MongoDB connected...');
    insertDummySensors();
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });





  