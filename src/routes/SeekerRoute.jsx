import React, { useState } from 'react'
import { Outlet, Navigate } from "react-router-dom"
import { getUserRole } from '../utils/common'


export const SeekerRoute = () =>{
      const user = getUserRole()
    return (
      
        user  ? <Outlet/> : <Navigate to="/seeker/login"/>  
    )
  }


export const RecruiterRoute = () =>{
    const user = getUserRole()

    return (
    
      user  ? <Outlet/> : <Navigate to="/recruiter/login"/>  
  )
}

  
