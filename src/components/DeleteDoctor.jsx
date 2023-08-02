import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteDoctor } from '../redux/slices/doctors/index';

const DeleteDoctor = ({ id }) => {
  const dispatch = useDispatch();
  return (

    <button type="button" className="mt-2 py-1 px-3 bg-red-500 text-white rounded-md" onClick={() => dispatch(deleteDoctor({ id }))}>
      Delete
    </button>
  );
};

DeleteDoctor.propTypes = {
  id: PropTypes.number.isRequired,
};

export default DeleteDoctor;
