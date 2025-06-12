import PropTypes from 'prop-types';
import { FaEyeSlash } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa';

function PasswordVisibility({ passwordVisible, setPasswordVisible, customClass }) {
  const handlePasswordVisible = () => {
    setPasswordVisible((visible) => !visible);
  };

  return (
    <>
      {passwordVisible ? (
        <FaEyeSlash className={`${customClass} cursor-pointer`} onClick={handlePasswordVisible} />
      ) : (
        <FaEye className={`${customClass} cursor-pointer`} onClick={handlePasswordVisible} />
      )}
    </>
  );
}

export default PasswordVisibility;

PasswordVisibility.propTypes = {
  passwordVisible: PropTypes.bool,
  setPasswordVisible: PropTypes.func,
  customClass: PropTypes.string,
};
