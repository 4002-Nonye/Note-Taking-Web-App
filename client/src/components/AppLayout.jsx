import { useEffect } from 'react';

import { Outlet } from 'react-router-dom';

import { useFont } from '../contexts/FontContext';
import { useTheme } from '../contexts/ThemeContext';
import { useGetSettings } from '../features/accountSettings/useGetSettings';

import MobileNav from './MobileNav';
import Sidebar from './Sidebar';

/**
 * Main application layout component that provides the overall structure
 * including sidebar, main content area, and mobile navigation.
 * Handles theme initialization from server settings or localStorage.
 */
function AppLayout() {
  // Fetch account settings and loading state
  const { getAccountSettings, isPending: isLoading } = useGetSettings();
  
  // Theme and font context handlers
  const { handleServerTheme: handleServerThemeColor } = useTheme();
  const { handleServerTheme: handleServerThemeFont } = useFont();

  /**
   * Effect hook to initialize theme settings when component mounts
   * or when settings are loaded from the server.
   */
  useEffect(() => {
    // Skip if settings are still loading or not available
    if (isLoading || !getAccountSettings) return;

    // Get theme preferences from server or use defaults
    const serverThemeColor = getAccountSettings?.data.colorTheme || 'light';
    const serverThemeFont = getAccountSettings?.data.fontTheme || 'sans-serif';

    // Persist settings to localStorage for future sessions
    localStorage.setItem('fontTheme', serverThemeFont);
    localStorage.setItem('colorTheme', serverThemeColor);

    // Apply the themes throughout the app
    handleServerThemeColor(serverThemeColor);
    handleServerThemeFont(serverThemeFont);
  }, [getAccountSettings, isLoading, handleServerThemeColor, handleServerThemeFont]);

  return (
    <div className="dark:bg-darkbg flex min-h-screen w-full flex-col xl:flex-row">
      {/* Desktop sidebar - shown on larger screens */}
      <Sidebar />

      {/* Main content area where route-specific content will render */}
      <div className="flex w-full flex-1 flex-col">
        <Outlet />
      </div>

      {/* Mobile navigation - shown on smaller screens */}
      <MobileNav />
    </div>
  );
}

export default AppLayout;