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
      twitter: '',
      instagram: '',
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
    <div className="flex flex-col items-center justify-center">
      <div className="h-auto w-auto lg:w-[800px] p-6 bg-slate-300 rounded-lg shadow-lg">
        <h1 className="text-center text-[25px] font-bold mb-6"> Add Doctors</h1>
        <form
          className="space-y-4 shadow-lg px-1"
          onSubmit={handleCreateNewDoctor}
        >
          <label className="block mb-1" htmlFor>
            Name:
            <input
              className="w-full border border-gray-300 rounded px-3 py-2"
              type="text"
              name="name"
              value={doctorData.name}
              onChange={handleInputChange}
            />
          </label>

          <label className="block mb-1" htmlFor>
            Description:
            <textarea
              className="w-full border border-gray-300 rounded px-3 py-2"
              type="text"
              name="description"
              value={doctorData.description}
              onChange={handleInputChange}
            />
          </label>

          <label className="block mb-1" htmlFor>
            Picture:
            <input
              placeholder="Enter photo URL here"
              className="w-full border border-gray-300 rounded px-3 py-2"
              type="text"
              name="image"
              value={doctorData.image}
              onChange={handleInputChange}
            />
          </label>

          <label className="block mb-1" htmlFor>
            ConsultationFee:
            <input
              placeholder="Enter price here"
              className="w-full border border-gray-300 rounded px-3 py-2"
              type="text"
              name="consultationFee"
              value={doctorData.consultationFee}
              onChange={handleInputChange}
            />
          </label>

          <label className="block mb-1" htmlFor>
            Specialization:
            <input
              className="w-full border border-gray-300 rounded px-3 py-2"
              type="text"
              name="specialization"
              value={doctorData.specialization}
              onChange={handleInputChange}
            />
          </label>

          <label className="block mb-1" htmlFor>
            Hospital:
            <input
              className="w-full border border-gray-300 rounded px-3 py-2"
              type="text"
              name="hospital"
              value={doctorData.hospital}
              onChange={handleInputChange}
            />
          </label>
          <label className="flex mb-1" htmlFor>
            Availability:
            <div className=" bg-gray-200 cursor-pointer relative w-16 h-8 rounded-full ml-2">
              <input type="checkbox" className="sr-only peer" checked={doctorData.availability} onChange={handleAvailabilityClick} />
              <span className=" w-2/5 h-4/5 bg-[#96bf01] absolute rounded-full left-1 top-1 peer-checked:bg-green-500 peer-checked:left-9" />
            </div>
          </label>

          <label className="block mb-1" htmlFor>
            Facebook:
            <input
              placeholder="Enter facebook URL here"
              className="w-full border border-gray-300 rounded px-3 py-2"
              type="text"
              name="facebook"
              value={doctorData.facebook}
              onChange={handleInputChange}
            />
          </label>

          <label className="block mb-1" htmlFor>
            Instagram:
            <input
              placeholder="Enter instagram URL here"
              className="w-full border border-gray-300 rounded px-3 py-2"
              type="text"
              name="instagram"
              value={doctorData.instagram}
              onChange={handleInputChange}
            />
          </label>

          <label className="block mb-1" htmlFor>
            Twitter:
            <input
              placeholder="Enter twitter URL here"
              className="w-full border border-gray-300 rounded px-3 py-2"
              type="text"
              name="twitter"
              value={doctorData.twitter}
              onChange={handleInputChange}
            />
          </label>

          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="w-auto lg:w-60 p-12 m-12 bg-[#96bf01] hover:bg-green-500 text-white rounded py-2 font-bold"
            >
              Add Doctor
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
