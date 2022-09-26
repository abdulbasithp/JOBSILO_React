import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import AuthContext, { baseUrl } from "./AuthContext";


const UserContext = createContext();
export default UserContext

export const UserProvider = ({ children }) => {

    const [userData, setUserData] = useState({});
    const [userProfile, setUserProfile] = useState({})
   
    const createUserContext = async (user) => {
        try {
            const userId = user.user_id
            axios.get(`${baseUrl}/user/detail/${userId}`).then((response)=>{
                setUserData(response.data) 
            })
            await axios.get(`${baseUrl}/${user.role}/${user.profile_id}/`).then((response)=>{
                setUserProfile(response.data)
            })
            
        } catch (error) {
            console.log(error);
        }
       
    }

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"))
        if (user){
            createUserContext(user);
        }
        
    },[])

    const clearUserContext = () => {
        setUserData({});
        setUserProfile({});
    }

    let contextData = {
        'userLoggedData': userData,
        'userProfile': userProfile,
        'setUserProfile':setUserProfile,
        'clearUserContext':clearUserContext,
        'createUserContext':createUserContext,
    }
   return (
    <UserContext.Provider value={contextData} >
        {children}
    </UserContext.Provider>
   )
}