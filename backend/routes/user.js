const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const isAuthenticated = require('../middlewares/auth')
router.post('/register',userController.register);
router.get('/login',userController.login);
router.get('/follow/:id',isAuthenticated.isAuthenticated,userController.followUser)
module.exports = router