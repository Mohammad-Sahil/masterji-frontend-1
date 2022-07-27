import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { ForgotPassword } from "../../Actions/useraction";
import Metadata from '../Metadata'
import './ForgotPass.css'

const ForgotPass = () => {
  const dispatch = useDispatch()
  const Navigate = useNavigate()
  const {loading, error, message} = useSelector(state=>state.ForgotPassword)

const [email, setemail] = useState()
const [emailfocus, setemailfocus] = useState()

useEffect(() => {
  if(message){
    toast.success(message)
    setTimeout(() => {
      Navigate('/login')
    }, 1000);
  }
  if(error){
    toast.error(error)
  }
}, [message])


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
  <ToastContainer/>
    

    <div className="forgotcontainer">
        
      <img class="wave" src="/Wave_Yellow.png" />
      <div class="container">
        <div class="img">
          <img src="/Masterji_Logo_yellow.png" />
        </div>
        <div class="forgot-content">
          <form action="index.html">
            <img src="/avatar.png" />
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