import axios from "axios";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const loaduseraction = () => async (dispatch) => {
    try {
      dispatch({ type: 'LOAD_USER_REQUEST' });
      
      const config = {headers: {
        authorization: String(cookies.get('jwt')),
        mode: "no-cors",
      }}
      // const {data} = await axios.get("https://us-central1-masterji-online.cloudfunctions.net/app/auth/v2/me",config);
      // console.log(data)
  let data= {user : {
    name:'Shera',
    email:'sheraofficials@gmail.com',
    role:'Admin'
  }}
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
      cookies.set('jwt',data.token,{path:'/'})
  
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: data.user[0],
      });
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAIL',
        payload: error.response.data.message,
      });
    }
  };
  export const registeruseraction = (entereddata) => async (dispatch) => {
    try {
      dispatch({ type: 'REGISTER_USER_REQUEST' });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.post("https://us-central1-masterji-online.cloudfunctions.net/app/auth/v2/register", entereddata, { config });
      console.log(data)
  
      dispatch({
        type: 'REGISTER_USER_SUCCESS',
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: 'REGISTER_USER_FAIL',
        payload: error.response.data.message,
      });
    }
  };