import PropTypes from "prop-types";

function NoNotes({ isArchive }) {
 
  return (
    <div className="m-auto mt-4 w-3/4 rounded-md border-[1px] border-gray-300 bg-gray-200 p-3 text-sm font-medium">
      {isArchive ? (
        <p>
          All your archived notes are stored here. You can restore or delete
          them anytime.
        </p>
      ) : (
        <p>
          You don’t have any notes yet. Start a new note to capture your
          thoughts and ideas.
        </p>
      )}
    </div>
  );
}

export default NoNotes;

NoNotes.propTypes = {
  isArchive: PropTypes.bool,
};
