export const loaduseraction = (data) => async (dispatch) => {
    try {
      dispatch({ type: 'LOAD_USER_REQUEST' });
  
    //   const { data } = await axios.get("/api/v1/me");
      // console.log(data)
  
      dispatch({
        type: 'LOAD_USER_SUCCESS',
        payload: data.user,
      });
    } catch (error) {
      // console.log(error.response)
      dispatch({
        type: 'LOAD_USER_FAIL',
        // payload: error.response.data.message,
      });
    }
  };