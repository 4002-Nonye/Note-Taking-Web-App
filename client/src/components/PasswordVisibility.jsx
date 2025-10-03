import PropTypes from 'prop-types';
import { FaEye,FaEyeSlash } from 'react-icons/fa';

function PasswordVisibility({ passwordVisible, setPasswordVisible, customClass }) {
  // Toggle the password visibility state
  const handlePasswordVisible = () => {
    setPasswordVisible((visible) => !visible);
  };

  const Icon = passwordVisible ? FaEyeSlash : FaEye;

  return (
    <Icon
      className={`${customClass} cursor-pointer`}
      onClick={handlePasswordVisible}
      aria-label={passwordVisible ? 'Hide password' : 'Show password'}
    />
  );
}

export default PasswordVisibility;

// Prop types validation
PasswordVisibility.propTypes = {
  passwordVisible: PropTypes.bool.isRequired,
  setPasswordVisible: PropTypes.func.isRequired,
  customClass: PropTypes.string,
};
