import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { authenticate } from '../redux/slices/user';

const ProtectedRoute = ({ component: Component }) => {
  const [auth, setAuth] = useState(null);
  const loading = useSelector((state) => state.user.loading);

  const dispatch = useDispatch();
  useEffect(() => {
    const data = dispatch(authenticate());
    setAuth(data);
  }, [dispatch]);

  if (loading) return <>loading</>;
  if (auth) {
    return <Component />;
  }

  return <Navigate to="/auth/sign_in" />;
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default ProtectedRoute;
