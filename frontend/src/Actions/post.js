import apiInstance from "./api";

export const likePost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "likeRequest",
    });
    const { data } = await apiInstance.get(`/post/${id}`);
    dispatch({
      type: "likeSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "likeFailure",
      payload: error.response.data.message,
    });
  }
};
