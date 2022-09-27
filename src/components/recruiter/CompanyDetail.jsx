import React, { useState } from 'react'
import { useEffect } from 'react'
import './CompanyDetail.css'

function CompanyDetail({ selectedCompany }) {


  
  return (
    <>
      {Object.keys(selectedCompany).length !== 0 ? (
        <>
        <div className='d-flex '>
          <div className="container text-center justify-content-center">
            <div className='container company-data-container d-flex justify-content-between '>
              <div className='d-flex align-items-center'>
                <img src={selectedCompany.company_logo} className="m-5" width="70px"  alt="" />
                <h3 className='fw-lighter '> {selectedCompany.company_name}</h3>
              </div>
              <div className="">
                <img src={selectedCompany ? selectedCompany.ceo_image : "https://via.placeholder.com/150"}
                  width="120px"
                  alt=""
                  className='mt-5 mb-3 me-5 border-primary rounded' />
                <p className='text-center me-5 fs-small fw-bold'>Mr. {selectedCompany.ceo_name}</p>
              </div>

            </div>

            <div className="container ps-5 pb-5" style={{ "backgroundColor": "rgb(226, 234, 234)", "fontFamily": "fantasy" }}>
              <div className="col">
                <h5><strong>Founder : </strong> {selectedCompany.founder}</h5>
                <h5><strong>Founded Year : </strong> {selectedCompany.started_date}</h5>
                <h5><strong>Head Office : </strong> {selectedCompany.head_office_location}</h5>
                <p className=''> <strong> About :</strong> {selectedCompany.about}</p>
              </div>

            </div>
          </div>
        </div>

        </>
      )
        : null}

    </>
  )
}

export default CompanyDetail