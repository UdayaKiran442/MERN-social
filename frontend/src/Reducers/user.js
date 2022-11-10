import { createReducer } from "@reduxjs/toolkit";
const initialState = {
  isAuthenticated: false,
};

export const userReducer = createReducer(initialState, {
  loginRequest: (state) => {
    state.loading = true;
  },
  loginSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  loginFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  registerRequest: (state) => {
    state.loading = true;
  },
  registerSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  registerFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },
  updateProfileRequest: (state) => {
    state.loading = true;
  },
  updateProfileSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  updateProfileFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  logOutUserRequest: (state) => {
    state.loading = true;
  },
  logOutUserSuccess: (state, action) => {
    state.loading = false;
    state.user = null;
    state.isAuthenticated = false;
  },
  logOutUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = true;
  },
  loadUserRequest: (state) => {
    state.loading = true;
  },
  loadUserSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  loadUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});

export const postOfFollowingReducer = createReducer(initialState, {
  postsOfFollowingRequests: (state) => {
    state.loading = true;
  },
  postsOfFollowingSuccess: (state, action) => {
    state.loading = false;
    state.posts = action.payload;
  },
  postsOfFollowingFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});

export const allUsersReducers = createReducer(initialState, {
  allUsersRequests: (state) => {
    state.loading = true;
  },
  allUsersSuccess: (state, action) => {
    state.loading = false;
    state.users = action.payload;
  },
  allUsersFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});

export const userProfile = createReducer(initialState, {
  userProfileRequests: (state) => {
    state.loading = true;
  },
  userProfileSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
  },
  userProfileFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});

export const followAndUnfollowUser = createReducer(initialState, {
  followAndUnfollowRequests: (state) => {
    state.loading = true;
  },
  followAndUnfollowSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  followAndUnfollowFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});
