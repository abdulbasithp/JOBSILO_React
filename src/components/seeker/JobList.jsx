import React from 'react'
import JobCard from './JobCard'

function JobList({jobPostFiltered}) {
  return (
    <>
        <div className="row g-4">
           
              {jobPostFiltered.map((post)=>{
                return <JobCard key={post.id} post={post}/>
              })}
  
        </div>
    </>
  )
}

export default JobList