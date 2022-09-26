import React, { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { getCompanyCategory } from '../../api/api.service'

function CreateCompanyDetail({ addCompanyDetailFormData, setAddCompanyDetailFormData }) {

    const [companyCategory, setCompanyCategory] = useState([])
   
    const [logoFile, setLogoFile] = useState(null)
    const [logoUrl, setLogoUrl] = useState(null)

    const [ceoFile, setCeoFile] = useState(null)
    const [ceoImageUrl, setCeoImageUrl] = useState(null)

    const [categoryNameSelected, setCategoryNameSelected] = useState(null)

    const imageMimeType = /\/(?:jpg|jpeg|gif|png)/g;

    useEffect(() => {
        getCompanyCategory()
            .then((response) => {
                setCompanyCategory(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const handleFormFieldChange = (event) => {
        
        const name = event.target.name
        setAddCompanyDetailFormData({
            ...addCompanyDetailFormData,
            [name]: event.target.value,
        })
    }

    const handleImageUpload = (e)=>{
        const file = e.target.files[0]
        if (file && !file.type.match(imageMimeType)){
            toast.error('image type not supported, only jpg,jpeg,png and webp',{autoClose:1400})
        }else{
            if(e.target.name === 'company_logo'){
                setLogoFile(file);
            }else if(e.target.name === 'ceo_image'){
                setCeoFile(file)
            }
            
            const name = e.target.name
            setAddCompanyDetailFormData({
                ...addCompanyDetailFormData,
                [name]:file,
            })
        }
       
    }

    useEffect(()=>{
            let logofileReader,isCancel=false ;
            if(logoFile){
                
                logofileReader = new FileReader();
                logofileReader.onload = (e) => {
                    const {result} = e.target ;
                    if(result && !isCancel ){
                        setLogoUrl(result)
                    }
                }
                logofileReader.readAsDataURL(logoFile);
                
            }
        return (()=>{
            isCancel = true;
            if (logofileReader && logofileReader.readyState === 1){
                logofileReader.abort();
            }

        })
    },[logoFile])
    
    useEffect(()=>{
            let ceofileReader,isCancel = false ;
            if(ceoFile){
                
                ceofileReader = new FileReader();
                ceofileReader.onload = (e) => {
                    const {result} = e.target ;
                    if(result && !isCancel ){
                        setCeoImageUrl(result)
                    }
                }
                ceofileReader.readAsDataURL(ceoFile);
                
            }
        return (()=>{
            isCancel = true;
            if (ceofileReader && ceofileReader.readyState === 1){
                ceofileReader.abort();
            }

        })
    },[ceoFile])

    console.log(addCompanyDetailFormData);

    return (
        <>
            <div className="container">
                <div id="contact" className="contact-area section-padding">
                    <div className="container">

                        <div className="row create-company-form-row">

                            <div className="col-lg-6 p-2" style={{ "border": "0.5px #a6a6a6 solid", "borderRadius": "5px" }}>
                                <div className="section-title text-center fw-light">
                                    <h1>Add New Company</h1>
                                    <p className='text-danger fw-lighter '>
                                        Company details must be genuine, the data will go under the verification
                                    </p>
                                </div>
                                <div className="contact">
                                    <form className="form" encType='multipart/form-data' >
                                        <div className="row g-2">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="exampleFormControlInput1" className="form-label">Company Name : <span className='text-danger'>*</span></label>
                                                <input type="text"
                                                    name="company_name"
                                                    className="form-control"
                                                    value={addCompanyDetailFormData.company_name}
                                                    required="required"
                                                    onChange={handleFormFieldChange} />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="exampleFormControlInput1" className="form-label">Company Logo : <span className='text-danger'>*</span></label>
                                                <input type="file"
                                                    name="company_logo"
                                                    className="form-control"
                                                    placeholder="Company Logo"
                                                   
                                                    onChange={handleImageUpload}
                                                    required="required" />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="exampleFormControlInput1" className="form-label">CEO Name : <span className='text-danger'>*</span></label>
                                                <input type="text"
                                                    name="ceo_name"
                                                    className="form-control"
                                                    placeholder="CEO Name"
                                                    value={addCompanyDetailFormData.ceo_name}
                                                    onChange={handleFormFieldChange}
                                                    required="required" />
                                            </div>

                                            <div className="form-group col-md-6">
                                                <label htmlFor="exampleFormControlInput1" className="form-label">CEO Image : <span className='text-danger'>*</span></label>
                                                <input type="file"
                                                    name="ceo_image"
                                                    className="form-control"
                                                    placeholder="CEO Image"
                                                   
                                                    onChange={handleImageUpload}
                                                    required="required" />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="exampleFormControlInput1" className="form-label">Industry Type : <span className='text-danger'>*</span></label>
                                                <select className="form-select" name='category'
                                                    aria-label="Default select example"
                                                    value={addCompanyDetailFormData.category}
                                                    onChange={handleFormFieldChange}
                                                    placeholder='select category' required>
                                                    <option >select category </option>
                                                    {companyCategory && companyCategory.map((item) => (
                                                        <option key={item.id} value={item.id}>{item.category_name}</option>
                                                    ))
                                                    }

                                                </select>

                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="exampleFormControlInput1" className="form-label">Founded : <span className='text-danger'>*</span></label>
                                                <input type="text"
                                                    name="founder"
                                                    className="form-control"
                                                    value={addCompanyDetailFormData.founder}
                                                    onChange={handleFormFieldChange}

                                                    required="required" />
                                            </div>
                                            <div className="form-group col-md-6">

                                                <label htmlFor="exampleFormControlInput1" className="form-label">Founded Date : <span className='text-danger'>*</span></label>
                                                <input type="date"
                                                    name="started_date"
                                                    className="form-control"
                                                    value={addCompanyDetailFormData.started_date}
                                                    onChange={handleFormFieldChange}

                                                    required="required" />
                                            </div>
                                            <div className="form-group col-md-12">
                                                <label htmlFor="exampleFormControlInput1" className="form-label">Head Office : <span className='text-danger'>*</span></label>
                                                <input type="text"
                                                    name="head_office_location"
                                                    value={addCompanyDetailFormData.head_office_location}
                                                    onChange={handleFormFieldChange}
                                                    className="form-control"
                                                    required="required" />
                                            </div>
                                            <div className="form-group col-md-12">
                                                <label htmlFor="exampleFormControlInput1" className="form-label">About : <span className='text-danger'>*</span></label>
                                                <textarea rows="6"
                                                    name="about"
                                                    className="form-control"
                                                    value={addCompanyDetailFormData.about}
                                                    onChange={handleFormFieldChange}
                                                    placeholder="Your Message" required="required"></textarea>
                                            </div>
                                            <div className="col-md-12 text-center">
                                                <button type="submit" value="Send message" name="submit" id="submitButton"
                                                    className="btn btn-primary w-100 mb-3"
                                                    title="Submit Your Message!">Create</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-6 p-3">
                                <div className='row'>
                                    {addCompanyDetailFormData && (
                                        <>
                                            <div className="col">
                                                <img src={logoUrl && (logoUrl)} width="120px" alt="" />
                                                <h4>{addCompanyDetailFormData.company_name}</h4>
                                            </div>
                                            <div className="col">
                                                <img src={ceoImageUrl && (ceoImageUrl)} width="130px"  />
                                                <h5>{addCompanyDetailFormData.ceo_name}</h5>
                                            </div>
                                        </>
                                    )}


                                </div>
                                ssdf
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateCompanyDetail