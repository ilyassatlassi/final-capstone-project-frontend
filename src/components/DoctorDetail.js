import React, { useEffect } from 'react'
import { fetchDoctors } from '../redux/slices/doctors'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';



function DoctorDetail() {
  const dispatch = useDispatch();
  const { Doctor } = useSelector((state) => state.doctors);
  const { id } = useParams();

  useEffect (()=>{
    dispatch(fetchDoctors(id));
  },[id])

  return (
    <div className="text-red-500 shadow flex flex-col lg:flex-row items-center justify-center w-screen h-screen">DoctorDetail
    </div>
  )
}

export default DoctorDetail