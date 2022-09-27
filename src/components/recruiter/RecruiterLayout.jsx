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

function RecruiterLayout() {

  const { user } = useContext(AuthContext)
  const [jobPosts, setJobPosts] = useState([])
  const [jobClicked, setJobClicked] = useState({})
  const [newPost, setNewPost] = useState(false)


  useEffect(() => {
    try {
      if (user) {
        const recruiterId = user.profile_id
        getRecruiterJobPosts(recruiterId).then(
          (res) => {
            // console.log(res.data, 'useEffect');
            setJobPosts(res.data);
            setJobClicked(res.data[0])
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
              {jobPosts.map((job) => {
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
                ? <NewPostForm recruiterId={user.profile_id} />
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