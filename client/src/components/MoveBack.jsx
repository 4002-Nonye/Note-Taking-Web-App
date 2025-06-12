import PropTypes from 'prop-types';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import Button from './Button';

function MoveBack({ text, navigateTo, className }) {
  const navigate = useNavigate();
  return (
    <Button btnType="button" onclick={() => navigate(navigateTo)} customClass={className}>
      <FaArrowLeft className="group-hover:text-primaryBlue text-sm transition-all duration-500" />
      <span>{text}</span>
    </Button>
  );
}

export default MoveBack;

MoveBack.propTypes = {
  text: PropTypes.string,
  navigateTo: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};
