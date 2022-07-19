import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginuseraction } from "../../Actions/useraction";
import './Login.css'

const Login = () => {

  const dispatch = useDispatch()
  const Navigate = useNavigate()
  const {loading, isAuthenticated, user} = useSelector(state=>state.User)

const [email, setemail] = useState()
const [password, setpassword] = useState()
const [userfocus, setuserfocus] = useState()
const [passfocus, setpassfocus] = useState()

useEffect(() => {
  if(isAuthenticated){
    Navigate('/admin')
  }
}, [isAuthenticated])

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
    <div className="logincontainer">
        
      <img class="wave" src="/wave.png" />
      <div class="container">
        <div class="img">
          <img src="/Masterji_Logo_green.png" />
        </div>
        <div class="login-content">
          <form action="index.html">
            <img src="/avatar.svg" />
            <h2 class="title">Welcome</h2>
            <div class={`input-div one ${userfocus || (email && 'focus')}`}>
              <div class="i">
                <i class="fas fa-user"></i>
              </div>
              <div class="div">
                <h5>Email</h5>
                <input type="text" class="input" 
                  value={email}
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
                  value={password}
                  onChange={(e)=>setpassword(e.target.value)}
                  onFocus={()=>setpassfocus('focus')}
                  onBlur={()=>setpassfocus('')}
                  />
              </div>
            </div>
            <a href="/forgot">Forgot Password?</a>
            <input type="submit" class="btn" value="Login" disabled={false} onClick={loginhandle}/>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
