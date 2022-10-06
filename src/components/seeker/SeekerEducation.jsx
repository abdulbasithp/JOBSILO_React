import React from 'react'
import NoDataFound from './NoDataFound'

function SeekerEducation({educations}) {
    console.log(educations.length,'edu length');
    return (
        <>  
            { educations.length !== 0 
                ? (
            <div className="col mt-3">
                <div className="accordion accordion-flush" id="accordionFlushExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingOne">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                Accordion Item #1
                            </button>
                        </h2>
                        <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
                        </div>
                    </div>

                </div>
            </div>
            )
        : (<NoDataFound/>) }
        </>
    )
}

export default SeekerEducation