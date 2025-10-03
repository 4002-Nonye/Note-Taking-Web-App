import PropTypes from 'prop-types';
import { IoSettingsOutline } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';

import SearchBar from './SearchBar';

function Header({ head, customClass }) {
  return (
    <div
      className={`mt-4 flex items-center justify-between px-3 py-4 md:px-7 xl:mt-0 ${customClass} `}
    >
      <h1 className="text-2xl font-bold">{head}</h1>

      {/* search bar  && settings*/}
      <div className="hidden items-center gap-5 xl:flex">
        <SearchBar />

        <NavLink
          to="/account/settings"
          className={({ isActive }) =>
            `flex flex-col items-center ${isActive ? 'text-primaryBlue' : ''}`
          }
        >
        
          <IoSettingsOutline className="text-2xl" />
        </NavLink>
      </div>
    </div>
  );
}

export default Header;

Header.propTypes = {
  head: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  customClass: PropTypes.string,
};
