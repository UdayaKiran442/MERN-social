import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../Post/Post";
import User from "../User/User";
import "./Home.css";
import { getFollowingPosts } from "../../Actions/user";
import Loader from "../Loader/Loader";
import { Typography } from "@mui/material";

export const Home = () => {
  const dispatch = useDispatch();
  const { loading, posts, error } = useSelector(
    (state) => state.postOfFollowing
  );
  useEffect(() => {
    dispatch(getFollowingPosts());
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="home">
          <div className="homeleft">
            {posts && posts.length > 0 ? (
              posts.map((post, index) => (
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
                />
              ))
            ) : (
              <Typography variant="h6">No posts yet</Typography>
            )}
          </div>
          <div className="homeright">
            <User
              userId={"userId"}
              name={"user.name"}
              avatar={
                "https://t4.ftcdn.net/jpg/00/65/77/27/240_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
              }
            />
          </div>
        </div>
      )}
    </>
  );
};
