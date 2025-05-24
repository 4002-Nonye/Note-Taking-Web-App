import { IoSunny, IoMoon } from "react-icons/io5";

function ColorTab() {
  return (
    <div >
      <h3>Color Theme</h3>
      <p>Choose your color theme</p>

      <div className="flex items-center border-[1px] border-gray-300 gap-3 p-3">
        <IoSunny />

        <div>
          <p>Light Mode</p>
          <p>Pick a clean and classic light theme</p>
        </div>
      </div>

      <div>
        <IoMoon />

        <div>
          <p>Dark Mode</p>
          <p>Select a sleek and modern dark theme</p>
        </div>
      </div>
    </div>
  );
}

export default ColorTab;
