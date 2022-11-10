import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUserProfile } from "../../Actions/user";
import Loader from "../Loader/Loader";
import Post from "../Post/Post";
import { Avatar, Button, Dialog, Typography } from "@mui/material";
// import { Link } from "react-router-dom";
import User from "../User/User";
import { useState } from "react";
import { useParams } from "react-router-dom";
const UserProfile = () => {
  const dispatch = useDispatch();
  const {
    error: likeError,
    message,
    // loading: deleteLoading,
  } = useSelector((state) => state.like);
  const { loading, error, posts } = useSelector((state) => state.myPosts);
  const { user } = useSelector((state) => state.profile);
  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);
  const [following, setFollowing] = useState(false);
  const [myProfile, setMyProfile] = useState(false);
  const params = useParams();

  useEffect(() => {
    dispatch(getUserProfile(params.id));
  }, [dispatch, params.id]);
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
              ownerImage={post.owner.avatar.url}
              ownerName={post.owner.name}
              ownerId={post.owner._id}
              isAccount={true}
              isDelete={true}
            />
          ))
        ) : (
          <Typography>User had not made any posts yet</Typography>
        )}
      </div>
      <div className="accountright">
        <Avatar
          src={user?.avatar?.url}
          sx={{ height: "8vmax", width: "8vmax" }}
        ></Avatar>
        <Typography variant="h6">{user?.name}</Typography>
        <div>
          <button onClick={() => setFollowersToggle(!followersToggle)}>
            <Typography>Followers</Typography>
          </button>
          <Typography>{user?.followers.length}</Typography>
        </div>
        <div>
          <button onClick={() => setFollowingToggle(!followingToggle)}>
            <Typography>Following</Typography>
          </button>
          <Typography>{user?.following.length}</Typography>
        </div>
        <div>
          <Typography>Posts</Typography>
          <Typography>{user?.posts.length}</Typography>
        </div>

        {myProfile ? null : (
          <Button variant="contained">
            {following ? "Unfollow" : "Follow"}
          </Button>
        )}
        <Dialog
          open={followersToggle}
          onClose={() => setFollowersToggle(!followersToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Followers</Typography>
            {user && user?.followers.length > 0 ? (
              user.followers.map((follower) => (
                <User
                  key={follower._id}
                  userId={follower._id}
                  name={follower?.name}
                  avatar={follower.avatar?.url}
                />
              ))
            ) : (
              <Typography>You have no followers</Typography>
            )}
          </div>
        </Dialog>
        <Dialog
          open={followingToggle}
          onClose={() => setFollowingToggle(!followingToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Following</Typography>
            {user && user?.following.length > 0 ? (
              user.following.map((follower) => (
                <User
                  key={follower._id}
                  userId={follower._id}
                  name={follower?.name}
                  avatar={follower.avatar?.url}
                />
              ))
            ) : (
              <Typography>You are not following anyone</Typography>
            )}
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default UserProfile;
