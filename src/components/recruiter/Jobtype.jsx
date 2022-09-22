import React from 'react'
import { useState } from 'react'
import {AiOutlineHome, HiOutlineBuildingOffice2, MdHomeWork} from 'react-icons'

function Jobtype({jobtype}) {
    const [icon, setIcon] = useState('')
    if (jobtype==='remote'){
        setIcon('AiOutlineHome')
    }else if (jobtype==='in_office'){
        setIcon('HiOutlineBuildingOffice2')
    }else{
        setIcon('MdHomeWork')
    }
    


  return (
    <>
        <div>
            

        </div>

     
    </>
  )
}

export default Jobtype