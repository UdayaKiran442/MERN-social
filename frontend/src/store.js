import { configureStore } from "@reduxjs/toolkit";
import { postOfFollowingReducer, userReducer } from "./Reducers/user";
const store = configureStore({
  reducer: {
    user: userReducer,
    postOfFollowing: postOfFollowingReducer,
  },
});
export default store;
