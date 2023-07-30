import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctors, addDoctor } from "../redux/slices/doctors";

function CreateDoctor() {
  const dispatch = useDispatch();
  const { doctor } = useSelector((state) => state.doctors);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [doctorData, setDoctorData] = useState({
    image: "",
    name: "",
    specialization: "",
    consultationFee: "",
    hospital: "",
    availability: false,
    description: "",
    facebook: "",
    twitter: "",
    instagram: "",
  });

  const handleCreateNewDoctor = async (e) => {
    e.preventDefault();

    // Check if any field is empty

    const isAnyFieldEmpty = Object.values(doctorData).some(
      (value) => value === ""
    );

    // Display error message to fill out the empty field

    if (isAnyFieldEmpty) {
      setErrorMessage("Please fill out all fields");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }
    await dispatch(addDoctor(doctorData));
    dispatch(fetchDoctors()); // Fetch doctor after new doctor creation
    setDoctorData({
      image: "",
      name: "",
      specialization: "",
      consultationFee: "",
      hospital: "",
      availability: "",
      description: "",
      facebook: "",
      twitter: "",
      instagram: "",
    });
    setSuccessMessage("Doctor created successfully");

    // Clear success message after a delay (e.g., 3 seconds)

    setTimeout(() => {
      setSuccessMessage("");
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
      availability: true,
    });
  };

  return (
    <div className='"container-b-form container"'>
      <form
        className="d-flex flex-column justify-content-center align-items-center"
      >
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
        <label className="mb-4  h5 d-flex flex-column">
          Description:
          <textarea
            className="mt-2 add-input"
            type="text"
            name="description"
            value={doctorData.description}
            onChange={handleInputChange}
          />
        </label>

        <label className="mb-4 h5 d-flex flex-column">
          Picture:
          <input
            placeholder="Enter photo URL here"
            className="mt-2 add-input"
            type="text"
            name="image"
            value={doctorData.image}
            onChange={handleInputChange}
          />
        </label>

        <label className="mb-2 h5 d-flex flex-column">
          ConsultationFee:
          <input
            placeholder="Enter price here"
            className="mt-2 add-input"
            type="text"
            name="consultationFee"
            value={doctorData.consultationFee}
            onChange={handleInputChange}
          />
        </label>

        <label className="mb-2 h5 d-flex flex-column">
          Specialization:
          <input
            className="mt-2 add-input"
            type="text"
            name="specialization"
            value={doctorData.specialization}
            onChange={handleInputChange}
          />
        </label>

        <label className="mb-2 h5 d-flex flex-column">
          Hospital:
          <input
            className="mt-2 add-input"
            type="text"
            name="hospital"
            value={doctorData.hospital}
            onChange={handleInputChange}
          />
        </label>
        <label className="mb-4 h5 d-flex flex-column">
          Availability:
          <button className="mt-2 add-input" onClick={handleAvailabilityClick}>
            Set Availability to True
          </button>
        </label>

        <label className="mb-4 h5 d-flex flex-column">
          Facebook:
          <input
            placeholder="Enter facebook URL here"
            className="mt-2 add-input"
            type="text"
            name="facebook"
            value={doctorData.facebook}
            onChange={handleInputChange}
          />
        </label>

        <label className="mb-4 h5 d-flex flex-column">
          Instagram:
          <input
            placeholder="Enter instagram URL here"
            className="mt-2 add-input"
            type="text"
            name="instagram"
            value={doctorData.instagram}
            onChange={handleInputChange}
          />
        </label>

        <label className="mb-4 h5 d-flex flex-column">
          Twitter:
          <input
            placeholder="Enter twitter URL here"
            className="mt-2 add-input"
            type="text"
            name="twitter"
            value={doctorData.twitter}
            onChange={handleInputChange}
          />
        </label>

        <input className="mt-4 button-b-form" type="submit" value="Submit"onClick={handleCreateNewDoctor} />
      </form>
      {successMessage && (
        <p className="mt-2 alert alert-success text-center">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="mt-2 alert alert-danger text-center">
          Please fill out all fields
        </p>
      )}
    </div>
  );
}

export default CreateDoctor;
