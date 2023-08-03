import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReservation } from '../redux/slices/reservations';
import { fetchDoctors } from '../redux/slices/doctors';
import { fetchReservations } from '../redux/slices/reservations';

function CreateReservation() {
  const dispatch = useDispatch();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const {id} = useSelector((store)=> store.user)
  const [ReservationData, setReservationData] = useState({
    doctor_id: '',
    date: '',
    time: '',
    city: '',
    user_id: id,
  });

  useEffect(() => {
    dispatch(fetchDoctors());
    dispatch(fetchReservations())
  }, [dispatch]);

  const { doctors } = useSelector((store) => store.doctors);

  const handleCreateNewReservation = async (e) => {
    e.preventDefault();

    const postReservation = () => {
      dispatch(addReservation(ReservationData));
    };

    const isAnyFieldEmpty = Object.values(ReservationData).some(
      (value) => value === '',
    );

    if (isAnyFieldEmpty) {
      setErrorMessage('Please fill out all fields');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      return;
    }

    setReservationData({
      doctor_id: '',
      date: '',
      time: '',
      city: '',
    });
    setSuccessMessage('Reservation created successfully');

    // Clear success message after a delay (e.g., 3 seconds)

    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleInputChange = (e) => {
    setReservationData({
      ...ReservationData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex items-center justify-center flex-1 py-10 px-10">
      <div className="h-auto w-full lg:w-[800px]  ">
        <h1 className="text-center text-[25px] font-bold "> Add Reservations</h1>
        <form
          className="space-y-4 px-1 h-full"
          onSubmit={handleCreateNewReservation}
        >
          <label className="" htmlFor>
            Select a Doctor:
            <select
              className="w-full border border-gray-300 rounded px-3 py-2"
              type="text"
              name="doctor_id"
              value={ReservationData.selected}
              onChange={handleInputChange}
            >
              <option disabled selected>Select a Doctor</option>
              {
                                doctors.map((doctor) =>{
                                  return (
                                  <option value={doctor.id}>{doctor.name}</option>
                                )})
                            }
            </select>
          </label>

          <label className=" " htmlFor>
            What city are you currently located?:
            <input
              className="w-full border border-gray-300 rounded px-3 py-2"
              type="text"
              name="city"
              value={ReservationData.city}
              onChange={handleInputChange}
            />
          </label>

          <label className="" htmlFor>
            What day do you want to meet with your Doctor?:
            <input
              className="w-full border border-gray-300 rounded px-3 py-2"
              type="date"
              name="date"
              value={ReservationData.date}
              onChange={handleInputChange}
            />
          </label>

          <label className="" htmlFor>
            What time do you want to meet with your Reservation?:
            <input
              className="w-full border border-gray-300 rounded px-3 py-2"
              type="time"
              name="time"
              value={ReservationData.time}
              onChange={handleInputChange}
            />
          </label>

          <div className="flex justify-center items-center">
            <button
              type="submit"
              onClick={()=> dispatch(addReservation(ReservationData))}
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

export default CreateReservation;
