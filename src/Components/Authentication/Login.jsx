import React from "react";
import './Login.css'

const Login = () => {
//     const inputs = document.querySelectorAll(".input");


// function addcl(){
// 	let parent = this.parentNode.parentNode;
// 	parent.classList.add("focus");
// }

// function remcl(){
// 	let parent = this.parentNode.parentNode;
// 	if(this.value == ""){
// 		parent.classList.remove("focus");
// 	}
// }


// inputs.forEach(input => {
// 	input.addEventListener("focus", addcl);
// 	input.addEventListener("blur", remcl);
// });

// const inputfocus = (e)=>{
//     e.target.parentNode
// }
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
            <div class="input-div one">
              <div class="i">
                <i class="fas fa-user"></i>
              </div>
              <div class="div">
                <h5>Username</h5>
                <input type="text" class="input" />
              </div>
            </div>
            <div class="input-div pass">
              <div class="i">
                <i class="fas fa-lock"></i>
              </div>
              <div class="div">
                <h5>Password</h5>
                <input type="password" class="input" />
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