const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    caption:{
        type:String
    },
    image:{
        public_id:{
            type:String,
        },
        url:{
            type:String,
        },
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    likes:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
    }],
    comments:[{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
        },
        comment:{
            type:String,
            required:true
        }
    }]
},{
    timestamps:true
})

const Post = mongoose.model('Post',postSchema);
module.exports = Post;