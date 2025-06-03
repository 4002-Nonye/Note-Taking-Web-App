import Button from "./Button";
import NoNotes from "./NoNotes";
import NoteCard from "./NoteCard";

function NoteList({ notes, path = 'notes' }) {
  return (
    <div className="border-gray-300 pb-24 xl:border-r-[1px] xl:pt-5 xl:pb-0">
      <div className="no-scrollbar mt-4 flex flex-col text-[13px] xl:h-[calc(100vh-16rem)] xl:overflow-y-auto">
        {!notes.length ? (
          <NoNotes />
        ) : (
          <div className="divide-y divide-gray-300">
            {notes.map((note) => (
              <NoteCard key={note.id} note={note} path={path} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default NoteList;
