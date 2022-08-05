const Post = require('../models/post');
const User = require('../models/user');
exports.createPost = async (req,res)=>{
    try {
        const newPostData = {
            caption:req.body.caption,
            image:{
                public_id:"req.body.public_id",
                url:" "
            },
            owner:req.user._id
        }
        const newPost = await Post.create(newPostData);
        const user = await User.findById(req.user._id);
        user.posts.push(newPost._id);
        await user.save()
        res.json(200,{
            message:"Post created successfully",
            newPost
        })
    } catch (error) {
        res.json(500,{
            message:error.message
        })
    }
}