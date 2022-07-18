import React, { useState } from "react";
import './Login.css'

const Login = () => {
const [username, setusername] = useState()
const [password, setpassword] = useState()
const [userfocus, setuserfocus] = useState()
const [passfocus, setpassfocus] = useState()
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
            <div class={`input-div one ${userfocus}`}>
              <div class="i">
                <i class="fas fa-user"></i>
              </div>
              <div class="div">
                <h5>Username</h5>
                <input type="text" class="input" 
                  value={username}
                  onChange={(e)=>setusername(e.target.value)}
                  onFocus={()=>setuserfocus('focus')}
                  onBlur={()=>setuserfocus('')}
                />
              </div>
            </div>
            <div class={`input-div one ${passfocus}`}>
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
            <a href="#">Forgot Password?</a>
            <input type="submit" class="btn" value="Login" />
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
