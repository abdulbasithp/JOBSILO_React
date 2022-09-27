import React, { useState } from 'react'
import { useEffect } from 'react'
import { getEducationCourses, getEducationLevels, getEducationSpecialisations } from '../../api/api.service'
import './NewPostForm.css'

function NewPostForm({ recruiterId }) {
    const [educationLevels, setEducationLevels] = useState([])
    const [educationCourses, setEducationCourses] = useState([])
    const [educationSpacials, setEducationSpacials] = useState([])

    const [specilaisationSelected, setSpecialisationSelected] = useState([])

    const [formData, setFormData] = useState({
        recruiter: recruiterId,
        title: '',
        qualification: [],
        qualification_disc: '',
        roles: '',
        experience: '',
        experience_desc: '',
        skills: [],
        job_type: '',
        location: '',
        salary_package: '',
        expiry_date: '',
    })


    useEffect(()=>{
        getEducationLevels()
        .then((response)=>{
            console.log(response.data,'educatin level');
            setEducationLevels(response.data)
        }).catch((error)=>{
            console.log(error);
        })
    },[])

    const handleEducationLevelSelect = (e) => {
        const educationLevelSelected = e.target.value      
        if (educationLevelSelected){
            getEducationCourses(educationLevelSelected)
            .then((res)=>{
                setEducationCourses(res.data);
            }).catch((error)=>{
                console.log(error);
            })
        }  
        
    }

    const handleEducationCourceSelect = (e) =>{
        const educationCourceSelected = e.target.value 
        if (educationCourceSelected){
            getEducationSpecialisations(educationCourceSelected)
            .then((res)=>{
                console.log(res);
                setEducationSpacials(res.data)
            })
            .catch((err)=>{
                console.log(err);
            })
            console.log(educationCourceSelected,'education cource');
        }
    }

    const handleEducationSpacialSelect = (e) => {
        const educationSpecialSelected = e.target.value
        if (educationSpecialSelected){
            setSpecialisationSelected({
                ...specilaisationSelected,
                educationSpecialSelected
            });
        }
    }
console.log(specilaisationSelected);
    return (
        <>
            <h4 className='text-center my-3'>Create New Job Post</h4>
            <div className='container'>
                <div className="row g-2">
                    <div className="col-lg-12">
                        <label htmlFor='job-title' className="col-form-label col-form-label-sm">Job Title<span style={{ "color": "red" }} >*</span></label>
                        <input type="text" className="form-control form-control-sm" id="job-title" placeholder="" />
                    </div>
                    <div className="col-lg-4">
                        <div className="form-floating">
                            <select className="form-select" 
                                    id="floatingSelectlevel" 
                                    onChange={handleEducationLevelSelect}
                                    aria-label="Floating label select example">
                                <option >Open this select menu</option>
                                {educationLevels && educationLevels.map((item)=>{
                                    
                                  return  <option key={item.id} value={item.id}>{item.title}</option>
                                
                                })}
                            </select>
                            <label htmlFor="floatingSelectlevel">Education Level :</label>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="form-floating">
                            <select className="form-select" 
                                    id="floatingSelectcourse" 
                                    onChange={handleEducationCourceSelect}
                                    aria-label="Floating label select example">
                                <option >Open this select menu</option>
                                {educationCourses && educationCourses.map((item)=>{
                                    return <option key={item.id} value={item.id}>{item.name}</option>
                                })}
                            </select>
                            <label htmlFor="floatingSelectcourse">Cource :</label>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="form-floating">
                            <select className="form-select" 
                                    id="floatingSelectspecial" 
                                    onChange={handleEducationSpacialSelect}
                                    aria-label="Floating label select example">
                                <option >Open this select menu</option>
                               { educationSpacials && educationSpacials.map((item)=>{
                                  return <option key={item.id} value={item.id}>{item.name}</option>

                               })}
                              
                            </select>
                            <label htmlFor="floatingSelectspacial">Specialisation :</label>
                        </div>
                    </div>
                    <div className="col-lg-12 p-3">
                        <div className='border'>

                        </div>
                    </div>
                

                </div>
            </div>

        </>
    )
}

export default NewPostForm