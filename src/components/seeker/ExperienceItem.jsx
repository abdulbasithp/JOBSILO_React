import React from 'react'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { removeExperience } from '../../api/api.service'

function ExperienceItem({ item, setExperiences, experiences }) {

  const handleExperienceRemove = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this experience ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        removeExperience(item.id)
          .then((res)=>{
            console.log(res,'res remove');
            if (res.status === 204){
          
              console.log(experiences,'inside delete');
              setExperiences(experiences.filter((exp)=>exp.id !== item.id));
              Swal.fire(
                'Deleted!',
                'Your experience has been deleted.',
                'success'
              )
            }
            
          
          })
        
        
      }
        
    })

   
  }
  
  console.log(experiences,'experiences');
  return (
    <>
      <div className="row experience-item-row m-3 shadow">
        <div className="col">
          <div className='d-flex justify-content-between'>
            <h6><b> {item.position}</b></h6>

            <svg onClick={handleExperienceRemove} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash experience-remove-icon"  viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
              <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
            </svg>

          </div>
          <h6>( {item.employer} )</h6>
          <div className='d-flex justify-content-between'>
            <p>{item.started_date}</p>
            {item && item.currently_working
              ? <p>Currently Working</p>
              : (<p>{item.ended_date}</p>)
            }

          </div>
        </div>
      </div>
    </>
  )
}

export default ExperienceItem