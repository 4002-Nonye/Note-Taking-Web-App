import { useEffect } from 'react';

import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import Themes from '../components/Themes';

function Settings() {
  const { pathname } = useLocation();
  const isRootSettings = pathname === '/account/settings';
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (isRootSettings && window.innerWidth >= 1024) {
        navigate('color-theme', { replace: true });
      }
    };
    // Run on mount and on resize
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isRootSettings, navigate, pathname]);

  return (
    <>
      <Header head="Settings" customClass={isRootSettings ? 'block' : 'hidden lg:flex'} />

      <div className="dark:border-darkBorder grid h-screen grid-cols-1 border-gray-300 lg:mt-5 lg:grid-cols-[300px_1fr] lg:border-t">
        <div
          className={`${
            isRootSettings ? 'block' : 'hidden'
          } dark:border-darkBorder h-full border-r border-gray-300 lg:block`}
        >
          <Themes />
        </div>

        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Settings;
