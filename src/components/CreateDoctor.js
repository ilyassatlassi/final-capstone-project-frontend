import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctors, addDoctor } from '../redux/slices/doctors'


function CreateDoctor() {
    const dispatch = useDispatch();
	const { doctor } = useSelector((state) => state.doctors);
	const [doctorData, setDoctorData] = useState({
		image: '',
		name: '',
		specialization: '',
		consultationFee: '',
		hospital: '',
        availability: '',
        description: '',
        facebook: '',
        twitter:'',
        instagram:'',
	});

    const handleInputChange = (e) => {
		setDoctorData({
			...doctorData,
			[e.target.name]: e.target.value,
		});
	};

  return (
    <div className='"container-b-form container"'>
        <form className='d-flex flex-column justify-content-center align-items-center'>
        <label className="mb-4 h5 d-flex flex-column">
					Name:
					<input
						className="mt-2 add-input"
						type="text"
						name="name"
						value={doctorData.name}
						onChange={handleInputChange}
					/>
				</label>
        </form>
    </div>
  )
}

export default CreateDoctor