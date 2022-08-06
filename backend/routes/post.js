const express = require('express');
const router = express.Router();
const postController = require('../controllers/post_controller');
const isAuthenticated = require('../middlewares/auth')
router.post('/posts/upload',isAuthenticated.isAuthenticated,postController.createPost);
router.get('/post/:id',isAuthenticated.isAuthenticated,postController.likeAndUnlikePost);
module.exports = router;