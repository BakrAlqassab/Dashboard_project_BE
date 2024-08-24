const mongoose = require('mongoose');

const chartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  data: [
    {
      name: String,
      data: [Number],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set createdAt to the current date
  },
});

const Chart = mongoose.model('Chart', chartSchema);

module.exports = Chart;
