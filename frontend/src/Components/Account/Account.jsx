import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Account.css";
import { getMyPosts } from "../../Actions/user";
import Loader from "../Loader/Loader";
import Post from "../Post/Post";
import { Avatar, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
const Account = () => {
  const dispatch = useDispatch();
  const {
    error: likeError,
    message,
    // loading: deleteLoading,
  } = useSelector((state) => state.like);
  const { loading, error, posts } = useSelector((state) => state.myPosts);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);
  useEffect(() => {
    if (error) {
      alert(error);
      dispatch({ type: "clearErrors" });
    }

    if (likeError) {
      alert(likeError);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert(message);
      dispatch({ type: "clearMessage" });
    }
  }, [error, message, likeError, dispatch]);
  return loading ? (
    <Loader />
  ) : (
    <div className="account">
      <div className="accountleft">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              caption={post.caption}
              postImage={post.image.url}
              likes={post.likes}
              comments={post.comments}
              //   ownerImage={post.owner.avatar.url}
              //   ownerName={post.owner.name}
              //   ownerId={post.owner._id}
            />
          ))
        ) : (
          <Typography>No posts Yet</Typography>
        )}
      </div>
      <div className="accountright">
        <Avatar
          src={user.avatar.url}
          sx={{ height: "8vmax", width: "8vmax" }}
        ></Avatar>
        <Typography variant="h6">{user.name}</Typography>
        <div>
          <button>
            <Typography>Followers</Typography>
          </button>
          <Typography>{user.followers.length}</Typography>
        </div>
        <div>
          <button>
            <Typography>Following</Typography>
          </button>
          <Typography>{user.following.length}</Typography>
        </div>
        <div>
          <Typography>Posts</Typography>
          <Typography>{user.posts.length}</Typography>
        </div>
        <Button variant="contained">Logout</Button>
        <Link to={`/update/profile`}>Edit Profile</Link>
        <Link to={`/update/password`}>Change Password</Link>
      </div>
    </div>
  );
};

export default Account;
