import React, { useEffect, useState } from 'react'
import { getAllCompanyDepartments, getCompanyCategory, getFilteredJobPost, getLocations, getSkillsByDepartment } from '../../api/api.service'
import './SeekerHome.css'
import SideBar from './SideBar'
import JobList from './JobList'
import { useNavigate, useParams } from 'react-router-dom'
import { createContext } from 'react'
import JobPostDetail from './JobPostDetail'


export  const JobCardContext = createContext()

function SeekerHome() {

  const [companyCategory, setCompanyCategory] = useState([])
  const [departments, setDepartments] = useState([])
  const [skills, setSkills] = useState([])
  const [locations, setLocations] = useState([])
  const [jobPostFiltered, setJobPostFiltered] = useState([])


  const [selectedJobData, setSelectedJobData] = useState({})

  const navigate = useNavigate()

  useEffect(() => {
    getCompanyCategory()
      .then((res) => {
        setCompanyCategory(res.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  useEffect(() => {
    getLocations()
      .then((res) => {
        setLocations(res.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  useEffect(() => {
    getFilteredJobPost()
      .then((res) => {
        setJobPostFiltered(res.data['data'])
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

 
  console.log(selectedJobData[0],'selected job data');
 
 
  console.log(jobPostFiltered, 'job posts filter');
  console.log(locations, 'location');


  const handleCategorySelect = (e) => {
    const categoryId = e.target.value
    if (categoryId) {
      getAllCompanyDepartments(categoryId)
        .then((res) => {
          setDepartments(res.data)
        })
        .catch((err) => {
          console.log(err);
        })

    }
  }

  const handleDepartmentSelect = (e) => {
    const departmentId = e.target.value
    console.log(departmentId);
    if (departmentId) {
      getSkillsByDepartment(departmentId)
        .then((res) => {
          setSkills(res.data)
        })
        .catcha((err) => {
          console.log(err);
        })
    }
  }

  const handleJobPostClick = (postId) =>{
    navigate(`/seeker/job/${postId}`)
  }
  
  let  contextData = {
    'locations': locations,
    'handleJobPostClick': handleJobPostClick
  }

  return (
    <>
      <div className="container">
        <div className="col-lg-12 mb-3">
          <div className='search-bar d-flex mx-5'>
            <div className='search-icon text-center' >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-search mt-1" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </div>
            <input type="text" className='search-field w-100 ms-3 ' placeholder='search job....' autoFocus />
          </div>
        </div>
        
        <div className="row">
          <div className="col-lg-3" >
            <SideBar
              locations={locations}
              companyCategory={companyCategory}
              setCompanyCategory={setCompanyCategory}
              departments={departments}
              setDepartments={setDepartments}
              handleCategorySelect={handleCategorySelect}
              handleDepartmentSelect={handleDepartmentSelect}
              skills={skills}
              setSkills={setSkills} />
          </div>


          <div className="col-lg-9" >
            <JobCardContext.Provider value={contextData} >
              <JobList
                jobPostFiltered={jobPostFiltered}
              />
            </JobCardContext.Provider>
          </div>
        </div>
      </div>
    </>
  )
}

export default SeekerHome