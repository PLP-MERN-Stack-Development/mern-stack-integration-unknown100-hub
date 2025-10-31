const path = require('path');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
connectDB(process.env.MONGODB_URI || 'mongodb://localhost:27017/blogdb');

const postsRoute = require('./routes/posts');
const categoriesRoute = require('./routes/categories');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// api
app.use('/api/posts', postsRoute);
app.use('/api/categories', categoriesRoute);
app.get('/api/health', (req, res) => res.json({ ok: true }));

// error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));