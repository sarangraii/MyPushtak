const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const bookRoutes = require('./routes/bookRoutes');
require('dotenv').config();

const app = express();

// Connect to MongoDB (optional - using hardcoded data for simplicity)
connectDB();

// Middleware
app.use(cors({
  origin: ['https://mypushtak.netlify.app/']
}));
app.use(express.json());

// Routes
app.use('/api', bookRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'MyPustak API is running!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
