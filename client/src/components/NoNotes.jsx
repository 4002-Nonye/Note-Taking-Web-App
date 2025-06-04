import PropTypes from "prop-types";

function NoNotes({ message }) {
  return (
    
      <p className="mt-3 rounded-md border-[1px] border-gray-300 dark:bg-bgCard bg-gray-200 p-3 text-sm font-light w-[80%]  mx-3 md:mx-7 dark:border-darkBorder ">
        {message}
      </p>
  
  );
}

NoNotes.propTypes = {
  message: PropTypes.string,
};

export default NoNotes;
