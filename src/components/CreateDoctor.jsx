import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { addDoctor } from '../redux/slices/doctors';
import 'bulma/css/bulma.min.css';
import classNames from 'classnames';

function CreateDoctor() {
  const dispatch = useDispatch();
  const [IsSelected, setIsSelected] = useState(false);
  const [doctorData, setDoctorData] = useState({
    image: '',
    name: '',
    specialization: '',
    consultationFee: '',
    hospital: '',
    availability: IsSelected,
    description: '',
    facebook: '',
    twitter: '',
    instagram: '',
  });

  const { addSuccess, errors, ready } = useSelector((store) => store.doctors);
  const [loading, setLoading] = useState(false);
 

  const handleCreateNewDoctor = async (e) => {
    e.preventDefault();
    dispatch(addDoctor(doctorData));
  };

  useEffect(() => {
    if (addSuccess && doctorData.name.length) {
      toast.success('Doctor added!', {
        position: toast.POSITION.BOTTOM_LEFT,
        toastId: 'reserve-success',
        transition: Slide,
      });

      setDoctorData({
        image: '',
        name: '',
        specialization: '',
        consultationFee: '',
        hospital: '',
        availability: IsSelected,
        description: '',
        facebook: '',
        twitter: '',
        instagram: '',
      });
    }
  }, [addSuccess]);

  useEffect(() => {
    setLoading(!ready);
  }, [ready]);

  useEffect(() => {
    if (errors) {
      toast.error(errors.errors[0] || 'An error occured!', {
        position: toast.POSITION.BOTTOM_LEFT,
        toastId: 'reserve-error',
        transition: Slide,
      });
    }
  }, [errors]);

  const handleInputChange = (e) => {
    setDoctorData({
      ...doctorData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex-1 h-screen">
      <ToastContainer />
      <div className="w-full">
        <h1 className="text-center mb-10 font-bold text-xl bg-[#97af0e] p-4 text-[26px]">ADD A DOCTOR</h1>
        <form
          className="lg:w-[800px] m-auto p-10 flex flex-col gap-6"
          onSubmit={handleCreateNewDoctor}
        >
          <label className="" htmlFor="name">
            Name:
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 mt-3"
              type="text"
              name="name"
              value={doctorData.name}
              onChange={handleInputChange}
              required
            />
          </label>

          <label className=" " htmlFor="description">
            Description:
            <textarea
              className="w-full border border-gray-300 rounded px-3 py-2 mt-3"
              type="text"
              name="description"
              value={doctorData.description}
              onChange={handleInputChange}
              required
            />
          </label>

          <label className="" htmlFor="photo">
            Enter photo URL:
            <input
              placeholder="Enter photo URL here"
              className="w-full border border-gray-300 rounded px-3 py-2 mt-3"
              type="text"
              name="image"
              value={doctorData.image}
              onChange={handleInputChange}
              required
            />
          </label>

          <label className="" htmlFor="fee">
            Enter consultation fee (USD):
            <input
              placeholder="Enter price here"
              className="w-full border border-gray-300 rounded px-3 py-2 mt-3"
              type="number"
              name="consultationFee"
              value={doctorData.consultationFee}
              onChange={handleInputChange}
              required
            />
          </label>

          <label className="" htmlFor="spec">
            Enter specialization:
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 mt-3"
              type="text"
              name="specialization"
              value={doctorData.specialization}
              onChange={handleInputChange}
              required
            />
          </label>

          <label className="" htmlFor="hospital">
            Enter hospital name:
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 mt-3"
              type="text"
              name="hospital"
              value={doctorData.hospital}
              onChange={handleInputChange}
              required
            />
          </label>
          <div onClick={() => setIsSelected(!IsSelected)} className={classNames("flex bg-gray-500 rounded-full w-20 h-10",{"bg-green-600": IsSelected})}>
            <span className={classNames("bg-white w-10 rounded-full h-10",{"ml-10": IsSelected})}></span> 
          </div>

          <label className="" htmlFor="fb">
            Facebook:
            <input
              placeholder="Enter facebook URL here"
              className="w-full border border-gray-300 rounded px-3 py-2 mt-3"
              type="text"
              name="facebook"
              value={doctorData.facebook}
              onChange={handleInputChange}
              required
            />
          </label>

          <label className=" " htmlFor="insta">
            Instagram:
            <input
              placeholder="Enter instagram URL here"
              className="w-full border border-gray-300 rounded px-3 py-2 mt-3"
              type="text"
              name="instagram"
              value={doctorData.instagram}
              onChange={handleInputChange}
              required
            />
          </label>

          <label className=" " htmlFor="twitter">
            Twitter:
            <input
              placeholder="Enter twitter URL here"
              className="w-full border border-gray-300 rounded px-3 py-2 mt-3"
              type="text"
              name="twitter"
              value={doctorData.twitter}
              onChange={handleInputChange}
              required
            />
          </label>

          <div className="flex justify-center items-center">
            <button
              type="submit"
              className={`button is-primary ${loading && 'is-loading'}`}
            >
              Add Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateDoctor;
