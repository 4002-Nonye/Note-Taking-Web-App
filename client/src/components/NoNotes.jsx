import PropTypes from "prop-types";

function NoNotes({ isArchive, notes ,message}) {
  const getMessage = () => {
    if (isArchive)
      return "All your archived notes are stored here. You can restore or delete them anytime.";
  };

  return (
    <div className="m-auto mt-1 w-3/4  text-sm font-light ">
      <p className="p-3">{getMessage()}</p>

      <p  className="rounded-md border-[1px] border-gray-300 bg-gray-200  p-3 mt-3">
        {!notes.length &&
          "No notes have been archived yet. Move notes here for safekeeping, or create a new note."}
      </p>
    </div>
  );
}

NoNotes.propTypes = {
  isArchive: PropTypes.bool,
};

export default NoNotes;
