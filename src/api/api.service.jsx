import axios from "axios"
import { baseUrl } from "../context/AuthContext"

// get all job posts with recruiter id

export const getRecruiterJobPosts = async (recruiter_id) =>{
    try {
        let response = await axios.get(`${baseUrl}/recruiter_joblist/${recruiter_id}`)
        return response
    } catch (error) {
        console.log(error);
        return error
    }
    
}