import { useEffect } from 'react';

import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { useUser } from '../features/authentication/useUser';

function PublicRoute({ children }) {
  const { user, isLoading } = useUser(); 
  const navigate = useNavigate(); 

  useEffect(() => {
    // If user exist and loading is done, redirect to '/notes'
    if (user && !isLoading) {
      navigate('/notes');
    }
  }, [user, isLoading, navigate]);

  // Always render children regardless of loading or user status
  return children;
}

export default PublicRoute;

// PropTypes validation for expected prop types
PublicRoute.propTypes = {
  children: PropTypes.node,
};
