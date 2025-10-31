// server/controllers/postController.js
const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = new Post({ title, content });
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.json(post);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}
exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        if (req.body.title !== undefined) post.title = req.body.title;
        if (req.body.content !== undefined) post.content = req.body.content;
        const updated = await post.save();
        res.json(updated);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.json({ message: 'Post deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};










      








