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

// get company data of recruiter with recruiter profile(company.id)

export const getCompanyDetails = async (companyId) => {
    try {
        let response = await axios.get(`${baseUrl}/company/${companyId}`)
        return response
    } catch (error) {
        console.log(error);
        return error
    }
}

// get company list by dynamic search in company name

export const getSearchCompanyList = async (searchWord) => {
    try {
        let response = await axios.get(`${baseUrl}/company_search/?search=${searchWord}`)
        return response
    } catch (error) {
        return error
    }
    
}

// edit company data to the recruiter profile PATCH

export const patchCompanyDetails = async (recruiterId, data) => {
    try {
        let response = await axios.patch(`${baseUrl}/recruiter/${recruiterId}/`, data)
        return response
    } catch (error) {
        return error
    }
}


// get all company Category

export const getCompanyCategory = async () =>{
    try {
        let response = await axios.get(`${baseUrl}/company_category/`)
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
                'Content-Type': 'multipart/form-data'
            },
        })
        return response
    } catch (error) {
        return error
    }
}

// get education levels

export const getEducationLevels = async () => {
    try {
        let response = await axios.get(`${baseUrl}/education_level/`)
        return response
    } catch (error) {
        return error
    }
}

// get all education Courses with education level id

export const getEducationCourses = async (levelId) => {
    try {
        let response = await axios.get(`${baseUrl}/education_courses/${levelId}/`)
        return response
    } catch (error) {
        return error
    }
}

// get all education specialisations with education course id

export const getEducationSpecialisations = async (courseId) => {
    try {
    let response = await axios.get(`${baseUrl}/education_specials/${courseId}/`)
    return response
    } catch (error) {
        return error
    }
}