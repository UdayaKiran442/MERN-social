import { configureStore } from "@reduxjs/toolkit";
import { likeReducer } from "./Reducers/post";
import {
  allUsersReducers,
  postOfFollowingReducer,
  userReducer,
} from "./Reducers/user";
const store = configureStore({
  reducer: {
    user: userReducer,
    postOfFollowing: postOfFollowingReducer,
    allUsers: allUsersReducers,
    like: likeReducer,
  },
});
export default store;
