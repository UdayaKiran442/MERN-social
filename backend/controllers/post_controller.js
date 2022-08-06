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

exports.likeAndUnlikePost = async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.json(404,{
                message:"post not found"
            })
        }
        if(post.likes.includes(req.user._id)){
            const index = post.likes.indexOf(req.user._id);
            post.likes.splice(index,1);
            await post.save();
            return res.json(200,{
                message:"Post unliked"
            })
        }
        post.likes.push(req.user._id);
        post.save()
        return res.json(200,{
            message:"Post liked"
        })
    } catch (error) {
        return res.json(500,{
            message:error.message
        })
    }
}

exports.deletePost = async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        const user = await User.findById(req.user._id)
        if(!post){
            return res.json(400,{
                message:"Post not found"
            })
        }
        if(post.owner._id.toString() !== req.user._id.toString()){
            return res.json(400,{
                mesage:"Unauthorized action"
            })
        }
        await post.remove();
        user.posts.pop(post._id)
        await user.save()
        return res.json(200,{
            message:"Post deleted successfully",
            post
        })
    } catch (error) {
        return res.json(500,{
            message:error.message
        })
    }
}