import Button from './Button';
import NoNotes from './NoNotes';
import NoteCard from './NoteCard';

function NoteList({ notes, path = 'notes' }) {
  return (
    <div className="pb-24 xl:pt-5 xl:pb-0">
      <div className="no-scrollbar mt-4 flex flex-col text-[13px] xl:h-[calc(100vh-16rem)] xl:overflow-y-auto">
        {!notes.length ? (
          <NoNotes />
        ) : (
          <div className="dark:divide-darkBorder divide-y divide-gray-300">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} path={path} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default NoteList;
