import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReservations } from '../redux/slices/reservations';

const MyReservations = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchReservations());
  }, []);
  return (
    <div>
      MyReservations
    </div>
  );
};

export default MyReservations;
