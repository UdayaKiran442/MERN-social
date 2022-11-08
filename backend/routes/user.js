const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");
const isAuthenticated = require("../middlewares/auth");
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get(
  "/follow/:id",
  isAuthenticated.isAuthenticated,
  userController.followUser
);
router.get("/logout", userController.logOut);
router.post(
  "/update/password",
  isAuthenticated.isAuthenticated,
  userController.updatePassword
);
router.post(
  "/update/profile",
  isAuthenticated.isAuthenticated,
  userController.updateProfile
);
router.delete(
  "/delete/profile",
  isAuthenticated.isAuthenticated,
  userController.deleteProfile
);
router.get(
  "/myprofile",
  isAuthenticated.isAuthenticated,
  userController.myProfile
);
router.get(
  "/userprofile/:id",
  isAuthenticated.isAuthenticated,
  userController.getUserProfile
);
router.get(
  "/allusers",
  isAuthenticated.isAuthenticated,
  userController.getAllUsers
);
router.post("/forgot/password", userController.forgotPassword);
router.put("/password/reset/:token", userController.resetPassword);
router.get("/myposts", isAuthenticated.isAuthenticated, userController.myPosts);
module.exports = router;
