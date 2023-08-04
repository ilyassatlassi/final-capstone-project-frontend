import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import { BiLeftArrow } from 'react-icons/bi';
import Loading from './Loading';

function DoctorDetail() {
  const navigate = useNavigate();
  const { ready, doctors } = useSelector((state) => state.doctors);
  const [doctor, setDoctor] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const doc = doctors.find((item) => item.id === parseInt(id, 10));
    setDoctor(doc);
  }, [id, doctors]);

  if (!ready) return <Loading />;

  return (
    <div className=" w-full text-center h-screen relative">
      <div className="flex flex-col">
        <Link to="/" className="lg:flex flex-col justify-end items-end hidden absolute bottom-[10%]">
          <button type="button" className="w-auto  bg-[#96bf01] hover:bg-green-500 text-white rounded-r-full mt-10 py-3 pr-3 pl-10 font-bold">
            <BiLeftArrow fill="white" />
          </button>
        </Link>
        <div className="flex flex-col md:flex-row gap-3 p-6 justify-between p-2">
          <div className="flex justify-center items-center lg:w-[500px]">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="rounded-[50%] w-[300px] h-[300px] object-cover object-top"
            />
          </div>
          <div className="lg:w-1/2 md:mt-10">
            <div className="uppercase text-[25px] font-bold md:text-left">{doctor.name}</div>
            <div className="text-center mt-2 md:text-left">{doctor.description}</div>
            <table className="table-auto text-left w-full border-collapse mt-5">
              <tbody>
                <tr className="bg-gray-100">
                  <td className="px-5 py-2 font-bold">Fee</td>
                  <td className="px-4 py-2">
                    $
                    {' '}
                    {doctor.consultation_fee}
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-2 font-bold">Specialization</td>
                  <td className="px-4 py-2">{doctor.specialization}</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="px-5 py-2 font-bold text-start">Hospital</td>
                  <td className="px-4 py-2">{doctor.hospital}</td>
                </tr>
              </tbody>
            </table>

            <div className="flex flex-row mt-10 justify-center gap-10 w-100">
              <a
                href={doctor.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter size={30} color="#c7c6c6" />
              </a>
              <a
                href={doctor.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={30} color="#c7c6c6" />

              </a>
              <a
                href={doctor.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook size={30} color="#c7c6c6" />
              </a>
            </div>
            <button
              type="submit"
              className="w-auto lg:w-60  bg-[#96bf01] hover:bg-green-500 text-white rounded-full my-10 p-2 px-6 font-bold"
              onClick={() => { navigate(`/reserve-doctor/${id}`); }}
            >
              Reserve
            </button>
            <Link
              to="/"
              className="flex justify-center font-bold items-center gap-2 mb-10 text-black"
            >
              DISCOVER MORE DOCTORS
              <IoIosArrowForward fill="black" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorDetail;
