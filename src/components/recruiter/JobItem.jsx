import React, { useEffect, useState } from 'react'
import './JobItem.css'

function JobItem({ job, handleJobPostClick ,job_active_id}) {
    console.log(job );
    const [jobPostActive, setJobPostActive] = useState(false)

    useEffect(()=>{
        if (job.id === job_active_id){
            console.log('job active',job.id);
            setJobPostActive(true)
        }else{
            console.log('job not active',job.id);
            setJobPostActive(false)
        }
    },[job_active_id])

    return (
        <>  
            
            <div className={jobPostActive ? 'job-post shadow job-active' :'job-post shadow '} onClick={()=>{
                handleJobPostClick(job);
            }}>
                <div className='job-post-header justify-content-between'>
                    <p>{job.title}</p>
                    <p className='job-post-header-location'> Location :{job.location}</p>
                </div>
                <div>
                    <p>{job.created_date}</p>
                    <p>{job.expery_date}</p>
                </div>
                
            </div>
        </>
    )
}

export default JobItem