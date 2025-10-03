import { useEffect } from 'react';

import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import Themes from '../components/Themes';

function Settings() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Check if current path is exactly "/account/settings"
  const isRootSettings = pathname === '/account/settings';

  useEffect(() => {
    // Function to handle window resize events
    const handleResize = () => {
      // On large screens (>= 1024px) and if on root settings,
      // automatically navigate to 'color-theme' sub-route,
      // replacing the current history entry
      if (isRootSettings && window.innerWidth >= 1024) {
        navigate('color-theme', { replace: true });
      }
    };

    handleResize();

    // Add resize event listener to window
    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, [isRootSettings, navigate, pathname]);

  return (
    <>
      <Header head="Settings" customClass={isRootSettings ? 'block' : 'hidden lg:flex'} />

      {/* Main layout container: grid with one or two columns depending on screen size */}
      <div className="dark:border-darkBorder grid h-screen grid-cols-1 border-gray-300 lg:mt-5 lg:grid-cols-[300px_1fr] lg:border-t">
        <div
          className={`${
            isRootSettings ? 'block' : 'hidden'
          } dark:border-darkBorder h-full border-r border-gray-300 lg:block`}
        >
          <Themes />
        </div>

        {/* Main content area where nested routes will be rendered */}
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Settings;
