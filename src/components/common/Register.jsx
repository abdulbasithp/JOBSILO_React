import axios from 'axios';
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { baseUrl, registerUser } from '../../context/AuthContext';
import './Register.css';
import { useEffect } from 'react';
import { FaAngleDoubleLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';

function Register() {
    const [error, setError] = useState('')
    const [confPassword,setConfPassword] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)
    // const [userRole, setUserRole] = useState('seeker')
    const [checked, setChecked] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        first_name: '',
        middle_name: '',
        last_name: '',
        role: 'seeker',
        email: '',
        password: ''

    })

    const { first_name, middle_name, last_name, email, password } = formData;

    const handleChange = (event) => {

        const target = event.target;
        const name = target.name;
        setFormData({
            ...formData,
            [name]: target.value
        })
    }
    const handleCheckChange = (e)=> {
        setChecked(!checked);
        console.log(e.target.checked);
        if(e.target.checked){
            setFormData({...formData,[e.target.name]:'recruiter'})
            console.log(formData);
        }else {
            setFormData({...formData,[e.target.name]:'seeker'})
            console.log(formData);
        }
        
      }

    const handleSubmit = (e) => {
        e.preventDefault();
            setLoading(true)
            const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
            const emialRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i ;
            
        if (!email.match(emialRegex)){
            toast.error('email is not valid!',{autoClose:1500})
            setLoading(false)
        }
        else if(password.length <8 && password.length > 16 ){
            toast.error('password must be between 8-16 characters!',{autoClose:1500})
            setLoading(false)
        } 
        else if(!password.match(passwordRegex)){
            toast.error('password must contain atleast one alphabet,number and special character!',{autoClose:1500})
            setLoading(false)
        }
        else if( password !== confPassword){
            toast.error('password and confirm password did not matches!',{autoClose:1500})
            setLoading(false)
        }else{
            console.log(formData);
            axios.post(`${baseUrl}/user/signup/`, formData)
            .then((response) => {
                console.log(response);
                if (response.status === 201){
                    console.log('status 201');
                    setTimeout(() => {
                        navigate('/login')
                    },1500)
                    toast.success('Registration is successfull, Now you can login', {autoClose:1500});
                      
                }else if (response.status === 400){
                    
                }    
            })
            .catch((error) => {
                console.log(error.response.status);
                if (error.response.status === 400 ) {
                    toast.error('Email is already exist',{autoClose:1500})
                    console.log('status 400');
                    setLoading(false)
                }
            })
                
        }
       
    }
    


    return (
        <>
            <div className='container-fluid outer-container' >
            <button className='ms-5 mt-4 back-button' onClick={()=>navigate(-1)}><FaAngleDoubleLeft/></button>
                <div className="h-100 d-flex  justify-content-center">
                    <div className='seeker-form-container text-center' >
                        <form action="" onSubmit={handleSubmit}>
                        <h3 className='mb-2'>Create Jobsilo Account</h3>
                        <br />  <input 
                                    type="text"  
                                    name='first_name' 
                                    value={first_name} 
                                    onChange={handleChange} 
                                    placeholder="Firstname" />
                        <br />  <input 
                                    type="text"  
                                    name='middle_name' 
                                    value={middle_name} 
                                    onChange={handleChange} 
                                    placeholder="Middlename" />
                        <br />  <input 
                                    type="text"  
                                    name='last_name' 
                                    value={last_name} 
                                    onChange={handleChange} 
                                    placeholder="Lastname" />
                        <br />  <input 
                                    type="email"  
                                    name='email' 
                                    value={email} 
                                    onChange={handleChange} 
                                    placeholder="Email" />
                        <br />  <input 
                                    type="password"  
                                    name='password' 
                                    value={password} 
                                    autoComplete="off"
                                    onChange={handleChange} 
                                    placeholder="Password" />
                        <br />  <input 
                                    type="password"  
                                    name='confPassword'
                                    autoComplete='off' 
                                    value={confPassword} 
                                    onChange={(e)=>setConfPassword(e.target.value)} 
                                    placeholder="Confirm Password" />
                        <br/> <input 
                                    checked={checked}
                                    type="checkbox"
                                    onChange={handleCheckChange}   
                                    name="role" 
                                     />
                                     <span className='ms-2'>if you want to hire</span>
                        <br /> {<button
                                    className='btn btn-md btn-info' 
                                    type='submit'
                                    disabled={loading}> 
                                    {loading && (<span className="spinner-border spinner-border-sm me-1"></span>
                                     )}
                                    <span >Register</span> 
                                </button> 
                }          
                </form>               
                    </div>
                </div>

            </div>
            


        </>
    )
}

export default Register;