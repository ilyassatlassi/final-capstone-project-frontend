import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReservations } from '../redux/slices/reservations';
import { fetchDoctors } from '../redux/slices/doctors';

const MyReservations = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchReservations());
    dispatch(fetchDoctors());
  }, [dispatch]);
  const newReservationArray = [];
  const { reservations } = useSelector((store) => store.reservations);
  const { doctors } = useSelector((store) => store.doctors);
  reservations.map((reservation) => {
    doctors.map((doctor) => {
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
          doctorImage: doctor.image,
          id: reservation.id,
        };
        newReservationArray.push(newReservationObject);
      }
    });
  });

  return (
    <section className="grid lg:grid-cols-3 h-screen gap-4 w-screen justify-center p-6 bg-[#97BFOE]">
      {
      newReservationArray.map((reservation) => (
        <ul key={reservation.id} className="h-1/2 w-full">
          <li className="h-full w-full">
            <img className="h-full w-full rounded-xl" src={reservation.doctorImage} alt={reservation.doctor} />
          </li>
          <li className="flex gap-2">
            <h3 className="font-bold">
              Doctor&apos;s Name:
            </h3>
            {reservation.doctor}
          </li>
          <li className="flex gap-2">
            <h3 className="font-bold">City:</h3>
            {' '}
            {reservation.city}
          </li>
          <li className="flex gap-2">
            <h3 className="font-bold">Date of Meeting:</h3>
            {' '}
            {reservation.date}
          </li>
          <li className="flex gap-2">
            <h3 className="font-bold">Time of Meeting:</h3>
            {' '}
            {reservation.time}
          </li>
        </ul>
      ))
}
    </section>
  );
};

export default MyReservations;
