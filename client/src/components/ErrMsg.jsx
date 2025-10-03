import PropTypes from 'prop-types';

function ErrMsg({ err, customClass }) {
  return (
    <span className={`text-[12px] font-medium text-red-600 italic ${customClass}`}>{err}</span>
  );
}

export default ErrMsg;

ErrMsg.propTypes = {
  err: PropTypes.string,
  customClass: PropTypes.string,
};
