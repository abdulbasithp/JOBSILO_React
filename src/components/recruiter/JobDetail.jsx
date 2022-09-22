import React from 'react'
import { useEffect } from 'react';
import './JobDetail.css'

function JobDetail({job}) {
  
  return (
    <>
      {job && (
          <h1>{job.title}</h1>
      )}
    </>
  )
}

export default JobDetail