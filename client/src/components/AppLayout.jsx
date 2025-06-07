import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import { useGetSettings } from "../features/accountSettings/useGetSettings";
import { useEffect } from "react";
import { useFont } from "../contexts/FontContext";
import { useTheme } from "../contexts/ThemeContext";

function AppLayout() {
  const { getAccountSettings, isPending: isLoading } = useGetSettings();
  const { handleServerTheme: handleServerThemeColor } = useTheme();
  const { handleServerTheme: handleServerThemeFont } = useFont();

  useEffect(() => {
    if (isLoading || !getAccountSettings) return;

    // use theme from server or default
    const serverThemeColor = getAccountSettings?.data.colorTheme || "light";
    const serverThemeFont = getAccountSettings?.data.fontTheme || "sans-serif";
  

    // Save to localStorage for future sessions
    localStorage.setItem("fontTheme", serverThemeFont);
    localStorage.setItem("colorTheme", serverThemeColor);

    handleServerThemeColor(serverThemeColor);
    handleServerThemeFont(serverThemeFont);
  }, [
    getAccountSettings,
    isLoading,
    handleServerThemeColor,
    handleServerThemeFont,
  ]);

  return (
    <div className="dark:bg-darkbg flex min-h-screen w-full flex-col xl:flex-row">
      <Sidebar />

      <div className="flex w-full flex-1 flex-col">
        <Outlet />
      </div>

      <MobileNav />
    </div>
  );
}

export default AppLayout;
