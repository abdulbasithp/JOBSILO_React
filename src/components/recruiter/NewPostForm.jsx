import React, { useState } from 'react'
import './NewPostForm.css'

function NewPostForm({recruiterId}) {
    const [formData, setFormData] = useState({
        title:'',
        recruiter_id:recruiterId,
        qualification:[],
        roles:'',


    })

    return (
        <>
            <h4 className='text-center my-3'>Create New Job Post</h4>
            <div className='container'>
                <div className="mb-3">
                     <label htmlFor='job-title' className="col-form-label col-form-label-sm">Job Title<span style={{"color":"red"}} >*</span></label>
                     <input type="text" className="form-control form-control-sm" id="job-title" placeholder=""/>
                </div>
                
            </div>

        </>
    )
}

export default NewPostForm