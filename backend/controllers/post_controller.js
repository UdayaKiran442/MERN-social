const Post = require("../models/post");
const User = require("../models/user");
exports.createPost = async (req, res) => {
  try {
    const newPostData = {
      caption: req.body.caption,
      image: {
        public_id: "req.body.public_id",
        url: " ",
      },
      owner: req.user._id,
    };
    const newPost = await Post.create(newPostData);
    const user = await User.findById(req.user._id);
    user.posts.push(newPost._id);
    await user.save();
    res.json(200, {
      message: "Post created successfully",
      newPost,
    });
  } catch (error) {
    res.json(500, {
      message: error.message,
    });
  }
};

exports.likeAndUnlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.json(404, {
        message: "post not found",
      });
    }
    if (post.likes.includes(req.user._id)) {
      const index = post.likes.indexOf(req.user._id);
      post.likes.splice(index, 1);
      await post.save();
      return res.json(200, {
        message: "Post unliked",
      });
    }
    post.likes.push(req.user._id);
    post.save();
    return res.json(200, {
      message: "Post liked",
    });
  } catch (error) {
    return res.json(500, {
      message: error.message,
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const user = await User.findById(req.user._id);
    if (!post) {
      return res.json(400, {
        message: "Post not found",
      });
    }
    if (post.owner._id.toString() !== req.user._id.toString()) {
      return res.json(400, {
        mesage: "Unauthorized action",
      });
    }
    await post.remove();
    user.posts.pop(post._id);
    await user.save();
    return res.json(200, {
      message: "Post deleted successfully",
      post,
    });
  } catch (error) {
    return res.json(500, {
      message: error.message,
    });
  }
};

exports.getPostsOfFollowing = async (req, res) => {
  try {
    // const user = await User.findById(req.user._id).populate("posts");
    const user = await User.findById(req.user._id);
    const posts = await Post.find({
      owner: {
        $in: user.following,
      },
    }).populate("owner likes comments.user");
    return res.json(200, {
      following: user.following,
      posts: posts.reverse(),
    });
  } catch (error) {
    return res.json(500, {
      message: error.message,
    });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.json(404, {
        message: "Post not found",
      });
    }
    if (req.user._id.toString() !== post.owner._id.toString()) {
      return res.json(401, {
        message: "UnAuthorized",
      });
    }
    post.caption = req.body.caption;
    await post.save();
    return res.json(200, {
      message: "Post updated succesfully",
    });
  } catch (error) {
    return res.json(500, {
      message: error.message,
    });
  }
};

exports.commentOnPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.json(400, {
        success: false,
        message: "Post not found",
      });
    }
    let commentExists = -1;
    //Checking if comment already exists
    post.comments.forEach((item, index) => {
      if (item.user._id.toString() === req.user._id.toString()) {
        commentExists = index;
      }
    });
    if (commentExists !== -1) {
      post.comments[commentExists].comment = req.body.comment;
      await post.save();
      return res.json(200, {
        success: true,
        message: "Comment updated succesfully",
      });
    } else {
      post.comments.push({
        user: req.user._id,
        comment: req.body.comment,
      });
      await post.save();
      return res.json(200, {
        success: true,
        message: "Comment added succesfully",
      });
    }
  } catch (error) {
    return res.json(500, {
      message: error.mesage,
    });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.json(400, {
        success: false,
        message: "Post not found",
      });
    }
    if (post.owner.toString() === req.user._id.toString()) {
    } else {
      post.comments.forEach((item, index) => {
        if (item.user.toString() === req.user._id.toString()) {
          return post.comments.splice(index, 1);
        }
      });
      await post.save();
      return res.json(200, {
        message: "Comment deleted",
        success: true,
      });
    }
  } catch (error) {
    return res.json(500, {
      success: false,
      message: error.mesage,
    });
  }
};
