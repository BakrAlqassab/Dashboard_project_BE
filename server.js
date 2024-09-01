const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const cors = require('cors');

app.use(cors());
app.options('*', cors());
app.use(express.json());

// Import routes
const userRoutes = require('./routes/user');
const sensorRoutes = require('./routes/sensor');
const chartRoutes = require('./routes/chart');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api', sensorRoutes);
app.use('/api', chartRoutes);

// MongoDB Atlas Connection
mongoose.connect(process.env.DATABASE_URL).then(() => {
  console.log('MongoDB connected...');
}).catch(err => {
  console.error('Connection error', err.message);
});

// Basic Route
app.get('/', (req, res) => {
  res.send('API Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
