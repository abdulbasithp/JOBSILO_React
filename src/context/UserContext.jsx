import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { getCompanyDetails, retrieveLocation } from "../api/api.service";
import AuthContext, { baseUrl } from "./AuthContext";
import { accessToken } from "../api/api.service";

const UserContext = createContext();
export default UserContext

export const UserProvider = ({ children }) => {

    const [userData, setUserData] = useState({});
    const [userProfile, setUserProfile] = useState({})
    const [userCompany, setUserCompany] = useState({})
    const [userLocation, setUserLocation] = useState({})
   
    const createUserContext = async (user) => {
        try {
            const userId = user.user_id
            console.log(userId,'userId');
            axios.get(`${baseUrl}/user/${userId}`,{
                headers:{
                    "Content-type":"applicaiton/json",
                    "Authorization": `Bearer ${accessToken}`
                },
            }).then((response)=>{
                setUserData(response.data)
                if (response.status === 200 ){
                    const locationId = response.data.city
                    retrieveLocation(locationId).then((res)=>{
                        setUserLocation(res.data)
                    }).catch((err)=>{
                        console.log(err);
                    })
                    
                } 
                console.log(response,'userDaata resp');
            })
            await axios.get(`${baseUrl}/${user.role}/${user.profile_id}/`,{
                headers:{
                    "Content-type":"applicaiton/json",
                    "Authorization": `Bearer ${accessToken}`
                },
            }).then((response)=>{
                setUserProfile(response.data)
                console.log(response.data,'user profile');
                if(user.role === 'recruiter'){
                    try {
                        const userProfleKeys = Object.keys(response.data)
                        if(userProfleKeys.includes('company')){
                            if(response.data.company){
                                getCompanyDetails(response.data.company).then((res)=>{
                                    setUserCompany(res.data);
                                    console.log(res.data,'user company data response');
                                }) 
                            }
                           
                        }
                     
                    } catch (error) {
                        console.log(error);
                    }
                }
                
            });            
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
        'userLocation':userLocation,
        'userProfile': userProfile,
        'userCompany':userCompany,
        'setUserCompany':setUserCompany,
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