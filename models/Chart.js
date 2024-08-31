const mongoose = require('mongoose');

const SensorSchema = new mongoose.Schema({
  type: { type: String, required: true }, 
  readings: { type: [Number], required: true },
});

const ChartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, required: true },
  color: { type: String, required: true }, 
  sensors: [SensorSchema], 
  createdAt: { type: Date, default: Date.now }, 
});

const Chart = mongoose.model('Chart', ChartSchema);

module.exports = Chart;
