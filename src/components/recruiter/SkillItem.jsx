import React from 'react'

function SkillItem({formData, setFormData, skillsSelected, setSkillsSelected, item}) {
    const handleSkillRemove = (id) => {
        // let skills = formData.skills
        setSkillsSelected(skillsSelected.filter(element => element.id !== id));
        if(formData.skills){
            const index = formData.skills.indexOf(id)
            console.log(index,'indexxx');
            setFormData({
                ...formData,
                [formData.skills]:[...formData.skills.splice(index,1)]
            })   ; 
        }
        
            console.log(skillsSelected);

    }
  return (
    <>
       <div className='p-2 specialisation-item' >
            <div className='text-center'>
                <span >{item.skill_name} <svg onClick={()=>handleSkillRemove(item.id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg></span>

            </div>
        </div>
    </>
  )
}

export default SkillItem