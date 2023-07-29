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

  return (
    <div>CreateDoctor</div>
  )
}

export default CreateDoctor