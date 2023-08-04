import React from 'react';
import PropTypes from 'prop-types';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const DoctorCard = ({
  name,
  image,
  twitter,
  instagram,
  facebook,
  description,
  id,
}) => (
  <div className="w-[100%] flex flex-col justify-center items-center sm:w-[30%]">
    <Link to={`/detailsPage/${id}`} className="flex flex-col justify-center items-center gap-2">
      <img src={image} alt="doctor" className="w-[200px] h-[200px] sm:h-[200px] rounded-[50%] object-cover object-top" />
      <div className="mt-2 text-black">
        <p className="font-bold">{name}</p>
      </div>
      <hr className="w-2/5 border-dotted border-[1px] border-[#eee] my-2" />
      <div>
        <p className="text-[#c7c6c6] text-center text-[14px]">{description}</p>
      </div>
    </Link>
    <div className="flex mt-5 items-center gap-4">
      <a
        href={twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="border-2 p-2 rounded-[100%]"
      >
        <FaTwitter size={15} color="#c7c6c6" />
      </a>
      <a
        href={instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="border-2 p-2 rounded-[100%]"
      >
        <FaInstagram size={15} color="#c7c6c6" />
      </a>
      <a
        href={facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="border-2 p-2 rounded-[100%]"
      >
        <FaFacebook size={15} color="#c7c6c6" />
      </a>
    </div>
  </div>
);

DoctorCard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  twitter: PropTypes.string.isRequired,
  instagram: PropTypes.string.isRequired,
  facebook: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default DoctorCard;
