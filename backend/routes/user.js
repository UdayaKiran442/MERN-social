const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const isAuthenticated = require('../middlewares/auth')
router.post('/register',userController.register);
router.get('/login',userController.login);
router.get('/follow/:id',isAuthenticated.isAuthenticated,userController.followUser);
router.get('/logout',userController.logOut);
router.put('/update/password',isAuthenticated.isAuthenticated,userController.updatePassword);
router.put('/update/profile',isAuthenticated.isAuthenticated,userController.updateProfile);
router.delete('/delete/profile',isAuthenticated.isAuthenticated,userController.deleteProfile);
module.exports = router