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
