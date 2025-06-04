import { FiTag } from "react-icons/fi";
import { MdOutlineArchive } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { IoSearchOutline, IoSettingsOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/notes", icon: AiOutlineHome, label: "Home" },
  { to: "/search", icon: IoSearchOutline, label: "Search" },
  { to: "/archive", icon: MdOutlineArchive, label: "Archived Notes" },
  { to: "/tags", icon: FiTag, label: "Tags" },
  { to: "/account/settings", icon: IoSettingsOutline, label: "Settings" },
];

function MobileNav() {
  return (
    <div className="dark:border-darkBorder dark:bg-darkbg fixed bottom-0 z-40 w-full border-t border-gray-300 bg-white font-medium xl:hidden dark:text-[#717784]">
      <ul className="flex justify-between px-9 py-6">
        {navItems.map(({ to, icon: Icon, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center ${isActive ? "text-primaryBlue" : ""}`
              }
            >
              <Icon className="text-xl" />
              <span className="hidden md:block">{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MobileNav;
