import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCompanyDetails, retrieveJobPost, retrieveLocation, retrieveRecruiterProfile } from '../../api/api.service'

function JobPostDetail() {
    const navigate = useNavigate()
    const jobId = useParams()
    
    const [jobPost, setJobPost] = useState({})
    const [jobCompanyData, setJobCompanyData] = useState({})
    const [jobLocation, setJobLocation] = useState({})
    // { jobPost, jobLocation, jobSkills, selectedJobCompany }
    useEffect(()=>{
        if(jobId){
            retrieveJobPost(jobId.id)
            .then((res)=>{
                setJobPost(res.data)
                if(res.status === 200){
                retrieveRecruiterProfile(res.data.recruiter)
                .then((response)=>{
                    console.log(response.data, 'recruiter profile');
                    if(response.status === 200){
                        getCompanyDetails(response.data.company)
                        .then((res)=>{
                            setJobCompanyData(res.data)
                        })
                        .catch((err)=>{
                            console.log(err);
                        })
                    }
                }) 
                .catch((err)=>{
                    console.log(err);
                }) ;

                retrieveLocation(res.data.location)
                .then((res)=>{
                    setJobLocation(res.data)
                })
                .catch((err)=>{
                    console.log(err);
                })
                }
            })
            .catch((err)=>{
                console.log(err);
            })


        }
    },[])

    const handleJobApply = () =>{

    }

console.log(jobCompanyData, 'job company data');
console.log(jobPost,'jobpost');
    return (
        <>
            <div className='container '>
                <div>
                    <button className='back-button-job-detail' onClick={()=>navigate(-1)}>Back</button>
                </div>
                <div className="row d-flex ">
                    <div className="col-lg-8 mx-auto job-detail-container shadow mt-3 p-3" >
                        <div className="row mb-3">
                            <div className="col-lg-6 d-flex justify-content-between">
                                <img src={jobCompanyData && jobCompanyData.company_logo} width="70px" alt="" />
                                <div className='align-self-center'>
                                    <h4>{jobPost.title}</h4>
                                </div>
                            </div>
                            <div className="col-lg-6 d-flex justify-content-end">
                                <div className='align-self-center'>
                                    <button className='apply-now-button' onClick={handleJobApply} >Apply Now</button>

                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 d-flex justify-content-between">
                                <h6 style={{ "fontSize": "smaller" }}><span className='fw-light'> Company  : </span> {jobCompanyData.company_name}</h6>
                                <h6 style={{ "fontSize": "smaller" }}><span className='fw-light'>  Location :</span> {jobLocation && jobLocation.name}</h6>
                            </div>
                            <div className="col-lg-6 d-flex justify-content-end">
                                <h6 style={{ "fontSize": "smaller" }}><span className='fw-light'>Min. Experience :</span><span className='fw-bold ms-2' style={{ "fontSize": "larger" }}>{jobPost.experience}</span></h6>
                            </div>
                        </div>

                        <hr />

                        <div className='d-flex justify-content-end'>
                            <div>
                                <span style={{"fontSize":"small"}}> Last Date : </span> <span style={{"fontSize":"small"}}>{jobPost.expiry_date}</span>
                                <h6 className='mt-2'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cash-stack" viewBox="0 0 16 16">
                                    <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1H1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                                    <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V5zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2H3z" />
                                </svg>
                                <span className='ms-3 ' style={{"fontSize":"small"}}>{jobPost.min_salary_package} - {jobPost.max_salary_package} lpa</span></h6>
                            </div>
                        </div>
                        <div className='row'>
                            <div>
                                <h6 style={{"fontSize":"smaller"}}>Roles & Responsibilities :</h6>
                            </div>
                            <div className='ms-4 text-wrap'>
                                <p>{jobPost.roles}</p>
                            </div>
                        </div>
                        <div className='row'>

                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default JobPostDetail