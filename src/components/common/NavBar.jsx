import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { Logout, getCurrentUser } from '../../utils/common';
import './NavBar.css';
import avatardefault from '../../assets/images/avatardefault.png'
import AuthContext from '../../context/AuthContext';
import { useContext } from 'react';
import UserContext from '../../context/UserContext';

function NavBar() {
  const [showDefaultNav, setShowDefaultNav] = useState(true)
  const [showSeekerNav, setShowSeekerNav] = useState(false)
  const [showRecruiterNav, setShowRecruiterNav] = useState(false)
  
  const navigate = useNavigate()

  const { logOutUser } = useContext(AuthContext)
  const { user } = useContext(AuthContext)
  const {userLoggedData} = useContext(UserContext)
  const { clearUserContext } = useContext(UserContext)

  useEffect(() => {

    if (user) {
      if (user.role === 'seeker') {
        setShowDefaultNav(false)
        setShowSeekerNav(true)
      }
      else if (user.role === 'recruiter') {
        setShowDefaultNav(false)
        setShowRecruiterNav(true)
      }
    }
    else if (user === null) {
      setShowDefaultNav(true)
      setShowSeekerNav(false)
      setShowRecruiterNav(false)
    }
  }, [user])

  const handleLogout = () => {
    // setShowDefaultNav(true)

    logOutUser();
    clearUserContext();
    navigate('/login');

  }



  return (
    <header className='container-fluid'>
      <nav className="navbar navbar-expand-lg bg-white mx-5">
        <a className="navbar-brand" href="#"><img className='logo' src={logo} alt="logo" /></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">

          {showDefaultNav ? (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 text-end">
              <li className="nav-item me-4">
                <NavLink className="nav-link" to="/">Home</NavLink>
              </li>
              <li className="nav-item me-4">
                <NavLink className="nav-link" to="login">Login</NavLink>
              </li>
              <li className="nav-item me-4">
                <NavLink className="nav-link" to="/register" >Register</NavLink>
              </li>
            </ul>

          ) : null}

          {showSeekerNav ? (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 text-end">
              <li className="nav-item me-4">
                <NavLink className="nav-link"  to="/seeker/home">Home</NavLink>
              </li>
              <li className="nav-item me-4">
                <NavLink className="nav-link" to="/seeker/profile">Profile</NavLink>
              </li>
              <li className="nav-item me-4">
                <NavLink className="nav-link" to="/seeker/application/" >Application</NavLink>
              </li>
              <li className="nav-item me-4">
                <a className="nav-link ">Projects</a>
              </li>
              <li className="nav-item me-4">
                <a className="nav-link "> Messages</a>
              </li>
              <li className="nav-item me-4">
                <a className="nav-link " onClick={handleLogout}> Logout</a>
              </li>
            </ul>

          ) : null}

          {showRecruiterNav ? (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 text-end">
              <li className="nav-item me-4">
                <NavLink className="mt-2 nav-link" to="/recruiter/home" >Applications</NavLink>
              </li>
              <li className="nav-item me-4">
                <NavLink className="mt-2 nav-link" to="/recruiter/shedules">Shedules</NavLink>
              </li>
              <li className="nav-item me-4">
                <NavLink className="nav-link mt-2" to="#"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                  <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                </svg>
                </NavLink>
              </li>
              <li className="avatar-recruiter me-4">
                <NavLink className="avatar-image" to="/recruiter/profile" >
                    <img src={avatardefault} height="46px" />
                </NavLink>

              </li>
              <li className="nav-item me-4">
                <a className="nav-link mt-2" onClick={handleLogout}> Logout</a>
              </li>
            </ul>
          ) : null}
        </div>
        
      </nav>
      <div className="text-success">
          <hr/>
        </div>
    </header>

  )
}

export default NavBar
