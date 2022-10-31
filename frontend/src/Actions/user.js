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
    document.cookie = `token=${data.token}`;
  } catch (error) {
    dispatch({
      type: "loginFailure",
      payload: error,
    });
  }
};
