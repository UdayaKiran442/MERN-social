const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post',
    }],
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User', 
    }],
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }],
    avatar:{
        public_id:String,
        url:String
    }
})

const User = mongoose.model('Post',userSchema);
module.exports = User;