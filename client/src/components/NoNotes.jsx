import PropTypes from 'prop-types';

function NoNotes({ message }) {
  return (
    <div className="dark:bg-bgCard dark:border-darkBorder mt-3 ml-3 w-[90%] rounded-md border-[1px] border-gray-300 bg-gray-200 p-3 text-sm font-light md:ml-7 md:w-[80%] xl:mx-7">
      {message}
    </div>
  );
}

NoNotes.propTypes = {
  message: PropTypes.string,
};

export default NoNotes;
