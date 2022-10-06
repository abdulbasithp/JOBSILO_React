import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import JobItem from './JobItem'
import AuthContext, { baseUrl } from '../../context/AuthContext'
import './RecruiterLayout.css'
import { toast } from 'react-toastify'
import { getRecruiterJobPosts } from '../../api/api.service'
import { NavLink } from 'react-router-dom'
import JobDetail from './JobDetail'
import NewPostForm from './NewPostForm'
import UserContext from '../../context/UserContext'

function RecruiterLayout() {

  const { user } = useContext(AuthContext)
  const {userCompany} = useContext(UserContext)
  const [jobPosts, setJobPosts] = useState([])
  const [jobClicked, setJobClicked] = useState({})
  const [newPost, setNewPost] = useState(false)


  useEffect(() => {
    try {
      if (user) {
        const recruiterId = user.profile_id
        console.log(recruiterId);
        getRecruiterJobPosts(recruiterId).then(
          (res) => {
            if(res.status === 200){
              setJobPosts(res.data);
              setJobClicked(res.data[0])
            }else{
              console.log(res.data);
            }
          })
          .catch((err)=>{

          })
      }
    } catch (error) {
      if (error) {
        toast.error('error on getting recruiter posts from server, user is none', { autoClose: 1500 })
      }
    }
  }, [])

  const handleJobPostClick = (job) => {
    setNewPost(false)
    console.log('job post clicked', job);
    setJobClicked(job)
  }
  
  return (
    <>
      <div className="container" style={{ 'minHeight': '100vh' }}>
        <div className="row">
          <div className="col-lg-4 recruier-home-sidebar" style={{ 'backgroundColor': '#ebebeb' }}>
            <div className='d-flex mt-4'>
              <input type="text" className='jobs-search' />
              <button className='search-button'>Search</button>
            </div>
            <div className='my-3'>
              <button
                className='new-post-button'
                onClick={() => setNewPost(true)}>
                <span>+</span> New Post
              </button>
            </div>
            <div className='job-list'>
              {jobPosts && jobPosts.map((job) => {
                console.log(job,'in html');
                return (
                  <JobItem
                    key={job.id}
                    job={job}
                    job_active_id={jobClicked.id}
                    handleJobPostClick={handleJobPostClick}
                  />
                )
              })}

            </div>
          </div>

          <div className="col-lg-8 " >
            <div className='recruiter-home-main'>
              {newPost
                ? <NewPostForm 
                    recruiterId={user.profile_id}
                    userCompany={userCompany}
                    setNewPost={setNewPost}
                    jobPosts={jobPosts}
                    setJobPosts={setJobPosts} />
                : jobPosts && jobPosts.length !== 0
                  ? <JobDetail job={jobClicked} />
                  : (
                    <>
                      <div className=" row align-items-center justify-content-center">
                        <div className=' col text-center'>
                          <h2>No job posts found.
                          </h2>
                          <p>
                            <span onClick={() => setNewPost(true)} style={{ "color": "blue", "cursor": "pointer" }}><u>Click Here</u></span> <span> Create New Job Post</span>
                          </p>
                        </div>
                      </div>  
                    </>
                  )
              }
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default RecruiterLayout