import toast from 'react-hot-toast';
import { FaFont } from 'react-icons/fa';

import { useFont } from '../contexts/FontContext';
import { useEditSettings } from '../features/accountSettings/useEditSettings';

import ThemeTab from './ThemeTab';

function FontTab() {
  // Get current theme font and function to change it
  const { font, handleFontChange } = useFont();

  // Hook for editing account settings
  const { isPending, editAccountSettings } = useEditSettings();

  // Save the selected theme font if it changed
  const saveFontTheme = async () => {
    const prevTheme = localStorage.getItem('fontTheme');

    // If no change, show a warning toast and stop
    if (prevTheme && prevTheme === font) {
      toast('No changes were made', { icon: '⚠️' });
      return;
    }

    // Save new theme font in account settings and localStorage
    editAccountSettings({ fontTheme: font });
    localStorage.setItem('fontTheme', font);
  };

  // Options for theme selection
  const options = [
    {
      id: 'sans-serif',
      title: 'Sans-serif',
      description: 'Clean and modern, easy to read',
      icon: <FaFont className="text-2xl" />,
    },
    {
      id: 'serif',
      title: 'Serif',
      description: 'Classic and elegant for a timeless feel',
      icon: <FaFont className="text-2xl" />,
    },
    {
      id: 'mono',
      title: 'Monospace',
      description: 'Code-like, great for technical vibe',
      icon: <FaFont className="text-2xl" />,
    },
  ];

  return (
    <ThemeTab
      options={options}
      head="Font Theme"
      subHead="Choose your font theme"
      themeName={font}
      onChange={handleFontChange}
      handleSave={saveFontTheme}
      isPending={isPending}
    />
  );
}

export default FontTab;
