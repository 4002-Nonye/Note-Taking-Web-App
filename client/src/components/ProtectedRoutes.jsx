import { useEffect } from 'react';

import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

import { useUser } from '../features/authentication/useUser';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoading, user } = useUser();

  useEffect(() => {
    if (!user && !isLoading) navigate('/');
  }, [isLoading, navigate, user]);

  if (isLoading) {
    const isDark = document.documentElement.classList.contains('dark');

    return (
      <div className="flex h-screen items-center justify-center">
        <ClipLoader
          size={50}
          color={isDark ? '#ffffff' : '#000000'}
          cssOverride={{
            borderWidth: '5px',
          }}
        />
      </div>
    );
  }

  if (user) return children;

  return null;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};

export default ProtectedRoute;
