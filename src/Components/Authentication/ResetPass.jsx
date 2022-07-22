import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { resetPassword } from '../../Actions/useraction'
import Metadata from '../Metadata'

const ResetPass = () => {
    
  const dispatch = useDispatch()
  const Navigate = useNavigate()
  const params = useParams()
  const {loading, success, error, message} = useSelector(state=>state.ForgotPassword)
  
const [pass, setpass] = useState()
const [cpass, setcpass] = useState()
const [passfocus, setpassfocus] = useState()
const [cpassfocus, setcpassfocus] = useState()
const resethandle = (e)=>{
    e.preventDefault()
    if(!(!pass || !cpass) && pass===cpass){
        const data = {
            id:params.id,
            token:params.token,
            newPass:pass
        }
        dispatch(resetPassword(data))
    }
}
  return (
    <>
    <Metadata title='Reset Password | Admin | Masterji'/>
    
    <div className="forgotcontainer">
        
      <img class="wave" src="/wave.png" />
      <div class="container">
        <div class="img">
          <img src="/Masterji_Logo_green.png" />
        </div>
        <div class="forgot-content">
          <form action="index.html">
            <img src="/avatar.svg" />
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