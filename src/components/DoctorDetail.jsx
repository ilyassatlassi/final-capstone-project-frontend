import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchDoctor } from '../redux/slices/doctors';

function DoctorDetail() {
  const dispatch = useDispatch();
  const {Doctor}  = useSelector((state) => state.doctors);
  // const { id } = useParams();

  useEffect(() => {
    dispatch(fetchDoctor({
      id:51,
    }));
  }, [dispatch]);

  return (
    <div className="text-red-500 shadow flex flex-col lg:flex-row justify-center w-screen h-screen">
      DoctorDetail
      <div className="w-[400px] h-[400px] mr-6">
        <p>{Doctor.name}</p>
      </div>
    </div>
  );
}

export default DoctorDetail;
