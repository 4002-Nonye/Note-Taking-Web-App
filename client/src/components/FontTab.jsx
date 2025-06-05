import { FaFont } from "react-icons/fa";
import { useFont } from "../contexts/FontContext";
import ThemeTab from "./ThemeTab";

function FontTab() {
  const { font, handleFontChange } = useFont();

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
      handleSave=""
    />
  );
}

export default FontTab;
