// server.js
const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

app.use(cors());
app.use(express.json());

// Import book routes
const bookRoutes = require('./routes/bookRoutes');
app.use('/api/books', bookRoutes);

// Import borrow routes
const borrowRoutes = require('./routes/borrowRoutes');
app.use('/api/borrows', borrowRoutes);

// Import member routes
const memberRoutes = require('./routes/memberRoutes');
app.use('/api/members', memberRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Library Management Backend Running ✅');
});

app.listen(5000, () => {
  console.log('🚀 Server running at http://localhost:5000');
  console.log('✅ Connected to MySQL Database');
});