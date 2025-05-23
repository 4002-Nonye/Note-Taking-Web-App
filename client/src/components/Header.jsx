import PropTypes from "prop-types";

import { IoSearchOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

function Header({ head, customClass }) {
  return (
    <div
      className={`mt-4 flex items-center justify-between px-4 py-4 md:px-9 xl:mt-0 ${customClass}`}
    >
      <h1 className="text-2xl font-bold">{head}</h1>

      {/* search bar  && settings*/}
      <div className="hidden items-center gap-5 xl:flex">
        <div className="relative cursor-pointer rounded-md border-[1px] border-gray-300 px-4 py-3">
          <input
            id="search"
            type="text"
            placeholder="Search by title, content or tags..."
            className="w-80 border-0 pl-5 outline-0"
          />
          <IoSearchOutline className="absolute top-3.5 left-2 text-xl" />
        </div>

        <NavLink
          to="/account/settings"
          className={({ isActive }) =>
            `flex flex-col items-center ${isActive ? "text-primaryBlue" : ""}`
          }
        >
          {" "}
          <IoSettingsOutline className="text-2xl" />
        </NavLink>
      </div>
    </div>
  );
}

export default Header;

Header.propTypes = {
  head: PropTypes.string.isRequired,
  customClass: PropTypes.string,
};
