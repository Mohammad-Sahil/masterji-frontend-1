import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { loginuseraction } from "../../Actions/useraction";
import Metadata from "../Metadata";
import './Login.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

  const dispatch = useDispatch()
  const Navigate = useNavigate()
  const {loading, isAuthenticated, user,error} = useSelector(state=>state.User)

const [email, setemail] = useState()
const [password, setpassword] = useState()
const [userfocus, setuserfocus] = useState()
const [passfocus, setpassfocus] = useState()

useEffect(() => {
  if(isAuthenticated){
    toast.success('Login Successfull!')
    setTimeout(() => {
      
      Navigate('/admin')
    }, 1000);
  }
  if(error){
    toast.error(error)
  }
}, [isAuthenticated,error,toast,Navigate])

const loginhandle = (e)=>{
  e.preventDefault()
  const data = {
    email,
    password
  }
  dispatch(loginuseraction(data))
}

  return (
    <>
    <Metadata title='Login | Admin | Masterji'/>
    <ToastContainer/>
    <div className="logincontainer">
        
      <img class="wave" src="/Wave_Yellow.png" />
      <div class="container">
        <div class="img">
          <img src="/Masterji_Logo_yellow.png" />
        </div>
        <div class="login-content">
          <form action="index.html">
            <img src="/avatar.png" />
            <h2 class="title">Welcome</h2>
            <div class={`input-div one ${userfocus || (email && 'focus')}`}>
              <div class="i">
                <i class="fas fa-user"></i>
              </div>
              <div class="div">
                <h5>Email</h5>
                <input type="text" class="input" 
                  value={email || ''}
                  onChange={(e)=>setemail(e.target.value)}
                  onFocus={()=>setuserfocus('focus')}
                  onBlur={()=>setuserfocus('')}
                />
              </div>
            </div>
            <div class={`input-div one ${passfocus || (password && 'focus')}`}>
              <div class="i">
                <i class="fas fa-lock"></i>
              </div>
              <div class="div">
                <h5>Password</h5>
                <input type="password" class="input" 
                  value={password || ''}
                  onChange={(e)=>setpassword(e.target.value)}
                  onFocus={()=>setpassfocus('focus')}
                  onBlur={()=>setpassfocus('')}
                  />
              </div>
            </div>
            <NavLink to="/forgot">Forgot Password?</NavLink>
            <input type="submit" class="btn" value="Login" disabled={loading ? true :false} onClick={loginhandle}/>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
