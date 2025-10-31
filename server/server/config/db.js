const mongoose = require('mongoose');

async function connectDB(uri) {
  const mongoUri = uri || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/blogdb';
  const opts = {
    // sensible defaults; mongoose v7 ignores deprecated options
    serverSelectionTimeoutMS: 5000
  };

  let attempts = 0;
  const maxAttempts = 5;
  const retryDelay = 3000;

  while (attempts < maxAttempts) {
    try {
      await mongoose.connect(mongoUri, opts);
      console.log('MongoDB connected:', mongoUri);
      return;
    } catch (err) {
      attempts += 1;
      console.error(`MongoDB connection attempt ${attempts} failed:`, err.message);
      if (attempts >= maxAttempts) {
        console.error('Exceeded max MongoDB connection attempts. Exiting.');
        process.exit(1);
      }
      console.log(`Retrying in ${retryDelay / 1000}s...`);
      await new Promise(res => setTimeout(res, retryDelay));
    }
  }
}

module.exports = connectDB;