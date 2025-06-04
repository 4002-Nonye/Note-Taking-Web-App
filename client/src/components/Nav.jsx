import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import { FaArrowRight } from "react-icons/fa6";

function Nav({ to, icon: Icon, children, className }) {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <div
          className={`navlink ${isActive ? "dark:bg-bgCard bg-gray-300" : ""} ${className}`}
          aria-current={isActive ? "page" : undefined}
        >
          <div className="inline-flex items-center gap-2">
            {Icon && (
              <Icon
                className={`text-xl ${isActive ? "text-primaryBlue" : ""}`}
              />
            )}

            <span>{children}</span>
          </div>

          {isActive && <FaArrowRight />}
        </div>
      )}
    </NavLink>
  );
}

export default Nav;

Nav.propTypes = {
  to: PropTypes.string,
  icon: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
};
