import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDoctor } from "../redux/slices/doctors";

function DoctorDetail() {
  const dispatch = useDispatch();
  const { Doctor } = useSelector((state) => state.doctors);
  // const { id } = useParams();

  useEffect(() => {
    dispatch(
      fetchDoctor({
        id: 51,
      })
    );
  }, [dispatch]);

  return (
    <div className="p-6 w-full text-center">
      <div className="flex flex-col">
        {/* <h3 className="uppercase font-bold">Doctor Details</h3> */}

        <div className="flex m-3">
          <div className="flex justify-center lg:w-3/4">
            <img
              src="https://img.freepik.com/free-photo/portrait-smiling-young-woman-doctor-healthcare-medical-worker-pointing-fingers-left-showing-clini_1258-88108.jpg?w=996&t=st=1690911597~exp=1690912197~hmac=3a4f5f061838832744eb3e61e5469ab1395d27e15ea84787339d4a6f9f07fbeb"
              alt={Doctor.name}
              className="w-[500px] h-[400px] bg-white"
            />
          </div>
          <div className="lg:w-1/4">
            <div className=" font-bold">{Doctor.name}</div>
            <table className="table-auto w-full border-collapse">
              <tbody>
                <tr className="bg-gray-100">
                  <td className="px-4 py-2 ">Fee</td>
                  <td className="px-4 py-2">{Doctor.consultation_fee}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Specialization</td>
                  <td className="px-4 py-2">{Doctor.specialization}</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="px-4 py-2">Age</td>
                  <td className="px-4 py-2">30</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Email</td>
                  <td className="px-4 py-2">johndoe@example.com</td>
                </tr>
                {/* <tr>
      <td className="px-4 py-2">Another Row</td>
      <td className="px-4 py-2">Value</td>
    </tr> */}
              </tbody>
            </table>

            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorDetail;
