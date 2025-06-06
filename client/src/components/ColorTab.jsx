import { IoSunny, IoMoon } from "react-icons/io5";
import { useTheme } from "../contexts/ThemeContext";
import ThemeTab from "./ThemeTab";

import { useEditSettings } from "../features/accountSettings/useEditSettings";


function ColorTab() {
  const { themeColor, handleChangeTheme } = useTheme();
  const { isPending, editAccountSettings } = useEditSettings();
  

  const saveColorTheme = async () => {
    editAccountSettings({colorTheme:themeColor});
    localStorage.setItem("colorTheme", themeColor);

  };

  const options = [
    {
      id: "light",
      title: "Light Mode",
      description: "Pick a clean and classic light theme",
      icon: <IoSunny className="text-xl" />,
    },
    {
      id: "dark",
      title: "Dark Mode",
      description: "Select a sleek and modern dark theme",
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
