import PropTypes from "prop-types";

function Errors({ err }) {
  return <span className="text-[12px] font-medium text-red-600 italic">{err}</span>;
}

export default Errors;

Errors.propTypes = {
  err: PropTypes.string,
};
