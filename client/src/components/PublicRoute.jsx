import { useEffect } from 'react';

import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

import { useUser } from '../features/authentication/useUser';

function PublicRoute({ children }) {
  const { user, isLoading } = useUser();

  const navigate = useNavigate();
  useEffect(() => {
    if (user && !isLoading) {
      navigate('/notes');
    }
  }, [user, isLoading, navigate]);

  return children;
}

export default PublicRoute;

PublicRoute.propTypes = {
  children: PropTypes.node,
};
