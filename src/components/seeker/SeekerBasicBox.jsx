import React from 'react'

function SeekerBasicBox({userLoggedData, userLocation}) {
    return (
        <>
            <div className="card border-0 shadow">
                <img src={userLoggedData && userLoggedData.profile_image} alt="..." />
                <div className="card-body p-1-9 p-xl-5">
                    <div className='d-flex justify-content-end' >
                        <svg style={{ "cursor": "pointer" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                        </svg>
                    </div>
                    <div className="mb-4">
                        <h3 className="h4 mb-0">{userLoggedData && `${userLoggedData.first_name} ${userLoggedData.middle_name} ${userLoggedData.last_name}`}</h3>

                    </div>
                    <ul className="list-unstyled mb-4" style={{ "fontSize": "smaller" }}>
                        <li className="mb-3"><span style={{ "color": "grey" }}>Email :</span><i className="far fa-envelope display-25 me-3 text-secondary"></i>{userLoggedData && userLoggedData.email}</li>
                        <li className="mb-3"><span style={{ "color": "grey" }}>Mobile No. :</span><i className="fas fa-mobile-alt display-25 me-3 text-secondary"></i>{userLoggedData && userLoggedData.phone_number}</li>
                        <li><span style={{ "color": "grey" }}>City :</span><i className="fas fa-map-marker-alt display-25 me-3 text-secondary"></i>{userLocation && userLocation.name}</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default SeekerBasicBox