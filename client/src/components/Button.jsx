import PropTypes from "prop-types";

function Button({ children, type, customClass, purpose, href }) {
  const baseStyles =
    "flex  rounded-md p-2 text-center cursor-pointer";
  const styles = {
    authBtn: "bg-primaryBlue w-[85%] text-white justify-center py-3",
    googleBtn: "mt-3 w-[85%] border-2 border-gray-300 text-2xl justify-center",
    ctaBtn:'border-[1px] border-gray-300 w-full xl:w-3/4 flex items-center gap-3',
    createBtn:'bg-primaryBlue text-white justify-center py-3 '
  };
  if (purpose === "link")
    return (
      <a className={`${baseStyles} ${customClass} ${styles[type]}`} href={href}>
        {" "}
        {children}
      </a>
    );
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
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.string,
  ]),
  type: PropTypes.string,
  customClass: PropTypes.string, 
  purpose: PropTypes.string,
  href: PropTypes.string,
};
