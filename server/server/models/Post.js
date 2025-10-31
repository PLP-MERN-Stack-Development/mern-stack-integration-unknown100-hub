const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  image: { type: String },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }]
}, {
  timestamps: true // createdAt & updatedAt managed by mongoose
});

module.exports = mongoose.model('Post', postSchema);