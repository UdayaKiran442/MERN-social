import { configureStore } from "@reduxjs/toolkit";
import { likeReducer, myPostsReducer } from "./Reducers/post";
import {
  allUsersReducers,
  followAndUnfollowUser,
  postOfFollowingReducer,
  userPosts,
  userProfile,
  userReducer,
} from "./Reducers/user";
const store = configureStore({
  reducer: {
    user: userReducer,
    postOfFollowing: postOfFollowingReducer,
    allUsers: allUsersReducers,
    like: likeReducer,
    myPosts: myPostsReducer,
    profile: userProfile,
    followAndUnfollow: followAndUnfollowUser,
    userProfilePosts: userPosts,
  },
});
export default store;
