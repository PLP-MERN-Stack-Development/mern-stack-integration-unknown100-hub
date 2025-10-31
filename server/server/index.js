// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const postRoutes = require('./routes/postRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/posts', postRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.listen(5000, () => console.log('Server running on port 5000'));
