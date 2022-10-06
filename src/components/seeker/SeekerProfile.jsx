import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createSeekerExperience, getSeekerEducations, getSeekerExperiences } from '../../api/api.service'
import AuthContext from '../../context/AuthContext'
import UserContext from '../../context/UserContext'
import ExperienceList from './ExperienceList'
import ExperienceModal from './ExperienceModal'
import SeekerBasicBox from './SeekerBasicBox'
import SeekerEducation from './SeekerEducation'
import './SeekerProfile.css'

function Profile() {
  const { user } = useContext(AuthContext)
  const { userLoggedData, userLocation } = useContext(UserContext)
 
  const [experiences, setExperiences] = useState([])
  const [educations, setEducations] = useState([])

  const [experienceFormData, setExperienceFormData] = useState({
    seeker: user.profile_id,
    employer: '',
    position: '',
    current_ctc: '',
    started_date: '',
    ended_date: null,
    currently_working: false
  })

  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      const profileId = user.profile_id
        getSeekerExperiences(profileId)
        .then((res) => {
          setExperiences(res.data)
        })
        .catch((err) => {
          console.log(err);
        });
        
        getSeekerEducations(profileId).then((res)=>{
          setEducations(res.data)
        }).catch((err)=>{
          console.log(err);
        })
    }
  }, [user])


  const handleNewExperienceSubmit = () => {
      createSeekerExperience(experienceFormData)
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          toast.success('New Experience added successfully', { autoClose: 1800 })
          setExperiences([
            ...experiences,
            res.data
          ]);
          setExperienceFormData({});
          navigate('/seeker/profile')
        }
        else if (res.response.status === 400) {
          toast.error('Check the data entered, Please try again..', { autoClose: 1800 })
        }
      })
  }

  const handleAddEducationButton = () =>{
    navigate(`/seeker/${user.id}/education/add/`)
  }

  console.log(userLocation, 'userlocation');
  console.log(userLoggedData, 'User logged data');
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className=" col-lg-4 col-md-7 mb-5 mb-lg-0 wow fadeIn">
            <SeekerBasicBox
              userLoggedData={userLoggedData}
              userLocation={userLocation} />
          </div>
          <div className="col-lg-8">
            <div className="ps-lg-1-6 ps-xl-5">

              <div className="mb-5 wow fadeIn">
                <div className="text-start mb-1-6 wow fadeIn d-flex justify-content-between">
                  <h2 className=" mb-0 text-primary">Experience</h2>
                  <button type="button" className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#experienceModal">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-square-dotted" viewBox="0 0 16 16">
                      <path d="M2.5 0c-.166 0-.33.016-.487.048l.194.98A1.51 1.51 0 0 1 2.5 1h.458V0H2.5zm2.292 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zm1.833 0h-.916v1h.916V0zm1.834 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zM13.5 0h-.458v1h.458c.1 0 .199.01.293.029l.194-.981A2.51 2.51 0 0 0 13.5 0zm2.079 1.11a2.511 2.511 0 0 0-.69-.689l-.556.831c.164.11.305.251.415.415l.83-.556zM1.11.421a2.511 2.511 0 0 0-.689.69l.831.556c.11-.164.251-.305.415-.415L1.11.422zM16 2.5c0-.166-.016-.33-.048-.487l-.98.194c.018.094.028.192.028.293v.458h1V2.5zM.048 2.013A2.51 2.51 0 0 0 0 2.5v.458h1V2.5c0-.1.01-.199.029-.293l-.981-.194zM0 3.875v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 5.708v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 7.542v.916h1v-.916H0zm15 .916h1v-.916h-1v.916zM0 9.375v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .916v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .917v.458c0 .166.016.33.048.487l.98-.194A1.51 1.51 0 0 1 1 13.5v-.458H0zm16 .458v-.458h-1v.458c0 .1-.01.199-.029.293l.981.194c.032-.158.048-.32.048-.487zM.421 14.89c.183.272.417.506.69.689l.556-.831a1.51 1.51 0 0 1-.415-.415l-.83.556zm14.469.689c.272-.183.506-.417.689-.69l-.831-.556c-.11.164-.251.305-.415.415l.556.83zm-12.877.373c.158.032.32.048.487.048h.458v-1H2.5c-.1 0-.199-.01-.293-.029l-.194.981zM13.5 16c.166 0 .33-.016.487-.048l-.194-.98A1.51 1.51 0 0 1 13.5 15h-.458v1h.458zm-9.625 0h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zm1.834-1v1h.916v-1h-.916zm1.833 1h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                    </svg>
                  </button>
                  <ExperienceModal
                      user={user}
                      experienceFormData={experienceFormData}
                      handleNewExperienceSubmit={handleNewExperienceSubmit}
                      setExperienceFormData={setExperienceFormData}
                      />

                </div>
                <ExperienceList
                  experiences={experiences}
                  setExperiences={setExperiences} />
              </div>
              <div className="row">
                <div className="col d-flex justify-content-between" >
                  <h2 className=" mb-0 text-primary">Education</h2>
                  <button type="button" className="btn btn-outline-success btn-sm" onClick={handleAddEducationButton}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-square-dotted" viewBox="0 0 16 16">
                      <path d="M2.5 0c-.166 0-.33.016-.487.048l.194.98A1.51 1.51 0 0 1 2.5 1h.458V0H2.5zm2.292 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zm1.833 0h-.916v1h.916V0zm1.834 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zM13.5 0h-.458v1h.458c.1 0 .199.01.293.029l.194-.981A2.51 2.51 0 0 0 13.5 0zm2.079 1.11a2.511 2.511 0 0 0-.69-.689l-.556.831c.164.11.305.251.415.415l.83-.556zM1.11.421a2.511 2.511 0 0 0-.689.69l.831.556c.11-.164.251-.305.415-.415L1.11.422zM16 2.5c0-.166-.016-.33-.048-.487l-.98.194c.018.094.028.192.028.293v.458h1V2.5zM.048 2.013A2.51 2.51 0 0 0 0 2.5v.458h1V2.5c0-.1.01-.199.029-.293l-.981-.194zM0 3.875v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 5.708v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 7.542v.916h1v-.916H0zm15 .916h1v-.916h-1v.916zM0 9.375v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .916v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .917v.458c0 .166.016.33.048.487l.98-.194A1.51 1.51 0 0 1 1 13.5v-.458H0zm16 .458v-.458h-1v.458c0 .1-.01.199-.029.293l.981.194c.032-.158.048-.32.048-.487zM.421 14.89c.183.272.417.506.69.689l.556-.831a1.51 1.51 0 0 1-.415-.415l-.83.556zm14.469.689c.272-.183.506-.417.689-.69l-.831-.556c-.11.164-.251.305-.415.415l.556.83zm-12.877.373c.158.032.32.048.487.048h.458v-1H2.5c-.1 0-.199-.01-.293-.029l-.194.981zM13.5 16c.166 0 .33-.016.487-.048l-.194-.98A1.51 1.51 0 0 1 13.5 15h-.458v1h.458zm-9.625 0h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zm1.834-1v1h.916v-1h-.916zm1.833 1h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="row">
                <SeekerEducation 
                    educations={educations} />
              </div>


            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile