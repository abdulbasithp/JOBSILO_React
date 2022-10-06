import React, { useState } from 'react'

function ExperienceModal(  { user,
                            experienceFormData,
                            setExperienceFormData ,
                            handleNewExperienceSubmit}) {
    
    const [checked, setChecked] = useState(false)
    // const [formData, setFormData] = useState({
     
    //     })



    
    const handleChangeField = (e) => {
        const name = e.target.name
        const value = e.target.value
        setExperienceFormData({
        ...experienceFormData,
        [name]: value
        })
    }

    const handleCheckSelect = (e) => {
        setChecked(!checked)
        setExperienceFormData({
          ...experienceFormData,
          [e.target.name]: !checked
        })
      }

      
    return (
        <>

            <div className="modal fade" id="experienceModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel"><b>Add Your Experience Details</b></h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form action="">
                                <div className="row g-2">
                                    <div className="col-lg-12">
                                        <label className='form-label' htmlFor="employer">Company/Employer name : <span className='text-danger'>*</span></label>
                                        <input type="text"
                                            className='form-control'
                                            name='employer'
                                            value={experienceFormData.employer}
                                            onChange={handleChangeField}
                                            id='employer'
                                        />
                                    </div>
                                    <div className="col-lg-12">
                                        <label className='form-label' htmlFor="position">Position :<span className='text-danger'>*</span></label>
                                        <input type="text"
                                            className='form-control'
                                            id='position'
                                            value={experienceFormData.position}
                                            onChange={handleChangeField}
                                            name='position' />
                                    </div>
                                    <div className="col-lg-6">
                                        <label className='form-label' htmlFor="current_ctc">Current CTC (LPA) :</label>
                                        <input type="number"
                                            id='current_ctc'
                                            value={experienceFormData.current_ctc}
                                            onChange={handleChangeField}
                                            className='form-control'
                                            name='current_ctc' />
                                    </div>
                                    <div className="col-lg-6">
                                        <label className='form-label' htmlFor="current_ctc">Started Date :<span className='text-danger'>*</span></label>
                                        <input type="date"
                                            className='form-control'
                                            value={experienceFormData.started_date}
                                            onChange={handleChangeField}
                                            name='started_date' />
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox"
                                                onChange={handleCheckSelect}
                                                checked={checked}
                                                value={checked}
                                                name="currently_working"
                                                id="flexCheckDefault" />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                Currently Working
                                            </label>
                                        </div>
                                    </div>
                                    {checked
                                        ? ''
                                        : (
                                            <div className="col-lg-6">
                                                <label className='form-label' htmlFor="current_ctc">End Date :<span className='text-danger'>*</span></label>
                                                <input type="date"
                                                    onChange={handleChangeField}
                                                    value={experienceFormData.ended_date && experienceFormData.ended_date}
                                                    className='form-control'
                                                    name='ended_date' />
                                            </div>
                                        )}


                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleNewExperienceSubmit} 
                                className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ExperienceModal