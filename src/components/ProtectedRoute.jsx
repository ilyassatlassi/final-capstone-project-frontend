import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ component: Component }) => {
  const user = useSelector((state) => state.user.signedIn);

  if (user) {
    return <Component />;
  }

  return <Navigate to="auth/sign_in" />;
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default ProtectedRoute;
