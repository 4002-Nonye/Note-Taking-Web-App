import { useEffect } from 'react';

import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

import { useUser } from '../features/authentication/useUser';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoading, user } = useUser();

  // Redirect unauthenticated users to the homepage
  useEffect(() => {
    // Only redirect if loading has finished and no user is found
    if (!isLoading && !user) {
      navigate('/', { replace: true }); 
    }
  }, [isLoading, user, navigate]);

  // Show loading spinner while checking authentication status (if there is a user)
  if (isLoading) {
    const isDark = document.documentElement.classList.contains('dark');
    return (
      <div className="flex h-screen items-center justify-center">
        <ClipLoader
          size={50}
          color={isDark ? '#ffffff' : '#000000'}
          cssOverride={{ borderWidth: '5px' }}
        />
      </div>
    );
  }

  // Render protected children if user is authenticated
  return user ? children : null;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
