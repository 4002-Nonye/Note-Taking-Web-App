import PropTypes from 'prop-types';

/**
 * Authentication Header Component
 *
 * A reusable header component for authentication pages (login, signup, etc.)
 * that displays a title, subtitle, and optional children components.
 *
 */
function AuthHeader({ children, header, subHead }) {
  return (
    <>
      {children}
      <h1 className="text-2xl font-extrabold">{header}</h1>
      <p className="my-2 text-center text-sm">{subHead}</p>
    </>
  );
}

// Prop type validation
AuthHeader.propTypes = {
  children: PropTypes.node,
  header: PropTypes.string.isRequired,
  subHead: PropTypes.string.isRequired,
};

export default AuthHeader;
