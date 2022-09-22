import axios from 'axios'
import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const baseUrl = 'http://localhost:8000/api'

const AuthContext = createContext();
export default AuthContext

// auth provider 

export const AuthProvider = ({ children }) => {

  const Token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')):null

  const [userLoged, setUserLoged] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')):null)
  const [authTokens, setAuthTokens] = useState(Token)
       const loginUser = async (email,password) => {
         
        try{
            let response =  await axios.post(`${baseUrl}/user/login/`,{"email":email ,"password":password})
            const message = response.data.message
            const token = response.data.token
            const user = response.data.user

            if (token !== undefined && user !== undefined) {
              localStorage.setItem("token",JSON.stringify(token))
              localStorage.setItem('user',JSON.stringify(user))
            }
          
            setUserLoged(JSON.parse(localStorage.getItem("user")))
            setAuthTokens(token)
            
            return response

          }catch(err){
            return err.response
          }
        }
      const LogOutUser = () => {
        localStorage.clear('user')
        localStorage.clear('token')
        setUserLoged(null)
      }

      let contextData = { 
        'loginUser': loginUser,
        'logOutUser': LogOutUser,
        'user':userLoged
    
      }
  return (
    <AuthContext.Provider value={contextData} >
      {children}
    </AuthContext.Provider>
  );
}