import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Post from "../Post/Post";
import User from "../User/User";
import "./Home.css";
import { getFollowingPosts } from "../../Actions/user";

export const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFollowingPosts());
  }, []);
  return (
    <div className="home">
      <div className="homeleft">
        <Post
          caption={"This is sample post"}
          ownerImage={
            "https://t4.ftcdn.net/jpg/00/65/77/27/240_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
          }
          ownerName={"codewithme"}
        />
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
  );
};
