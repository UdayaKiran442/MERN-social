const express = require('express');
const router = express.Router();
const postController = require('../controllers/post_controller');
const isAuthenticated = require('../middlewares/auth')
router.post('/posts/upload',isAuthenticated.isAuthenticated,postController.createPost);
router.get('/post/:id',isAuthenticated.isAuthenticated,postController.likeAndUnlikePost);
router.delete('/post/:id',isAuthenticated.isAuthenticated,postController.deletePost);
router.get("/posts/following",isAuthenticated.isAuthenticated,postController.getPostsOfFollowing);
router.put('/update/posts/:id',isAuthenticated.isAuthenticated,postController.updatePost);
router.put('/post/comment/:id',isAuthenticated.isAuthenticated,postController.commentOnPost);
router.delete('/post/comment/delete/:id',isAuthenticated.isAuthenticated,postController.deleteComment);
module.exports = router;