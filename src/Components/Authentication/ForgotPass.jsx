import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ForgotPassword } from "../../Actions/useraction";
import Metadata from '../Metadata'
import './ForgotPass.css'

const ForgotPass = () => {
  const dispatch = useDispatch()
  const Navigate = useNavigate()
  const {loading, success, error, message} = useSelector(state=>state.ForgotPassword)

const [email, setemail] = useState()
const [emailfocus, setemailfocus] = useState()

const forgothandle = (e)=>{
  e.preventDefault()
  if(email){
    const data = {email}
    dispatch(ForgotPassword(data))
  }
}
  return (
    <>
    <Metadata title='Forgot Password | Admin | Masterji'/>


    <div className="forgotcontainer">
        
      <img class="wave" src="/wave.png" />
      <div class="container">
        <div class="img">
          <img src="/Masterji_Logo_green.png" />
        </div>
        <div class="forgot-content">
          <form action="index.html">
            <img src="/avatar.svg" />
            <h2 class="title">Forgot Password?</h2>
            <div class={`input-div one ${emailfocus || (email && 'focus')}`}>
              <div class="i">
                <i class="fas fa-user"></i>
              </div>
              <div class="div">
                <h5>Email</h5>
                <input type="text" class="input" 
                  value={email || ''}
                  onChange={(e)=>setemail(e.target.value)}
                  onFocus={()=>setemailfocus('focus')}
                  onBlur={()=>setemailfocus('')}
                />
              </div>
            </div>
            <input type="submit" class="btn" value="Continue" disabled={loading ? true : false} onClick={forgothandle}/>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default ForgotPass