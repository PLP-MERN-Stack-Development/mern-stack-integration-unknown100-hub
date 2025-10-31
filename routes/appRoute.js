const express = require('express');
const router = express.Router();
const userController = require('../models/userController');
const postController = require('../models/postController'); // Assuming you have a postController

// Routes for user operations
router.route('/users')
    .get(userController.getAllUsers)
    .post(userController.createUser);

router.route('/users/:id')
    .get(userController.getUserById)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

// Routes for blog posts
router.route('/posts')
    .get(postController.getAllPosts)
    .post(postController.upload, postController.createPost); // <- add upload middleware

router.route('/posts/:id')
    .get(postController.getPostById)
    .put(postController.upload, postController.updatePost) // <- add upload middleware
    .delete(postController.deletePost);

// Routes for user registration and login
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

module.exports = router;







