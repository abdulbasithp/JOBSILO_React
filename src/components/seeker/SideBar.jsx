import React from 'react'


function SideBar({ handleCategorySelect, skills,
    locations, departments, handleDepartmentSelect,
    companyCategory }) {

    console.log(locations, 'sidebar');
    return (
        <>
            <div className='p-3 shadow'>
                <h6 className='p-2 '><b> Categories : </b></h6>
                <div className='col-lg-12 px-3 mb-3'>
                    <select className="form-select form-select-sm" onChange={handleCategorySelect} aria-label=".form-select-sm example">
                        <option value={null}>select industry type</option>
                        {companyCategory && companyCategory.map((item) => {
                            return <option key={item.id} value={item.id} >{item.category_name}</option>
                        })}
                    </select>
                </div>
                <div className='col-lg-12 px-3'>
                    <select className="form-select form-select-sm" onChange={handleDepartmentSelect} aria-label=".form-select-sm example">
                        <option >select industry type</option>
                        {departments && departments.map((item) => {
                            return <option key={item.id} value={item.id} >{item.department_name}</option>
                        })}
                    </select>
                </div>
                <div className='mt-4 category-subheading'>
                    <p className='mb-2'><b> Add Location :</b></p>
                    <div className='location-checkbox'>
                        {locations.map((item) => {
                            return (
                                <div key={item.id} className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        {item.name}
                                    </label>
                                </div>
                            )

                        })

                        }
                    </div>

                </div>
                <div className='mt-4 category-subheading'>
                    <p className='mb-2'><b> Add Skills :</b></p>
                    {skills && skills.map((item) => {
                        return (
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    {item.skill_name}
                                </label>
                            </div>
                        )

                    })

                    }
                </div>
            </div>
        </>
    )
}

export default SideBar