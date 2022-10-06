import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { getAllSkills, getCompanyDetails, retrieveRecruiterProfile } from '../../api/api.service';
import { JobCardContext } from './SeekerHome';

function JobCard({ post }) {
  const [postCompany, setPostCompany] = useState({})
  const {locations, handleJobPostClick} = useContext(JobCardContext)
  
  const [joblocation, setJobLocation] = useState('')
  const [skills, setSkills] = useState([])

  console.log(locations,'locations conedfsxe');

  useEffect(()=>{
    if(post){
      const recruiterId = post.recruiter
      retrieveRecruiterProfile(recruiterId)
      .then((res)=>{
        console.log(res.data.company);
        if(res.status === 200){
          getCompanyDetails(res.data.company)
          .then((res)=>{
            setPostCompany(res.data)
          })
          .catch((err)=>{
            console.log(err);
          })

        }
      })
      .then((err)=>{
        console.log(err);
      })
    }
  },[])

  useEffect(()=>{

    setJobLocation(locations.filter((item)=>item.id === post.location))
    
    getAllSkills()
    .then((res)=>{
      setSkills(res.data.filter((item)=>post.skills.includes(item.id)))

    })
    .catch((err)=>{
      console.log(err);
    })
      
  

  },[])

  console.log(post.skills,'skillls');

console.log(skills,'skillluuu');
// console.log(postCompany, 'post companhyy');
// console.log(joblocation,'joblocation');
  return (
    <>
      <div className='col-lg-6   ' style={{"minHeight":"200px"}}>
        <div className=' job-card-box shadow' onClick={()=>handleJobPostClick(post.id)}>
          <div className='d-flex justify-content-between'>
            <div style={{"width":"50px"}}>
              <img src={postCompany.company_logo} width="50px" alt="" />
              <h6><b> {postCompany.company_name}</b></h6>
            </div>
            <div>
              <h4>{post.title}</h4>
              <div style={{"fontSize":"0.80rem"}}>
                <span className='text-secondary'>location :</span> <span className='fw-light'>{joblocation && joblocation[0].name}</span>
              </div>
            </div>
          </div>
          <hr />
          <div style={{"fontSize":"0.80rem"}}>
            <span className='text-secondary'>Experience :</span> <span>{post.experience}</span>
          </div>
          <div style={{"fontSize":"0.80rem"}}>
            <span className='text-secondary'>Skills :</span>
            <span>
              {skills.map((item)=>{
                return <span key={item.id}><span className='text-secondary'> [ </span>{item.skill_name}<span className='text-secondary'> ] </span></span>

              })}
            </span>
          </div>

        </div>
      </div>


    </>
  )
}

export default JobCard