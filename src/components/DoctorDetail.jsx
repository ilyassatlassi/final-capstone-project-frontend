import React from 'react';
// import { useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { fetchDoctors } from '../redux/slices/doctors';

function DoctorDetail() {
  // const dispatch = useDispatch();
  // const { Doctor } = useSelector((state) => state.doctors);
  // const { id } = useParams();

  // useEffect(() => {
  //   dispatch(fetchDoctors());
  // }, [id]);

  return (
    <div className="text-red-500 shadow flex flex-col lg:flex-row justify-center w-screen h-screen">
      DoctorDetail
      <div className="w-[400px] h-[400px] mr-6">
        {/* <img src={Doctor.image} alt={Doctor.name} /> */}
      </div>
    </div>
  );
}

export default DoctorDetail;
