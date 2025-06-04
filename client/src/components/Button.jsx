import PropTypes from "prop-types";

function Button({ children, type, customClass, purpose, href, onclick }) {
  const baseStyles = "flex outline-0   p-2 text-center cursor-pointer";
  const styles = {
    authBtn: "rounded-md bg-primaryBlue w-[85%] text-white justify-center py-3",
    googleBtn:
      "rounded-md mt-3 w-[85%] border-2 border-gray-300 text-2xl justify-center dark:border-darkBorder",
    ctaBtn:
      "rounded-md lg:border-[1px] border-gray-300  xl:w-3/4 flex items-center gap-3",
    createBtn:
      "xl:rounded-md bg-primaryBlue text-white justify-center xl:py-3 h-14 w-14 xl:h-unset xl:w-unset items-center ",
  };
  if (purpose === "link")
    return (
      <a
        className={`${baseStyles} ${customClass} ${styles[type]}`}
        href={href}
        onClick={onclick}
      >
        {" "}
        {children}
      </a>
    );
  else {
    return (
      <button
        onClick={onclick}
        className={`${baseStyles} ${customClass} ${styles[type]}`}
      >
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
  onclick: PropTypes.func,
};
