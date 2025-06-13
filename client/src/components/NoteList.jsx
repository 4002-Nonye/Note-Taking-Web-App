import PropTypes from 'prop-types';

import NoteCard from './NoteCard';

function NoteList({ notes, path = 'notes' }) {
  return (
    <div className="pb-24 xl:pt-5 xl:pb-0">
      {/* Scrollable container for the list of notes (on large screens) */}
      <div className="no-scrollbar flex flex-col text-[13px] xl:h-[calc(100vh-16rem)] xl:overflow-y-auto">
        <div className="dark:divide-darkBorder divide-y divide-gray-300">
          {/* Render the list of NoteCard components*/}
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} path={path} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default NoteList;

// Prop type validation
NoteList.propTypes = {
  notes: PropTypes.array,
  path: PropTypes.string,
};
