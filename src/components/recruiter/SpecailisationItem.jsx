import React from 'react'

function SpecailisationItem({ item, formData,setFormData, specilaisationSelected, setSpecialisationSelected }) {
    const handleSpecialSelectionRemove = (id) => {
        let qualification = formData.qualification
        console.log(specilaisationSelected);
        setSpecialisationSelected(specilaisationSelected.filter(element => element.id !== id
        ));
        if(formData.qualification){
            const index = qualification.indexOf(id)
            console.log(index,'indexxx');
            setFormData({
                ...formData,
                [qualification]: [...formData.qualification.splice(index,1)]
            })
    
        }
        

    }
    return (
        <div className='p-2 specialisation-item' >
            <div className='text-center'>
                <span >{item.name} <svg onClick={()=>handleSpecialSelectionRemove(item.id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg></span>

            </div>
        </div>
    )
}

export default SpecailisationItem