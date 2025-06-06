import { FaFont } from "react-icons/fa";
import { useFont } from "../contexts/FontContext";
import ThemeTab from "./ThemeTab";

import { useEditSettings } from "../features/accountSettings/useEditSettings";

function FontTab() {
  const { font, handleFontChange } = useFont();
  const { isPending, editAccountSettings } = useEditSettings();
  const saveFontTheme = async () => {
    editAccountSettings({ fontTheme: font });
    localStorage.setItem("fontTheme", font);
  };

  const options = [
    {
      id: "sans-serif",
      title: "Sans-serif",
      description: "Clean and modern, easy to read",
      icon: <FaFont className="text-2xl" />,
    },
    {
      id: "serif",
      title: "Serif",
      description: "Classic and elegant for a timeless feel",
      icon: <FaFont className="text-2xl" />,
    },
    {
      id: "mono",
      title: "Monospace",
      description: "Code-like, great for technical vibe",
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
