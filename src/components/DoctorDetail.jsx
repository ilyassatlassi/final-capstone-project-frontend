/* eslint-disable */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import { BiLeftArrow } from 'react-icons/bi';
import { fetchDoctor } from '../redux/slices/doctors';
import Loading from './Loading';

function DoctorDetail() {
  const dispatch = useDispatch();
  const { doctor, ready } = useSelector((state) => state.doctors);
  const { id } = useParams();


  useEffect(() => {
    dispatch(
      fetchDoctor({id}),
    );
  }, [dispatch]);

    if (!ready) return <Loading />;

  return (
    <div className=" w-full text-center h-screen relative">
      <div className="flex flex-col">
        {/* <h3 className="uppercase font-bold">Doctor Details</h3> */}

          <Link to="/" className="lg:flex flex-col justify-end items-end hidden absolute bottom-[10%]">
            <button className="w-auto  bg-[#96bf01] hover:bg-green-500 text-white rounded-r-full mt-10 py-3 pr-3 pl-10 font-bold">
              <BiLeftArrow fill="white" />
            </button>
          </Link>
        <div className="lg:flex justify-around lg:mt-20">
          <div className="flex justify-center w-[500px]">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-full lg:h-[400px] h-[300px] bg-white"
            />
          </div>
          <div className="lg:w-1/4 md:mt-2">
            <div className="uppercase font-bold lg:text-center">{doctor.name}</div>
            <div className="text-center mt-2">{doctor.description}</div>
            <table className="table-auto w-full border-collapse mt-2">
              <tbody>
                <tr className="bg-gray-100">
                  <td className="px-4 py-2 ">Fee</td>
                  <td className="px-4 py-2">{doctor.consultation_fee}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Specialization</td>
                  <td className="px-4 py-2">{doctor.specialization}</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="px-4 py-2">Hospital</td>
                  <td className="px-4 py-2">{doctor.hospital}</td>
                </tr>
              </tbody>
            </table>

            <div className="flex flex-row justify-around mt-10">
              <a
                href={doctor.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter size={30} />
              </a>
              <a
                href={doctor.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={30} />

              </a>
              <a
                href={doctor.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook size={30} />
              </a>
            </div>
            <Link
              to="/"
              className="flex  justify-center font-bold items-center gap-2 mt-10"
            >
              DISCOVER MORE DOCTORS
              <IoIosArrowForward fill="black" />
            </Link>
            <button
              type="submit"
              className="w-auto lg:w-60  bg-[#96bf01] hover:bg-green-500 text-white rounded-full mt-10 p-2 font-bold"
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
