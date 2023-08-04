import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReservations, deleteReservation } from '../redux/slices/reservations';
import { fetchDoctors } from '../redux/slices/doctors';
import Loading from './Loading';

const MyReservations = () => {
  const dispatch = useDispatch();

  const reservationsReady = useSelector((store) => store.reservations.ready);
  const doctorsReady = useSelector((store) => store.doctors.ready);
  const { reservations } = useSelector((store) => store.reservations);
  const { doctors } = useSelector((store) => store.doctors);

  useEffect(() => {
    if (!reservations.length) dispatch(fetchReservations());
    if (!doctors.length) dispatch(fetchDoctors());
  }, [dispatch, reservations.length, doctors.length]);

  const handleDeleteReservation = async (id) => {
    dispatch(deleteReservation({ id }));
  };

  const newReservationArray = [];
  reservations.forEach((reservation) => {
    doctors.forEach((doctor) => {
      if (reservation.doctor_id === doctor.id) {
        const dateObject = new Date(reservation.time);
        const timeOptions = {
          hour: '2-digit',
          minute: '2-digit',
        };
        const formattedTime = dateObject.toLocaleTimeString('en-US', timeOptions);
        const newReservationObject = {
          doctor: doctor.name,
          time: formattedTime,
          date: reservation.date,
          city: reservation.city,
          id: reservation.id,
        };
        newReservationArray.push(newReservationObject);
      }
    });
  });

  if (!reservationsReady || !doctorsReady) return <Loading />;

  return (
    <div className="w-full">
      <h1 className="text-center mb-10 font-bold text-xl bg-[#97af0e] p-4 text-[26px]">MY RESERVATIONS</h1>
      <ul className="w-100">
        {
          newReservationArray.map((reservation, index) => (
            <li key={reservation.id} className="bg-yellow-100 mb-3 p-5">
              <h2 className="text-[35px] font-bold">
                {index + 1}
                .
              </h2>
              <h3 className="flex gap-2">
                <b>Appointment with:</b>
                <span>
                  {reservation.doctor}
                </span>
              </h3>
              <h3 className="flex gap-2">
                <b>City:</b>
                <span>
                  {reservation.city}
                </span>
              </h3>
              <h3 className="flex gap-2">
                <b>Appointment Date:</b>
                <span>
                  {reservation.date}
                </span>
              </h3>
              <h3 className="flex gap-2">
                <b>Appointment Time:</b>
                <span>
                  {reservation.time}
                </span>
              </h3>
              <button
                onClick={() => handleDeleteReservation(reservation.id)}
                type="button"
                className="mt-3 bg-red-400 px-10 py-2 text-white"
              >
                Delete
              </button>
            </li>
          ))
        }
        {
          newReservationArray.length === 0 && (
            <li className="bg-yellow-100 p-5">
              <h2 className="text-[20px] mb-3 font-bold">
                You have no reservations yet.
              </h2>
              <Link to="/reserve-doctor">Reserve a doctor</Link>
            </li>
          )
        }
      </ul>
    </div>
  );
};

export default MyReservations;
