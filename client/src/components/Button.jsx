import PropTypes from 'prop-types';

// Button component
// Renders a <button> or an <a> tag based on the "purpose" prop
function Button({ children, type, customClass, purpose, href, onclick, btnType }) {
  // Common styles for all buttons and links
  const baseStyles = 'flex outline-0 p-2 text-center cursor-pointer';

  // Different styles depending on the button "type"
  const styles = {
    authBtn: 'rounded-md bg-primaryBlue w-[85%] text-white justify-center py-3',
    googleBtn:
      'rounded-md mt-3 w-[85%] border-2 border-gray-300 text-2xl justify-center dark:border-darkBorder',
    ctaBtn: 'rounded-md lg:border-[1px] border-gray-300 xl:w-3/4 flex items-center gap-3',
    createBtn:
      'xl:rounded-md bg-primaryBlue text-white justify-center xl:py-3 h-14 w-14 xl:h-unset xl:w-unset items-center',
  };

  // If purpose is 'link', return an <a> element
  if (purpose === 'link') {
    return (
      <a
        href={href}
        onClick={onclick}
        className={`${baseStyles} ${customClass} ${styles[type]}`}
      >
        {children}
      </a>
    );
  }

  // Otherwise, return a <button> element
  return (
    <button
      type={btnType}
      onClick={onclick}
      className={`${baseStyles} ${customClass} ${styles[type]}`}
    >
      {children}
    </button>
  );
}

export default Button;

// Prop validation
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
  btnType: PropTypes.string,
};
