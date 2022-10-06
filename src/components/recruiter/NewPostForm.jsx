import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { createNewJobPost, getAllCompanyDepartments, getEducationCourses, getEducationLevels, getEducationSpecialisations, getSkillsByDepartment, retrieveEducationSpacialisation } from '../../api/api.service'
import UserContext from '../../context/UserContext'
import './NewPostForm.css'
import SkillItem from './SkillItem'
import SpecailisationItem from './SpecailisationItem'

function NewPostForm({ recruiterId, userCompany, setNewPost ,jobPosts, setJobPosts}) {
    const { userProfile } = useContext(UserContext);

    const [educationLevels, setEducationLevels] = useState([])
    const [educationCourses, setEducationCourses] = useState([])
    const [educationSpacials, setEducationSpacials] = useState([])
    const [specilaisationSelected, setSpecialisationSelected] = useState([])

    const [companyDepartments, setCompanyDepartments] = useState([])
    const [skills, setSkills] = useState([])
    const [skillsSelected, setSkillsSelected] = useState([])

    const [formData, setFormData] = useState({
        recruiter: recruiterId,
        title: '',
        qualification: [],
        qualification_disc: '',
        roles: '',
        experience: '',
        experience_desc: '',
        skills: [],
        job_type: 'in_office',
        location: '',
        min_salary_package: '',
        max_salary_package: '',
        expiry_date: '',
    })


    useEffect(() => {
        getEducationLevels()
            .then((response) => {
                setEducationLevels(response.data)
            }).catch((error) => {
                console.log(error);
            });


    }, [])
    useEffect(() => {
        if (userCompany) {
            const companyCategoryId = userCompany.category
            getAllCompanyDepartments(companyCategoryId)
                .then((res) => {
                    setCompanyDepartments(res.data)
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [])

    // education
    const handleEducationLevelSelect = (e) => {
        const educationLevelSelected = e.target.value
        if (educationLevelSelected) {
            getEducationCourses(educationLevelSelected)
                .then((res) => {
                    setEducationCourses(res.data);
                }).catch((error) => {
                    console.log(error);
                })
        }

    }

    const handleEducationCourceSelect = (e) => {
        const educationCourceSelected = e.target.value
        if (educationCourceSelected) {
            getEducationSpecialisations(educationCourceSelected)
                .then((res) => {
                    setEducationSpacials(res.data)
                })
                .catch((err) => {
                    console.log(err);
                })
            console.log(educationCourceSelected, 'education cource');
        }
    }


    const handleEducationSpacialSelect = (e) => {
        const educationSpecialSelected = Number(e.target.value)
        const name = e.target.name
        // console.log(educationSpecialSelected, 'education spacial selected');
        if (educationSpecialSelected) {
            const educationSpecial = educationSpacials.filter((item) => item.id === educationSpecialSelected)
            // console.log(educationSpecial, 'educationSpecial');
            if (!formData.qualification.includes(educationSpecialSelected)) {
                setFormData({
                    ...formData,
                    [name]: [...formData.qualification, educationSpecialSelected]
                })
                setSpecialisationSelected([
                    ...specilaisationSelected,
                    educationSpecial[0]
                ])
            }

        }
    }

    //  skills 
    const handleDepartmentSelect = (e) => {
        const selectedDepartmentId = Number(e.target.value)
        if (selectedDepartmentId) {
            getSkillsByDepartment(selectedDepartmentId)
                .then((res) => {
                    setSkills(res.data)
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        console.log(selectedDepartmentId);

    }

    const handleSkillSelect = (e) => {
        if (e.target.value) {
            const skillId = Number(e.target.value)
            const name = e.target.name
            console.log(skillId);
            if (!formData.skills.includes(skillId)) {
                const skill = skills.filter((item) => item.id === skillId)
                setSkillsSelected([
                    ...skillsSelected,
                    skill[0]
                ])
                setFormData({
                    ...formData,
                    [name]: [...formData.skills, skillId]
                })
            }
        }

    }

    const handleChangeInputField = (e) => {
        const name = e.target.name
        const value = e.target.value
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        console.log(formData, 'submitting');
        createNewJobPost(formData)
            .then((res) => {
                if (res.status === 201) {
                    setNewPost(false)
                    setJobPosts([...jobPosts,res.data])
                    toast.success('New job post created.', { autoClose: 1800 })
                } else if (res.response.status === 400) {
                    toast.error('There is an error in form submission.add data properly!', { autoClose: 1800 })
                }
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    // console.log(skillsSelected, 'skillssss');
    // console.log(educationSpecial,'educationSecial');
    console.log(formData);
    return (
        <>
            <h4 className='text-center my-3'>Create New Job Post</h4>
            <div className='container'>
                <form action="" >
                    <div className="row g-2">
                        <div className="col-lg-12">
                            <label htmlFor='job-title' className="col-form-label col-form-label-sm">Job Title <span style={{ "color": "red" }} >*</span></label>
                            <input type="text"
                                onChange={handleChangeInputField}
                                className="form-control form-control-sm" id="job-title" placeholder=""
                                name='title' />
                        </div>
                        <div className="col-lg-12">
                            <label htmlFor="" >Qualifications <span style={{ "color": "red" }} >*</span></label>
                        </div>
                        <div className="col-lg-4">
                            <div className="form-floating">
                                <select className="form-select"
                                    id="floatingSelectlevel"
                                    onChange={handleEducationLevelSelect}
                                    aria-label="Floating label select example">
                                    <option value={null}>Open this select menu</option>
                                    {educationLevels && educationLevels.map((item) => {

                                        return <option key={item.id} value={item.id}>{item.title}</option>

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
                                    <option value={null}>Open this select menu</option>
                                    {educationCourses && educationCourses.map((item) => {
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
                                    name='qualification'
                                    onChange={handleEducationSpacialSelect}
                                    aria-label="Floating label select example">
                                    <option value={null}>Open this select menu</option>
                                    {educationSpacials && educationSpacials.map((item) => {
                                        return <option key={item.id} value={item.id}>{item.name}</option>

                                    })}

                                </select>
                                <label htmlFor="floatingSelectspacial">Specialisation :</label>
                            </div>
                        </div>
                        <div className="col-lg-12 ">
                            <div className='specialisation-selected d-flex'>
                                {specilaisationSelected && specilaisationSelected.map((item) => {
                                    return <SpecailisationItem key={item.id}
                                        formData={formData}
                                        setFormData={setFormData}
                                        specilaisationSelected={specilaisationSelected}
                                        setSpecialisationSelected={setSpecialisationSelected}
                                        item={item} />
                                })}
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <label htmlFor='qualificaton-disc' className="col-form-label col-form-label-sm">Qualification-discription </label>
                            <input type="text"
                                onChange={handleChangeInputField}
                                name='qualification_disc'
                                className="form-control form-control-sm"
                                id="qualification-disc" placeholder="" />
                        </div>
                        <div className="col-lg-12">
                            <label htmlFor='roles' className="col-form-label col-form-label-sm">Roles and Responsibilties <span style={{ "color": "red" }} >*</span></label>
                            <textarea type="text" name='roles'
                                onChange={handleChangeInputField}
                                className="form-control form-control-sm"
                                id="qualification-disc" placeholder="" />
                        </div>
                        <div className="col-lg-4">
                            <label htmlFor='experience' className="col-form-label col-form-label-sm">Experience(year) <span style={{ "color": "red" }} >*</span></label>
                            <input type="number" name='experience'
                                onChange={handleChangeInputField}
                                className="form-control form-control-sm"
                                id="qualification-disc" placeholder="" />
                        </div>
                        <div className="col-lg-12">
                            <label htmlFor='experience' className="col-form-label col-form-label-sm">Experience-description </label>
                            <input type="text" name='experience_desc'
                                onChange={handleChangeInputField}
                                className="form-control form-control-sm"
                                id="qualification-disc" placeholder="" />
                        </div>
                        <label htmlFor="" className='col-form-label col-form-label-sm' >Skills <span style={{ "color": "red" }} >*</span></label>
                        <div className="col-lg-6">
                            <div className="form-floating">
                                <select className="form-select"
                                    id="floatingSelectlevel"
                                    onChange={handleDepartmentSelect}
                                    aria-label="Floating label select example">
                                    <option value={null}>Open this select menu</option>
                                    {companyDepartments && companyDepartments.map((item) => {

                                        return <option key={item.id} value={item.id}>{item.department_name}</option>

                                    })}
                                </select>
                                <label htmlFor="floatingSelectlevel">Work area type :</label>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-floating">
                                <select className="form-select"
                                    id="floatingSelectlevel"
                                    name='skills'
                                    onChange={handleSkillSelect}
                                    aria-label="Floating label select example">
                                    <option value={null}>Open this select menu</option>
                                    {skills && skills.map((item) => {

                                        return <option key={item.id} value={item.id}>{item.skill_name}</option>

                                    })}
                                </select>
                                <label htmlFor="floatingSelectlevel">Work area type :</label>
                            </div>
                        </div>
                        <div className="col-lg-12 ">
                            <div className='specialisation-selected d-flex'>
                                {skillsSelected && skillsSelected.map((item) => {
                                    return <SkillItem key={item.id}
                                        formData={formData}
                                        setFormData={setFormData}
                                        skillsSelected={skillsSelected}
                                        setSkillsSelected={setSkillsSelected}
                                        item={item} />
                                })}
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <label htmlFor='experience' className="col-form-label col-form-label-sm">Location :<span style={{ "color": "red" }} >*</span></label>
                            <input type="text" name='location'
                                onChange={handleChangeInputField}
                                className="form-control form-control-sm"
                                id="qualification-disc" placeholder="" />
                        </div>
                        <div className="col-lg-4">
                            <div className="form-floating">
                                <select className="form-select"
                                    id="floatingSelectlevel"
                                    name='job_type'
                                    onChange={handleChangeInputField}
                                    aria-label="Floating label select example">
                                    <option value="in_office">In Office</option>
                                    <option value="remote">Remote</option>
                                    <option value="hybrid">Hybrid</option>

                                </select>
                                <label htmlFor="floatingSelectlevel">Work area type :<span style={{ "color": "red" }} >*</span></label>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <label htmlFor='' className="col-form-label col-form-label-sm">Expery Date : <span style={{ "color": "red" }} >*</span></label>
                            <input type="date" name='expiry_date'
                                onChange={handleChangeInputField}
                                className="form-control form-control-sm"
                                id="qualification-disc" placeholder="" />
                        </div>
                        <div className="col-lg-4">
                            <label htmlFor='' className="col-form-label col-form-label-sm">Min Salary (lpa) : <span style={{ "color": "red" }} >*</span></label>
                            <input type="number" name='min_salary_package'
                                onChange={handleChangeInputField}
                                className="form-control form-control-sm"
                                id="qualification-disc" placeholder="" />
                        </div>
                        <div className="col-lg-4">
                            <label htmlFor='' className="col-form-label col-form-label-sm">Max Salary (lpa) : <span style={{ "color": "red" }} >*</span></label>
                            <input type="number" name='max_salary_package'
                                onChange={handleChangeInputField}
                                className="form-control form-control-sm"
                                id="qualification-disc" placeholder="" />
                        </div>
                        <div className='col-lg-12'>
                            <button className='btn btn-outline-primary w-100' type='submit' onClick={handleSubmitForm}>
                                create new job
                            </button>
                        </div>

                    </div>
                </form>
            </div>

        </>
    )
}

export default NewPostForm