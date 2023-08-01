import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDoctor } from "../redux/slices/doctors";
import { FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";

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
    <div className="p-6 w-full text-center ">
      <div className="flex flex-col">
        {/* <h3 className="uppercase font-bold">Doctor Details</h3> */}

        <div className="lg:flex mt-20">
          <div className="flex justify-center lg:w-3/4">
            <img
              src="https://img.freepik.com/free-photo/portrait-smiling-young-woman-doctor-healthcare-medical-worker-pointing-fingers-left-showing-clini_1258-88108.jpg?w=996&t=st=1690911597~exp=1690912197~hmac=3a4f5f061838832744eb3e61e5469ab1395d27e15ea84787339d4a6f9f07fbeb"
              alt={Doctor.name}
              className="w-[500px] h-[400px] bg-white"
            />
          </div>
          <div className="lg:w-1/4 md:mt-2">
            <div className="uppercase font-bold text-right">{Doctor.name}</div>
            <div className="text-center mt-2">{Doctor.description}</div>
            <table className="table-auto w-full border-collapse mt-2">
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
                  <td className="px-4 py-2">Hospital</td>
                  <td className="px-4 py-2">{Doctor.hospital}</td>
                </tr>
              </tbody>
            </table>

            <div className="flex flex-row justify-around mt-10">
              <a
                href={Doctor.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter size={30}  />
              </a>
              <a
                href={Doctor.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={30} />
                
              </a>
              <a
                href={Doctor.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook size={30} />
              </a>
            </div>
            <button
              type="submit"
              className="w-auto lg:w-60  bg-[#96bf01] hover:bg-green-500 text-white rounded-full mt-10 py-2 font-bold"
            >
              Reservation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorDetail;
