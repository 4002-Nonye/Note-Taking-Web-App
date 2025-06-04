import PropTypes from "prop-types";

function NoNotes({ message }) {
  return (
    
      <div className="mt-3 rounded-md border-[1px] border-gray-300 dark:bg-bgCard bg-gray-200 p-3 text-sm font-light md:w-[80%] xl:m-auto
        dark:border-darkBorder md:ml-7 xl:ml-0 w-[90%] ml-3">
        {message}
      </div>
  
  );
}

NoNotes.propTypes = {
  message: PropTypes.string,
};

export default NoNotes;
