import toast from 'react-hot-toast';
import { IoMoon,IoSunny } from 'react-icons/io5';

import { useTheme } from '../contexts/ThemeContext';
import { useEditSettings } from '../features/accountSettings/useEditSettings';

import ThemeTab from './ThemeTab';

function ColorTab() {
  const { themeColor, handleChangeTheme } = useTheme();
  const { isPending, editAccountSettings } = useEditSettings();

  const saveColorTheme = async () => {
    // prevent save when no change was made
    const prevTheme = localStorage.getItem('colorTheme');
    if (prevTheme && prevTheme === themeColor) {
      toast('No changes were made', { icon: '⚠️' });
      return;
    }

    editAccountSettings({ colorTheme: themeColor });
    localStorage.setItem('colorTheme', themeColor);
  };

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
