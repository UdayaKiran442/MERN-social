import { configureStore } from "@reduxjs/toolkit";
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
  },
});
export default store;
