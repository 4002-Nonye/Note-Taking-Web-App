import Button from "./Button";
import NoNotes from "./NoNotes";
import NoteCard from "./NoteCard";
import { useNotes } from "../contexts/NoteContext";

function ArchivedNotesList() {
  const { notes } = useNotes();

  const filteredNotes = notes.filter((note) => note.isArchive === true);


  return (
    <div className="border-gray-300 pb-24 xl:border-r-[1px] xl:pt-5 xl:pb-0">
      <div className="px-9 text-2xl font-extrabold xl:text-base xl:font-medium">
        {" "}
        <Button
          type="createBtn"
          customClass="m-auto xl:w-4/4 rounded-full fixed right-3 bottom-30  xl:relative xl:bottom-auto xl:right-auto xl:m-0 xl:ml-auto "
        >
          +<span className="hidden xl:block xl:pl-2">Create New Note</span>
        </Button>
      </div>

      <div className="no-scrollbar mt-7 flex flex-col gap-5 text-[13px] xl:h-[calc(100vh-16rem)] xl:overflow-y-auto">
        {filteredNotes?.length === 0 ? (
          <NoNotes isArchive={true} notes={filteredNotes} />
        ) : (
          <NoteCard isArchive={true} notes={filteredNotes} path="archive" />
        )}
      </div>
    </div>
  );
}

export default ArchivedNotesList;
