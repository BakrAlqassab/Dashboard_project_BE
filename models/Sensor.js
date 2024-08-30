// const mongoose = require('mongoose');

// const SensorSchema = new mongoose.Schema({
//   type: {
//     type: String,
//     required: true,
//   },
//   readings: [{
//     value: {
//       type: Number,
//     },
//     timestamp: {
//       type: Date,
//       default: Date.now,
//     },
//   }],
// });

// module.exports = mongoose.model('Sensor', SensorSchema);


const mongoose = require('mongoose');

const SensorSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Automatically generate _id
  type: { type: String, required: true }, // Sensor type, e.g., 'temperature', 'humidity'
  readings: { type: [Number], required: true }, // Array of readings
});

const Sensor = mongoose.model('Sensor', SensorSchema);

module.exports = Sensor;
