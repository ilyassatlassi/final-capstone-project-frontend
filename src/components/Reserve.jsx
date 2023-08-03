import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { addReservation } from '../redux/slices/reservations';
import { fetchDoctors } from '../redux/slices/doctors';
import 'bulma/css/bulma.min.css';

function CreateReservation() {
  const dispatch = useDispatch();
  const [ReservationData, setReservationData] = useState({
    doctorId: '',
    date: '',
    time: '',
    city: '',
  });
  const { doctors } = useSelector((store) => store.doctors);
  const { addSuccess, errors, ready } = useSelector((store) => store.reservations);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (!doctors.length) dispatch(fetchDoctors());
  }, [dispatch, doctors.length]);

  useEffect(() => {
    if (addSuccess && ReservationData.date.length) {
      setReservationData({
        doctorId: '',
        date: '',
        time: '',
        city: '',
      });
      toast.success('Reservation successful!', {
        position: toast.POSITION.BOTTOM_LEFT,
        toastId: 'reserve-success',
        transition: Slide,
      });
    }
  }, [addSuccess]);

  useEffect(() => {
    if (errors) {
      toast.error(errors?.errors[0] || 'An error occured!', {
        position: toast.POSITION.BOTTOM_LEFT,
        toastId: 'reserve-error',
        transition: Slide,
      });
    }
  }, [errors]);

  useEffect(() => {
    setLoading(!ready);
  }, [ready]);

  const handleCreateNewReservation = async (e) => {
    e.preventDefault();
    setLoading(true);

    const doctorId = e.target.children[0].children[0].value;

    setReservationData({
      ...ReservationData,
      doctorId,
    });
    dispatch(addReservation(ReservationData));
  };

  const handleInputChange = (e) => {
    setReservationData({
      ...ReservationData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex-1">
      <ToastContainer />
      <div className="h-auto w-full">
        <h1 className="text-center mb-10 font-bold text-xl bg-[#97af0e] p-4 text-[26px]">RESERVE A DOCTOR</h1>
        <form
          className="lg:w-[800px] m-auto p-10 flex flex-col gap-6"
          onSubmit={handleCreateNewReservation}
        >
          <label className="" htmlFor="doctorId">
            Select a Doctor:
            <select
              className="w-full border border-gray-300 rounded px-3 py-2 mt-3"
              type="text"
              name="doctorId"
              value={id}
              required
            >
              <option value={null}>{}</option>
              {
                doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </option>
                ))
              }
            </select>
          </label>

          <label className=" " htmlFor="city">
            Enter your city:
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 mt-3"
              type="text"
              name="city"
              value={ReservationData.city}
              onChange={handleInputChange}
              required
            />
          </label>

          <label className="" htmlFor="date">
            Select a date:
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 mt-3"
              type="date"
              name="date"
              value={ReservationData.date}
              onChange={handleInputChange}
              required
            />
          </label>

          <label className="" htmlFor="time">
            Select a time:
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 mt-3"
              type="time"
              name="time"
              value={ReservationData.time}
              onChange={handleInputChange}
              required
            />
          </label>

          <div className="flex justify-center items-center">
            <button
              type="submit"
              className={`button is-primary ${loading && 'is-loading'}`}
            >
              Reserve Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateReservation;
