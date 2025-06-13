import toast from 'react-hot-toast';
import { IoMoon, IoSunny } from 'react-icons/io5';

import { useTheme } from '../contexts/ThemeContext';
import { useEditSettings } from '../features/accountSettings/useEditSettings';

import ThemeTab from './ThemeTab';

function ColorTab() {
  // Get current theme color and function to change it
  const { themeColor, handleChangeTheme } = useTheme();

  // Hook for editing account settings
  const { isPending, editAccountSettings } = useEditSettings();

  // Save the selected theme color if it changed
  const saveColorTheme = async () => {
    const prevTheme = localStorage.getItem('colorTheme');

    // If no change, show a warning toast and stop
    if (prevTheme && prevTheme === themeColor) {
      toast('No changes were made', { icon: '⚠️' });
      return;
    }

    // Save new theme color in account settings and localStorage
    editAccountSettings({ colorTheme: themeColor });
    localStorage.setItem('colorTheme', themeColor);
  };

  // Options for theme selection
  const options = [
    {
      id: 'light',
      title: 'Light Mode',
      description: 'Pick a clean and classic light theme',
      icon: <IoSunny className="text-xl" />,
    },
    {
      id: 'dark',
      title: 'Dark Mode',
      description: 'Select a sleek and modern dark theme',
      icon: <IoMoon className="text-xl" />,
    },
  ];

 
  return (
    <ThemeTab
      options={options}
      head="Color Theme"
      subHead="Choose your color theme"
      themeName={themeColor}
      onChange={handleChangeTheme}
      handleSave={saveColorTheme}
      isPending={isPending}
    />
  );
}

export default ColorTab;
