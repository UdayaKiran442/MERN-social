const Post = require("../models/post");
const User = require("../models/user");
const crypto = require("crypto");
const { sendEmail } = require("../middlewares/sendEmail");
const cloudinary = require("cloudinary").v2;
module.exports.register = async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.json(404, {
        message: "User already exists",
      });
    }
    const myCloud = await cloudinary.uploader.upload(avatar, {
      folder: "avatars",
    });
    user = await User.create({
      name,
      email,
      password,
      avatar: { public_id: myCloud.public_id, url: myCloud.secure_url },
    });
    console.log(user);
    return res.json(200, {
      message: "Account created successfully",
      user,
    });
  } catch (error) {
    return res.json(500, {
      message: "Internal server error",
    });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.json(400, {
        message: "User doesnot exist",
      });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.json(400, {
        message: "Invalid username/password",
      });
    }
    const opts = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    const token = user.generateToken();
    res.json(200, {
      message: "Login successful",
      user,
      token,
    });
  } catch (error) {
    return res.json(500, {
      message: error.message,
    });
  }
};

exports.logOut = (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({
        message: "Log out successful",
      });
  } catch (error) {
    return res.json(500, {
      message: error.message,
    });
  }
};

exports.followUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const loggedInUser = await User.findById(req.user._id);
    if (!userToFollow) {
      return res.json(404, {
        message: "User not found",
      });
    }
    if (loggedInUser.following.includes(userToFollow._id)) {
      const indexFollowing = loggedInUser.following.indexOf(userToFollow._id);
      loggedInUser.following.splice(indexFollowing, 1);
      const indexFollowers = userToFollow.followers.indexOf(loggedInUser._id);
      userToFollow.followers.splice(indexFollowers, 1);
      await loggedInUser.save();
      await userToFollow.save();

      return res.json(200, {
        message: "User unfollowed",
      });
    }
    loggedInUser.following.push(userToFollow._id);
    userToFollow.followers.push(loggedInUser._id);
    await loggedInUser.save();
    await userToFollow.save();
    return res.json(200, {
      message: "Following user successfully",
    });
  } catch (error) {
    return res.json(500, {
      message: error.message,
    });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("+password");
    const { oldPassword, newPassword } = req.body;
    const isMatch = await user.matchPassword(oldPassword);
    if (!oldPassword || !newPassword) {
      return res.json(400, {
        message: "Please provide old password || new password",
      });
    }
    if (!isMatch) {
      return res.json(404, {
        message: "Wrong old password",
      });
    }
    user.password = newPassword;
    await user.save();
    return res.json({
      message: "Password updated succesfully",
    });
  } catch (error) {
    return res.json(500, {
      message: error.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { name, email } = req.body;
    if (!name || !email) {
      return res.json(400, {
        message: "Please enter name or email",
      });
    }
    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    //USER avatar TODO
    user.save();
    return res.json(200, {
      message: "Profile updated",
    });
  } catch (error) {
    return res.json(500, {
      message: error.message,
    });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const posts = user.posts;
    const userId = user._id;
    const followers = user.followers;
    const following = user.following;
    await user.remove();
    res.status(200).cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    //Delete all posts of the user
    for (let i = 0; i < posts.length; i++) {
      const post = await Post.findById(posts[i]);
      post.remove();
    }
    for (let i = 0; i < followers.length; i++) {
      const follower = await User.findById(followers[i]);
      const index = follower.following.indexOf(userId);
      follower.following.splice(index, 1);
      await follower.save();
    }
    for (let i = 0; i < following.length; i++) {
      const follows = await User.findById(followers[i]);
      const index = follows.following.indexOf(userId);
      follows.following.splice(index, 1);
      await follows.save();
    }

    res.json(200, {
      message: "Profile deleted",
    });
  } catch (error) {
    return res.json(500, {
      message: error.message,
    });
  }
};

exports.myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "posts followers following"
    );
    return res.json(200, {
      user,
    });
  } catch (error) {
    res.json(500, {
      message: error.message,
    });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("posts");
    if (!user) {
      return res.json(404, {
        message: "User not found",
      });
    }
    return res.json(200, {
      user,
    });
  } catch (error) {
    return res.json(500, {
      message: error.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const user = await User.find({});
    return res.json(200, {
      user,
    });
  } catch (error) {
    return res.json(500, {
      message: error.message,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.json(400, {
        success: false,
        message: "User not found",
      });
    }
    const resetPasswordToken = user.getResetPasswordToken();
    await user.save();
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/password/reset/${resetPasswordToken}`;
    const message = `Reset your password by clicking on below link: \n\n ${resetUrl} `;
    try {
      await sendEmail({
        email: user.email,
        subject: "Reset Password",
        message,
      });
      return res.json(200, {
        success: true,
        message: `Email sent to ${user.email}`,
      });
    } catch (error) {
      user.resetPasswordExpire = undefined;
      user.resetPasswordToken = undefined;
      await user.save();
      return res.json(500, {
        message: error.message,
      });
    }
  } catch (error) {
    return res.json(500, {
      success: false,
      message: error.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      return res.json(401, {
        success: false,
        message: "Token is invalid or expired",
      });
    }
    user.password = req.body.password;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    await user.save();
    return res.json(200, {
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    return res.json(500, {
      message: error.message,
    });
  }
};

exports.myPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const posts = [];
    for (let i = 0; i < user.posts.length; i++) {
      const post = await Post.findById(user.posts[i]).populate(
        "likes comments.user owner"
      );
      posts.push(post);
    }
    return res.json(200, {
      success: true,
      posts,
    });
  } catch (error) {
    return res.json(500, {
      success: false,
      message: error.message,
    });
  }
};
