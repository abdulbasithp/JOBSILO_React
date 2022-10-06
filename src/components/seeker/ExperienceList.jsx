import React, { useEffect, useState } from 'react'

import ExperienceItem from './ExperienceItem'
import "./ExperienceList.css"
import NoDataFound from './NoDataFound'

function ExperienceList({experiences , setExperiences}) {
 
 

  return (
    <>
      { experiences && experiences.length !== 0 
        ? experiences.map((item)=>{
          return < ExperienceItem 
                        key={item.id} 
                        item={item}
                        experiences={experiences}
                        setExperiences={setExperiences} />
        })
        : (<NoDataFound/>) }
    
    </>
  )
}

export default ExperienceList