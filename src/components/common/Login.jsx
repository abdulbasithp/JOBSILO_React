import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer, toast } from 'react-toastify';
import AuthContext from '../../context/AuthContext';
import { getCurrentUser, getUserRole } from '../../utils/common';
import './Login.css';

function Login() {
    const { loginUser } = useContext(AuthContext)
  
    const navigate = useNavigate()
  
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // need to remove after setting protected routes
    useEffect(() => {
      try {
        const user = getCurrentUser();
        if (user.role === 'seeker') {
          navigate('/seeker/home')
        }else if (user.role === 'recruiter'){
          navigate('/recruiter/application')
        }
      } catch (error) {
        console.log('user undefined');
      }
      
    }, [])
  // //////////////////////////////////////
    const role = 'recruiter';
    const handleSubmit = () => {
      loginUser(email, password).then((response)=>{
          console.log(response.status);
          if (response.status === 400){
            toast.error(response.data.message,{autoClose:1500})
          }else if (response.status === 200){
            toast.success(response.data.message,{autoClose:1500})
          
            const responseUser = response.data.user
          
            if (responseUser.role === 'seeker'){
              navigate("/seeker/home")
            }else if (responseUser.role === 'recruiter'){
              navigate("/recruiter/application")
            }
          }
      })
    }
  return (
    <div >
    <div className='recruiter-login'>
      <div className="container ">
        <div className="row " >
        
          <div className="col-lg-6 col-md-12 col-sm-12 d-grid login-form">
            <h3 className='text-center my-5'>Hire Right One!</h3>
            <input type="email" placeholder='email' className='mb-3 css-input' name='email' value={email} onChange={(event) => setEmail(event.target.value)} />
            <input type="password" placeholder='password' className='mb-4 css-input' name='password' value={password} onChange={(event) => setPassword(event.target.value)} />
            <button className='btn btn-dark' onClick={handleSubmit}>submit</button>
          </div>
          <div className="col">

            </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login;

