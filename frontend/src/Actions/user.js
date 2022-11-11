import apiInstance from "./api";
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "loginRequest",
    });
    const { data } = await apiInstance.post("/login", { email, password });
    dispatch({
      type: "loginSuccess",
      payload: data.user,
    });
    localStorage.setItem("token", data.token);
  } catch (error) {
    dispatch({
      type: "loginFailure",
      payload: error,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "loadUserRequest",
    });
    const { data } = await apiInstance.get("/myprofile");
    dispatch({
      type: "loadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "loadUserFailure",
      payload: error,
    });
  }
};

export const getFollowingPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: "postsOfFollowingRequests",
    });
    const { data } = await apiInstance.get("/posts/following");
    dispatch({
      type: "postsOfFollowingSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "postsOfFollowingFailure",
      payload: error.response.data.message,
    });
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: "allUsersRequest",
    });
    const { data } = await apiInstance.get("/allusers");
    dispatch({
      type: "allUsersSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "allUsersFailure",
      payload: error.response.data.message,
    });
  }
};

export const getMyPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: "myPostsRequests",
    });
    const { data } = await apiInstance.get("/myposts");
    dispatch({
      type: "myPostsSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "myPostsFailure",
      payload: error.response.data.message,
    });
  }
};

export const logOutUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "logOutUserRequest",
    });
    // const { data } = await apiInstance.post("/login", { email, password });
    localStorage.setItem("token", null);
    dispatch({
      type: "logOutUserSuccess",
    });
  } catch (error) {
    dispatch({
      type: "logOutUserFailure",
      payload: error,
    });
  }
};

export const registerUser =
  (name, email, password, avatar) => async (dispatch) => {
    try {
      dispatch({
        type: "registerRequest",
      });
      const { data } = await apiInstance.post("/register", {
        name,
        email,
        password,
        avatar,
      });
      dispatch({
        type: "registerSuccess",
        payload: data.user,
      });
      localStorage.setItem("token", data.token);
    } catch (error) {
      dispatch({
        type: "registerFailure",
        payload: error,
      });
    }
  };

export const updateUserProfile = (name, email, avatar) => async (dispatch) => {
  try {
    dispatch({
      type: "updateProfileRequest",
    });
    const { data } = await apiInstance.post("/update/profile", {
      name,
      email,
      avatar,
    });
    dispatch({
      type: "updateProfileSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "updateProfileFailure",
      payload: error,
    });
  }
};

export const updatePassword =
  (oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({
        type: "updatePasswordRequest",
      });
      const { data } = await apiInstance.post("/update/password", {
        oldPassword,
        newPassword,
      });
      dispatch({
        type: "updatePasswordSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "updatePasswordFailure",
        payload: error,
      });
    }
  };

export const deleteMyProfile = () => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProfileRequest",
    });
    const { data } = await apiInstance.delete("/delete/profile", {});
    dispatch({
      type: "deleteProfileSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteProfileFailure",
      payload: error,
    });
  }
};

export const getUserProfile = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "userProfileRequest",
    });
    const { data } = await apiInstance.get(`/userprofile/${id}`);
    dispatch({
      type: "userProfileSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "userProfileFailure",
      payload: error,
    });
  }
};

export const followAndUnfollowProfile = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "followAndUnfollowRequests",
    });
    const { data } = await apiInstance.get(`/follow/${id}`);
    dispatch({
      type: "followAndUnfollowSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "followAndUnfollowFailure",
      payload: error,
    });
  }
};

export const getUserPosts = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "userPostsRequests",
    });
    const { data } = await apiInstance.get(`/user/posts/${id}`);
    dispatch({
      type: "userPostsSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "userPostsFailure",
      payload: error,
    });
  }
};
