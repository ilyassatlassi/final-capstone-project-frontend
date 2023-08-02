import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchDoctors, addDoctor } from '../redux/slices/doctors';

function CreateDoctor() {
  const dispatch = useDispatch();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [doctorData, setDoctorData] = useState({
    image: '',
    name: '',
    specialization: '',
    consultationFee: '',
    hospital: '',
    availability: false,
    description: '',
    facebook: '',
    twitter: '',
    instagram: '',
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
    dispatch(addDoctor(doctorData));
    dispatch(fetchDoctors()); // Fetch doctor after new doctor creation
    setDoctorData({
      name: '',
      city: '',
      date: '',
      time: '',
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

  const handleAvailabilityClick = (e) => {
    e.preventDefault();
    setDoctorData({
      ...doctorData,
      availability: !doctorData.availability,
    });
  };

  return (
    <div className="flex items-center justify-center flex-1 py-10 px-10">
      <div className="h-auto w-full lg:w-[800px]  ">
        <h1 className="text-center text-[25px] font-bold "> Add Doctors</h1>
        <form
          className="space-y-4 px-1 h-full"
          onSubmit={handleCreateNewDoctor}
        >
          <label className="" htmlFor>
            Select a Doctor:
            <input
              className="w-full border border-gray-300 rounded px-3 py-2"
              type="text"
              name="name"
              value={doctorData.name}
              onChange={handleInputChange}
            />
          </label>

          <label className=" " htmlFor>
            What city are you currently located?:
            <textarea
              className="w-full border border-gray-300 rounded px-3 py-2"
              type="text"
              name="city"
              value={doctorData.city}
              onChange={handleInputChange}
            />
          </label>

          <label className="" htmlFor>
          What day do you want to meet with your doctor:
            <input
              className="w-full border border-gray-300 rounded px-3 py-2"
              type="date"
              name="date"
              value={doctorData.date}
              onChange={handleInputChange}
            />
          </label>

          <label className="" htmlFor>
           What time do you want to meet with your doctor?:
            <input
              className="w-full border border-gray-300 rounded px-3 py-2"
              type="text"
              name="time"
              value={doctorData.time}
              onChange={handleInputChange}
            />
          </label>

          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="w-auto lg:w-60  bg-[#96bf01] hover:bg-green-500 text-white rounded py-2 font-bold"
            >
              Reserve Doctor
            </button>
          </div>
        </form>
        {successMessage && (
          <p className="bg-green-200 font-bold mb-6 p-2 rounded shadow-lg">
            {successMessage}
          </p>
        )}
        {errorMessage && (
        <p className="bg-red-600 font-bold mb-6 p-2 rounded shadow-lg">
          Please fill out all fields
        </p>
        )}
      </div>
    </div>
  );
}

export default CreateDoctor;
