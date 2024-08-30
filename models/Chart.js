//  const mongoose = require('mongoose');

// const chartSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   type: { type: String, required: true },
//   color: { type: String, required: true },
//   data: [
//     {
//       sensor: { type: String, required: true },
//       readings: { type: [Number], required: true },
//     },
//   ],
//   createdAt: {
//     type: Date,
//     default: Date.now, // Automatically set createdAt to the current date
//   },
// });

// const Chart = mongoose.model('Chart', chartSchema);

// module.exports = Chart;


// const chartSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   type: { type: String, required: true },
//   color: { type: String, required: true },
//   data: [
//     {
//       name: { type: String, required: true }, // Sensor name
//       readings: { type: [Number], required: true }, // Array of numbers
//     },
//   ],
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const Chart = mongoose.model('Chart', chartSchema);

// module.exports = Chart;


const mongoose = require('mongoose');

const SensorSchema = new mongoose.Schema({
  type: { type: String, required: true }, // Sensor type, e.g., 'temperature', 'humidity'
  readings: { type: [Number], required: true }, // Array of readings
});

const ChartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the user who created the chart
  type: { type: String, required: true }, // Chart type, e.g., 'bar', 'line'
  color: { type: String, required: true }, // Chart color
  sensors: [SensorSchema], // Array of sensors with their readings
  createdAt: { type: Date, default: Date.now }, // Date when the chart was created
});

const Chart = mongoose.model('Chart', ChartSchema);

module.exports = Chart;
