import axios from "axios"
import { baseUrl } from "../context/AuthContext"

export let accessToken;
if(localStorage.getItem('token')){
    const Token = JSON.parse(localStorage.getItem('token')) 
    accessToken = Token.access
    
}

// get all job posts with recruiter id

export const getRecruiterJobPosts = async (recruiter_id) =>{
    console.log(recruiter_id,'recruiter_id');
    try {
        let response = await axios.get(`${baseUrl}/recruiter_joblist/${recruiter_id}/`,{
            headers:{
                "Content-type":"applicaiton/json",
                "Authorization": `Bearer ${accessToken}`
            },
        })
        console.log(response,'auth service');
        return response

    } catch (error) {
        console.log(error);
        return error
    }
    
}

// get company data of recruiter with recruiter profile(company.id)

export const getCompanyDetails = async (companyId) => {
    try {
        let response = await axios.get(`${baseUrl}/company/${companyId}`,{
            headers:{
                'Content-type':'application/json',
                "Authorization": `Bearer ${accessToken}`
            },
        })
        return response
    } catch (error) {
        console.log(error);
        return error
    }
}

// get company list by dynamic search in company name

export const getSearchCompanyList = async (searchWord) => {
    try {
        let response = await axios.get(`${baseUrl}/company_search/?search=${searchWord}`,{
            headers:{
                'Content-type':'application/json',
                "Authorization": `Bearer ${accessToken}`
            },
        })
        return response
    } catch (error) {
        return error
    }
    
}

// add company data to the recruiter profile PATCH

export const patchCompanyDetails = async (recruiterId, data) => {
    try {
        let response = await axios.patch(`${baseUrl}/recruiter/${recruiterId}/`, data ,{
            headers:{
                'Content-type':'application/json',
                "Authorization": `Bearer ${accessToken}`
            },
        })
        return response
    } catch (error) {
        return error
    }
}


// get all company Category

export const getCompanyCategory = async () =>{
    try {
        let response = await axios.get(`${baseUrl}/company_category/`,{
            headers:{
                'Content-type':'application/json',
                "Authorization": `Bearer ${accessToken}`
            },
        })
        return response
    } catch (error) {
        return error
    }
}


// create company data 

export const createCompany = async (data) => {
    try {
        let response = await axios.post(`${baseUrl}/company/`,data, {
            headers:{
                'Content-type':'application/json',
                "Authorization": `Bearer ${accessToken}`
            },
        })
        console.log(response);
        return response
    } catch (error) {
        return error
    }
}

// get education levels

export const getEducationLevels = async () => {
    try {
        let response = await axios.get(`${baseUrl}/education_level/`,{
            headers:{
                'Content-type':'application/json',
                "Authorization": `Bearer ${accessToken}`
            },
        })
        return response
    } catch (error) {
        return error
    }
}

// get all education Courses with education level id

export const getEducationCourses = async (levelId) => {
    try {
        let response = await axios.get(`${baseUrl}/education_courses/${levelId}/`,{
            headers:{
                'Content-type':'application/json',
                "Authorization": `Bearer ${accessToken}`
            },
        })
        return response
    } catch (error) {
        return error
    }
}

// get all education specialisations with education course id

export const getEducationSpecialisations = async (courseId) => {
    try {
    let response = await axios.get(`${baseUrl}/education_specials/${courseId}/`,{
        headers:{
            'Content-type':'application/json',
            "Authorization": `Bearer ${accessToken}`
        },
    })
    return response
    } catch (error) {
        return error
    }
}

// get education spacialisation with id   ****not used

export const retrieveEducationSpacialisation = async (spacialId) => {
    try {
        let response  = await axios.get(`${baseUrl}/education_specialisation/${spacialId}/`,{
            headers:{
                'Content-type':'application/json',
                "Authorization": `Bearer ${accessToken}`
            },
        })
        return response
    } catch (error) {
        return error
    }
} 

// get all company departments by category id

export const getAllCompanyDepartments = async(categoryId)=>{
    try {
        let response = await axios.get(`${baseUrl}/company/${categoryId}/company_department/`,{
            headers:{
                'Content-type':'application/json',
                "Authorization": `Bearer ${accessToken}`
            },
        });
        return response
    } catch (error) {
        return error
    }
}

