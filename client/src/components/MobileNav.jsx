import { FiTag } from "react-icons/fi";
import { MdOutlineArchive } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import {  NavLink } from "react-router-dom";

function MobileNav() {
  return (
    <div className="fixed bottom-0 z-40 w-full border-t-[1px] border-gray-300 bg-white font-medium xl:hidden">
      <ul className="flex justify-between px-9 py-6">
        <li>
          <NavLink
            to="/notes"
            className={({ isActive }) =>
              `flex flex-col items-center ${isActive ? "text-primaryBlue" : ""}`
            }
          >
            <AiOutlineHome className="text-xl" />
            <span className="hidden md:block">Home</span>
          </NavLink>
        </li>

        <li className="flex flex-col items-center">
          <IoSearchOutline className="text-xl" />
          <span className="hidden md:block">Search</span>
        </li>

        <li>
          <NavLink
            to="/archive"
            className={({ isActive }) =>
              `flex flex-col items-center ${isActive ? "text-primaryBlue" : ""}`
            }
          >
            <MdOutlineArchive className="text-xl" />
            <span className="hidden md:block">Archived Notes</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/tags"
            className={({ isActive }) =>
              `flex flex-col items-center ${isActive ? "text-primaryBlue" : ""}`
            }
          >
            <FiTag className="text-xl" />
            <span className="hidden md:block">Tag</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/account/settings"
            className={({ isActive }) =>
              `flex flex-col items-center ${isActive ? "text-primaryBlue" : ""}`
            }
          >
            <IoSettingsOutline className="text-xl" />
            <span className="hidden md:block">Settings</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default MobileNav;
