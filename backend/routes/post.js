const express = require('express');
const router = express.Router();
const postController = require('../controllers/post_controller');
const isAuthenticated = require('../middlewares/auth')
router.post('/posts/upload',isAuthenticated.isAuthenticated,postController.createPost);
module.exports = router;