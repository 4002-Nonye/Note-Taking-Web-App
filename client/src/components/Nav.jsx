import PropTypes from 'prop-types';
import { FaArrowRight } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';

function Nav({ to, icon: Icon, children, className }) {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        // Container for nav item; adds styles if active
        <div
          className={`navlink ${isActive ? 'dark:bg-bgCard bg-gray-300' : ''} ${className}`}
          aria-current={isActive ? 'page' : undefined} 
        >
          <div className="inline-flex items-center gap-2">
            {/* Render icon if provided, color changes if active */}
            {Icon && <Icon className={`text-xl ${isActive ? 'text-primaryBlue' : ''}`} />}
            {/* Link label */}
            <span>{children}</span>
          </div>

          {/* Show arrow icon if active */}
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
