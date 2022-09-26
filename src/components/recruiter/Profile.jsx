import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { getCompanyDetails, patchCompanyDetails } from '../../api/api.service'
import UserContext from '../../context/UserContext'
import './Profile.css'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function Profile() {
    const { userLoggedData, userProfile, setUserProfile } = useContext(UserContext);
    const [loading, setLoading] = useState(false)
    const [companyData, setCompanyData] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (userLoggedData) {
            setLoading(false)
        } else {
            setLoading(true)
        }
        try {
            const companyId = userProfile.company
            if (Object.keys(userProfile).length !== 0) {
                if (companyId !== null) {
                    getCompanyDetails(companyId).then(
                        (response) => {
                            setCompanyData(response.data)
                        }).catch(
                            (error) => {
                                console.log(error);
                            })
                }
            }

        } catch (error) {
            console.log(error);
        }
    }, [userLoggedData, userProfile])

    const handleAddCompanyDetails = () => {
        return navigate(`/recruiter/${userProfile.id}/add_company`)
    }

    // sweetalert
    const handleRemoveCompany = ()=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You are trying to remove company details from your profile!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'remove'
          }).then((result) => {
          
            if (result.isConfirmed) {
                const data = {company:null}
                patchCompanyDetails(userProfile.id,data).then(()=>{
                
                    setUserProfile({
                        ...userProfile,
                        company:null,
                    })
                    setCompanyData(null)
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    ) 
                })
            }
        })
    }
    

    return (
        <>
            <section className='container profile-container '>
                <div className="row profile-row">
                    <div className="col">
                        <div className='profile-image-container'>
                            <img className='profile-image'
                                src={userLoggedData.profile_image
                                    ? userLoggedData.profile_image
                                    : 'https://via.placeholder.com/150'
                                }
                                alt=""
                                width="160px" />
                        </div>
                    </div>
                    <div className="col">
                        <div className='d-flex mt-3'>
                            <h3 className='mb-4'>
                                {loading
                                    ? <p>no name</p>
                                    : `${userLoggedData.first_name} ${userLoggedData.middle_name} ${userLoggedData.last_name}`}
                            </h3>
                            <div className='ms-5 mt-1 '>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square basic-data-edit-icon" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                </svg>
                            </div>

                        </div>

                        <p> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        </svg> <span className='ms-2'> {userLoggedData && userLoggedData.city}</span>
                        </p>
                        <p>{userLoggedData && userLoggedData.email}</p>
                        <p>{userLoggedData && userLoggedData.phone_number}</p>
                    </div>
                </div>
            </section>
            {/* company details accordion */}
            <section>
                {companyData ? (
                    <div className='container first-accordion'>
                        <div className="accordion" id='accordion-company-details'>
                            <div className="accordion-item border-0">
                                <h2 className='accordion-header' id='heading-company'>
                                    <button className='accordion-button collapsed'
                                        type='button'
                                        data-bs-target='#collapseCompanyAccordion'
                                        data-bs-toggle='collapse'
                                        aria-controls='collapseCompanyAccordion'
                                        aria-expanded="false">
                                        <span className='d-flex col mx-5 justify-content-between'>
                                            <h5 className='align-self-center'> {companyData.company_name}</h5>

                                            <img
                                                src={companyData.company_logo}
                                                width="60px"
                                                className='p-1 ms-5'
                                                alt="" />
                                        </span>
                                    </button>
                                </h2>
                                <div id="collapseCompanyAccordion"
                                    className='accordion-collapse collapse'
                                    aria-labelledby='heading-company'
                                    data-bs-parent="#accordion-company-details" >
                                    {/* accordiion body */}
                                    <div className="accordion-body">
                                        <div className='d-flex justify-content-between'>
                                            <div className='p-3'>
                                                <img src={companyData.ceo_image}
                                                    alt=""
                                                    height="200px" />
                                                <h5 className='mt-2'>Mr. {companyData.ceo_name}</h5>
                                            </div>
                                            <div className='p-3'>
                                                <h5>{companyData.founder}</h5>
                                                <h6><span className='fw-light'>Head office :  </span> {companyData.head_office_location}</h6>
                                                <h6><span className='fw-light'>Founded on  : </span>{companyData.started_date} </h6>
                                                <p className='h6'><span className='fw-light'>About :  </span>{companyData.about }</p>
                                            </div>
                                            <div>
                                                <button className='btn btn-sm btn-danger' onClick={handleRemoveCompany}>Remove</button>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                )
                    : (
                        <div className="no-company-data text-center">
                            <span > No company data found </span>
                            <button className='ms-3 add-company-detail-button' onClick={handleAddCompanyDetails}>add company details</button>
                        </div>
                    )}

            </section>



        </>
    )
}

export default Profile