const User = require('../models/user');
module.exports.register = async (req,res)=>{
    try {
        const {name,email,password} = req.body;
        let user = await User.findOne({email});
        if(user){
            return res.json(404,{
                message:"User already exists",
            })
        }
        user = await User.create({name,email,password,avatar:{public_id:"Sample id",url:"Sample url"}}) 
        console.log(user);
        return res.json(200,{
            message:user
        })
    } catch (error) {
        return res.json(500,{
            message:"Internal server error"
        })
    }
}

module.exports.login = async (req,res)=>{
    try {
        const {email,password} = req.body;
        console.log(email,password)
        const user = await User.findOne({email}).select('+password');
        if(!user){
            return res.json(400,{
                message:'User doesnot exist'
            }) 
        }
        const isMatch = await user.matchPassword(password)
        if(!isMatch){
            return res.json(400,{
                message:"Invalid username/password"
            })
        }
        const opts = {
            expires:new Date(Date.now() + 90*24*60*60*1000),
            httpOnly:true
        }
        const token = user.generateToken()
        res.cookie("token",token,opts).json(200,{
            message:"Login successful",
            user,
            token
        })
    } catch (error) {
        return res.json(500,{
            message:error.message,
            
        })
    }
}

exports.logOut = (req,res)=>{
    try {
        return res.status(200).cookie("token",null,{
            expires:new Date(Date.now()),
            httpOnly:true
        }).json({
            message:"Log out successful"
        })
    } catch (error) {
        return res.json(500,{
            message:error.message
        })
    }
}

exports.followUser = async (req,res)=>{
    try {
        const userToFollow = await User.findById(req.params.id);
        const loggedInUser = await User.findById(req.user._id);
        if(!userToFollow){
            return res.json(404,{
                message:"User not found"
            })
        }
        if(loggedInUser.following.includes(userToFollow._id)){
            const indexFollowing = loggedInUser.following.indexOf(userToFollow._id);
            loggedInUser.following.splice(indexFollowing,1);
            const indexFollowers = userToFollow.followers.indexOf(loggedInUser._id);
            userToFollow.followers.splice(indexFollowers,1);
            await loggedInUser.save();
            await userToFollow.save();
            
            return res.json(200,{
                message:"User unfollowed"
            })
        }
        loggedInUser.following.push(userToFollow._id);
        userToFollow.followers.push(loggedInUser._id);
        await loggedInUser.save();
        await userToFollow.save();    
        return res.json(200,{
            message:"Following user successfully"
        })
    } catch (error) {
        return res.json(500,{
            message:error.message
        })
    }
}