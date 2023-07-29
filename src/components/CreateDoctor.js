import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctors, addDoctor } from '../redux/slices/doctors'


function CreateDoctor() {
    const dispatch = useDispatch();
	const { doctor } = useSelector((state) => state.doctors);
	const [successMessage, setSuccessMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
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

	const handleCreateNewDoctor = async (e) => {
		e.preventDefault();

		// Check if any field is empty

		const isAnyFieldEmpty = Object.values(doctorData).some(
			(value) => value === '',
		);

		// Display error message to fill out the empty field

		if (isAnyFieldEmpty) {
			setErrorMessage('Please fill out all fields');
			setTimeout(() => {
				setErrorMessage('');
			}, 3000);
			return;
		}
		await dispatch(addDoctor(doctorData));
		dispatch(fetchDoctors()); // Fetch doctor after new doctor creation
		setDoctorData({
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
		setSuccessMessage('Doctor created successfully');

		// Clear success message after a delay (e.g., 3 seconds)

		setTimeout(() => {
			setSuccessMessage('');
		}, 3000);
	};

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