import PropTypes from "prop-types";

function Button({ children, type, customClass, purpose, href }) {
  const baseStyles =
    "flex justify-center rounded-md p-2 text-center cursor-pointer";
  const styles = {
    authBtn: "bg-primaryBlue w-[85%] text-white",
    googleBtn: "mt-3 w-[85%] border-2 border-gray-300 text-2xl",
  };
  if (purpose === "link") return <a className={`${baseStyles} ${customClass} ${styles[type]}`}  href={href}> {children}</a>;
  else {
    return (
      <button className={`${baseStyles} ${customClass} ${styles[type]}`}>
        {children}
      </button>
    );
  }
}

export default Button;

Button.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
  customClass: PropTypes.string,
  purpose: PropTypes.string,
  href: PropTypes.string,
};
