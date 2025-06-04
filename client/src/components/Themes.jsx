import { MdWbSunny, MdLogout } from "react-icons/md";
import { AiOutlineFontSize } from "react-icons/ai";
import { IoIosLock } from "react-icons/io";
import Nav from "./Nav";
import Button from "./Button";

const navItems = [
  { to: "color-theme", icon: MdWbSunny, label: "Color Theme" },
  { to: "font-theme", icon: AiOutlineFontSize, label: "Font Theme" },
  { to: "change-password", icon: IoIosLock, label: "Change Password" },
];

function Themes() {
  return (
    <>
      <div className="m-auto flex w-full flex-col justify-center gap-2 rounded-md p-3 px-4 ">
        {navItems.map((item) => (
          <Nav key={item.to} to={item.to} icon={item.icon} className="w-full">
            <span>{item.label}</span>
          </Nav>
        ))}
      </div>

      <div className="dark:border-darkBorder my-3 w-full border-t border-gray-300" />

      <Button customClass="px-7 items-center gap-2 w-full">
        <MdLogout />
        <span>Logout</span>
      </Button>
    </>
  );
}

export default Themes;