//  get all skills by department

export const getSkillsByDepartment = async (departmentId) => {
    try {
        let response = await axios.get(`${baseUrl}/company_department/${departmentId}/skills/`,{
            headers:{
                'Content-type':'application/json',
                "Authorization": `Bearer ${accessToken}`
            },
        })
        return response
    } catch (error) {
        return error
    }
}

// create new job post 

export const createNewJobPost = async (formData) => {
    console.log(formData,'auth serveicwe');
    try {
        let response = await axios.post(`${baseUrl}/job_post/`,formData,{
            headers:{
                'Content-type':'application/json',
                "Authorization": `Bearer ${accessToken}`
            },
        })
        return response
    } catch (error) {
        return error
    }
}

// get seeker experiences with profiile id

export const getSeekerExperiences = async (seekerId) =>{
    try {
        let response = await axios.get(`${baseUrl}/seeker_experience/${seekerId}/`,{
            headers:{
                'Content-type':'application/json',
                "Authorization": `Bearer ${accessToken}`
            },
        })
        return response
    } catch (error) {
        return error
    }
}

// create new experience for seeker

export const createSeekerExperience = async(formData) =>{
    try {
        let response = await axios.post(`${baseUrl}/experience/`,formData,{
            headers:{
                'Content-type':'application/json',
                "Authorization": `Bearer ${accessToken}`
            },
        })
        return response
    } catch (error) {
        return error
    }
}


// get all locations

export const getLocations = async () =>{
    try {
        let response = await axios.get(`${baseUrl}/location/`,{
            headers:{
                'Content-type':'application/json',
                "Authorization": `Bearer ${accessToken}`
            },
        })
        return response
    } catch (error) {
        return error
    }
}


// get all filtered job posts

export const getFilteredJobPost = async () =>{
    try {
        let response = await axios.get(`${baseUrl}/jobs_list/`,{
            headers:{
                'Content-type':'application/json',
                "Authorization": `Bearer ${accessToken}`
            },
        })
        return response
    } catch (error) {
        return error
    }
}

// get retrieve recruiter profile 

export const retrieveRecruiterProfile = async (recruiterId) => {
    try {
        let response = await axios.get(`${baseUrl}/recruiter/${recruiterId}/`,{
            headers:{
                'Content-type':'application/json',
                "Authorization": `Bearer ${accessToken}`
            },
        })
        return response
    } catch (error) {
        return error
    }
}

// get all skills

export const getAllSkills = async () =>{
    try {
        let response = await axios.get(`${baseUrl}/skill/`,{
            headers:{
                'Content-type':'application/json',
                "Authorization": `Bearer ${accessToken}`
            },
        })
        return response
    } catch (error) {
        return error
    }
}

// retrieve job post

export const retrieveJobPost = async (jobId) =>{
    try {
        let response = await axios.get(`${baseUrl}/job_post/${jobId}`,{
            headers:{
                'Content-type':'application/json',
                "Authorization": `Bearer ${accessToken}`
            },
        })
        return response
    } catch (error) {
        return error
    }
}


export const retrieveLocation = async (locationId) =>{
    try {
        let response = await axios.get(`${baseUrl}/location/${locationId}`,{
            headers:{
                'Content-type':'application/json',
                "Authorization": `Bearer ${accessToken}`
            },
        })
        return response
    } catch (error) {
        return error
    }
}


export const removeExperience = async (experienceId) =>{
    try {
        let response = await axios.delete(`${baseUrl}/experience/${experienceId}/`,{
            headers:{
                'Content-type':'application/json',
                "Authorization": `Bearer ${accessToken}`
            },
        })
        return response
    } catch (error) {
        return error
    }
}


export const getSeekerEducations = async (seekerId) =>{
    try {
        let response = await axios.get(`${baseUrl}/seeker/${seekerId}/education/`,{
            headers:{
                'Content-type':'application/json',
                "Authorization": `Bearer ${accessToken}`
            },
        })
        return response
    } catch (error) {
        return error
    }
}