import PropTypes from "prop-types";

function NoNotes({ isArchive, currentTag }) {
  const getMessage = () => {
    if (currentTag) {
      return `No notes found with tag "${currentTag}".`;
    }
    if (isArchive) {
      return "All your archived notes are stored here. You can restore or delete them anytime.";
    }
    return "You don't have any notes yet. Start a new note to capture your thoughts and ideas.";
  };

  return (
    <div className="m-auto mt-4 w-3/4 rounded-md border-[1px] border-gray-300 bg-gray-200 p-3 text-sm font-medium">
      <p>{getMessage()}</p>
    </div>
  );
}

NoNotes.propTypes = {
  isArchive: PropTypes.bool,
  currentTag: PropTypes.string,
};

NoNotes.defaultProps = {
  isArchive: false,
  currentTag: null,
};

export default NoNotes;