import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { patchCompanyDetails, getSearchCompanyList } from '../../api/api.service';
import AuthContext, { baseUrl } from '../../context/AuthContext';
import UserContext from '../../context/UserContext';
import CompanyDetail from './CompanyDetail';
import './CompanyDetailForm.css'
import CreateCompanyDetail from './CreateCompanyDetail';

function CompanyDetailForm() {
    const { user } = useContext(AuthContext)
    const { userProfile, setUserProfile, setUserCompany } = useContext(UserContext)


    const [searchWord, setSearchWord] = useState('')
    const [searchCompanyList, setSearchCompanyList] = useState([])
    const [selectedCompany, setSelectedCompany] = useState({})

    const [isAddComapnyDetail, setIsAddCompanyDetail] = useState(false)
    const [addCompanyDetailFormData, setAddCompanyDetailFormData] = useState({
        company_name: '',
        category: '',
        company_logo: null,
        started_date: '',
        about: '',
        founder: '',
        ceo_name: '',
        ceo_image: '',
        head_office_location: '',

    })

    const navigate = useNavigate()

    const handleSearchCompany = (e) => {
        setSearchWord(e.target.value)
        try {
            getSearchCompanyList(searchWord).then((response) => {
                setSearchCompanyList(response.data)
            })
                .catch((error) => {
                    console.log(error.data);
                })
        } catch (error) {
            console.log('error in company search list');
        }
    }

    const handleSelectCompany = () => {
        const data = { company: selectedCompany.id }
        patchCompanyDetails(user.profile_id, data)
            .then((response) => {
                if (response.status === 200) {
                    setUserProfile({
                        ...userProfile,
                        company: selectedCompany.id,
                    });
                    setUserCompany(selectedCompany);
                    toast.success('Company Details added successfully', { autoClose: 1300 })
                    navigate(-1)

                }
                else if (response.status === 400) {
                    toast.error(response.statusText, { autoClose: 1300 })
                }
                else {
                    toast.error('There is an error occurs, Please try again!')
                }
                console.log(response, 'addcompanyfunction');
            })
            .catch((error) => {
                console.log(error, 'add company detaiils');
            })

    }

    const handleCreateCompanyDetailButton = () => {
        setSelectedCompany({})
        setIsAddCompanyDetail(!isAddComapnyDetail);
    }

    return (
        <>
            <div style={{ "minHeight": "120vh" }}>
                <div className=' company-detail-container' >
                    <span style={{ "fontSize": "2rem" }} className='text-start fw-lighter mb-4'>Add Company Details To Your Profile</span>

                    <div className='row'>
                        <div className="dropdown-center col-lg-9 mb-3">
                            <button className=" dropdown-toggle w-100 shadow" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <div className=''> Select Company From The List</div>
                            </button>
                            <ul className="dropdown-menu w-100">
                                <li>
                                    <div className='d-flex'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="align-self-center ms-3 bi bi-search" viewBox="0 0 16 16">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                        </svg>
                                        <input type="text"
                                            className='dropdown-item company-search'
                                            placeholder='search'
                                            onChange={handleSearchCompany} />
                                    </div>
                                </li>
                                {searchCompanyList && searchCompanyList.map((item) => {
                                    return (<li key={item.id}
                                        className='dropdown-item'
                                        onClick={() => setSelectedCompany(item)}>
                                        {item.company_name}
                                    </li>)
                                })}
                            </ul>
                        </div>
                        <div className='col-lg-3'>
                            <button className='btn btn-primary ms-3 ' onClick={handleSelectCompany}>select </button>
                            <button className='btn btn-info ms-3' onClick={handleCreateCompanyDetailButton} >create new</button>
                        </div>
                    </div>

                    <div className="d-flex">
                        <div className=" container  align-center">
                            <CompanyDetail selectedCompany={selectedCompany} />
                        </div>
                    </div>


                </div>
                {isAddComapnyDetail && (
                    <>
                        <CreateCompanyDetail
                            setIsAddCompanyDetail = {setIsAddCompanyDetail}
                            addCompanyDetailFormData={addCompanyDetailFormData}
                            setAddCompanyDetailFormData={setAddCompanyDetailFormData} />
                    </>
                )}
            </div>
        </>
    )
}

export default CompanyDetailForm