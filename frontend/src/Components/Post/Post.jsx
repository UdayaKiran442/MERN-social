import { Avatar, Button, Typography, Dialog } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./Post.css";
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline,
} from "@mui/icons-material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCommentOnPost, likePost } from "../../Actions/post";
import { useEffect } from "react";
import User from "../User/User";
import CommentCard from "../CommentCard/CommentCard";
// import { getFollowingPosts } from "../../Actions/user";
const Post = ({
  postId,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
  isDelete = false,
  isAccount = false,
}) => {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const [likesUser, setLikesUser] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [commentToggle, setCommentToggle] = useState(false);
  const { error, message } = useSelector((state) => state.like);
  const { user } = useSelector((state) => state.user);
  const handleLike = () => {
    setLiked(!liked);
    dispatch(likePost(postId));
    // dispatch(getFollowingPosts());
  };
  const addCommentHandler = () => {
    dispatch(addCommentOnPost(postId, commentValue));
    window.location.reload(true);
  };
  useEffect(() => {
    if (error) {
      alert(error);
    }
    if (message) {
      alert(message);
    }
  }, [error, message]);
  useEffect(() => {
    likes.forEach((item) => {
      if (item._id === user._id) {
        setLiked(true);
      }
    });
  }, [likes, user._id]);

  return (
    <div className="post">
      <div className="postHeader">
        {isAccount ? (
          <Button>
            <MoreVert />
          </Button>
        ) : null}
      </div>
      <img src={postImage} alt="Post" srcset="" />
      <div className="postDetails">
        <Avatar
          src={ownerImage}
          alt="User"
          sx={{
            height: "3vmax",
            width: "3vmax",
          }}
        />
        <Link to={`/user/${ownerId}`}>
          <Typography fontWeight={700}>{ownerName}</Typography>
        </Link>
        <Typography
          fontWeight={100}
          color="rgba(0,0,0,0.582)"
          style={{ alignSelf: "center" }}
        >
          {caption}
        </Typography>
      </div>
      <button
        style={{
          border: "none",
          backgroundColor: "white",
          cursor: "pointer",
          margin: "1vmax 2vmax",
        }}
        onClick={() => {
          setLikesUser(!likesUser);
        }}
        disabled={likes.length === 0 ? true : false}
      >
        <Typography>{likes.length} likes</Typography>
      </button>
      <div className="postFooter">
        <Button onClick={handleLike}>
          {liked ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />}
        </Button>
        <Button
          onClick={() => {
            setCommentToggle(!commentToggle);
          }}
        >
          <ChatBubbleOutline />
        </Button>
        <Button>{isDelete ? <DeleteOutline /> : null}</Button>
      </div>
      <Dialog open={likesUser} onClose={() => setLikesUser(!likesUser)}>
        <div className="DialogBox">
          <Typography variant="h4">Liked By</Typography>
          {likes.map((like) => (
            <User
              key={like._id}
              userId={like._id}
              name={like.name}
              avatar={like.avatar.url}
            />
          ))}
        </div>
      </Dialog>
      <Dialog
        open={commentToggle}
        onClose={() => setCommentToggle(!commentToggle)}
      >
        <div className="DialogBox">
          <Typography variant="h4">Comments</Typography>
          <form className="commentForm" onSubmit={addCommentHandler}>
            <input
              type="text"
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              placeholder="Comment Here"
              required
            />
            <Button type="submit" variant="contained">
              Add comment
            </Button>
          </form>
          {/* comment card */}
          {comments.length > 0 ? (
            comments.map((item) => (
              <CommentCard
                key={item._id}
                userId={item.user._id}
                name={item.user.name}
                avatar={item.user.avatar.url}
                comment={item.comment}
                commentId={item._id}
                isAccount={isAccount}
                postId={postId}
              />
            ))
          ) : (
            <Typography>Not comments yet</Typography>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default Post;
