import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loading from './Loading';

const ProtectedRoute = ({ component: Component }) => {
  const loading = useSelector((state) => state.user.loading);
  const signedIn = useSelector((state) => state.user.signedIn);

  if (loading) return <Loading />;

  if (signedIn) return <Component />;

  return <Navigate to="/auth/sign_in" />;
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default ProtectedRoute;
