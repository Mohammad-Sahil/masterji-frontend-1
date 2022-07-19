import axios from "axios";

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
  export const loginuseraction = (entereddata) => async (dispatch) => {
    try {
      dispatch({ type: 'LOGIN_REQUEST' });
  
      const config = { headers: { "Content-Type": "application/json" } };
      const {data} = await axios.post("https://us-central1-masterji-online.cloudfunctions.net/app/auth/v2/login", entereddata, config);
      // console.log(data)
      // let data = entereddata
  
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAIL',
        payload: error.response.data.message,
      });
    }
  };