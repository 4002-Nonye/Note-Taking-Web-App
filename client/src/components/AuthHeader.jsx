import PropTypes from "prop-types";

function AuthHeader({ children ,header, subHead }) {
  return (
    <>
     {children}
      <h1 className="text-2xl font-extrabold">{header}</h1>
      <p className="my-2 text-center text-sm">{subHead}</p>
    </>
  );
}

export default AuthHeader;

AuthHeader.propTypes = {
  children: PropTypes.node,
  header: PropTypes.string,
  subHead: PropTypes.string,
};
