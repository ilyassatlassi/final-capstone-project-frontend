import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReservations } from '../redux/slices/reservations';
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
          newReservationArray.map((reservation) => (
            <li key={reservation.id} className="bg-[#97f099] mb-3 p-4">
              <h3 className="flex gap-2">
                <b>Doctor&apos;s Name:</b>
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
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default MyReservations;
