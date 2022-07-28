import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { resetPassword } from '../../Actions/useraction'
import Metadata from '../Metadata'

const ResetPass = () => {
    
  const dispatch = useDispatch()
  const Navigate = useNavigate()
  const params = useParams()
  const {loading, error, message} = useSelector(state=>state.ForgotPassword)
  
const [pass, setpass] = useState()
const [cpass, setcpass] = useState()
const [passfocus, setpassfocus] = useState()
const [cpassfocus, setcpassfocus] = useState()

useEffect(() => {
  if(message){
    toast.success(message)
    setTimeout(() => {
      Navigate('/login')
    }, 1000);
  }
  if(error){
    toast.error(error)
    dispatch({type:'CLEAR_ERRORS'})
  }
}, [message,error])

const resethandle = (e)=>{
    e.preventDefault()
    if(!(!pass || !cpass) && pass===cpass){
        const data = {
            id:params.id,
            token:params.token,
            newPass:pass
        }
        dispatch(resetPassword(data))
    }else{
      toast.error('Passwords Doesnt Match')
    }
}
  return (
    <>
    <Metadata title='Reset Password | Admin | Masterji'/>
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
            <h2 class="title">Reset Password</h2>
            <div class={`input-div one ${passfocus || (pass && 'focus')}`}>
              <div class="i">
                <i class="fas fa-lock"></i>
              </div>
              <div class="div">
                <h5>New Password</h5>
                <input type="text" class="input" 
                  value={pass || ''}
                  onChange={(e)=>setpass(e.target.value)}
                  onFocus={()=>setpassfocus('focus')}
                  onBlur={()=>setpassfocus('')}
                />
              </div>
            </div>
            <div class={`input-div one ${cpassfocus || (cpass && 'focus')}`}>
              <div class="i">
                <i class="fas fa-lock"></i>
              </div>
              <div class="div">
                <h5>Confirm Password</h5>
                <input type="text" class="input" 
                  value={cpass || ''}
                  onChange={(e)=>setcpass(e.target.value)}
                  onFocus={()=>setcpassfocus('focus')}
                  onBlur={()=>setcpassfocus('')}
                />
              </div>
            </div>
            <input type="submit" class="btn" value="Continue" disabled={loading ? true : false} onClick={resethandle}/>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default ResetPass