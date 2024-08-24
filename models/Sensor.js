const mongoose = require('mongoose');

const SensorSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  readings: [{
    value: {
      type: Number,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  }],
});

module.exports = mongoose.model('Sensor', SensorSchema);
