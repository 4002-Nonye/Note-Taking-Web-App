import { Outlet, useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import Header from "../components/Header";
import NoteList from "../components/NoteList";

import CreateButton from "../components/CreateButton";
import NoNotes from "../components/NoNotes";
import { useGetNotes } from "../features/notes/useGetNotes";


function Archive() {
  const location = useLocation();
  const isViewingNote = location.pathname !== "/archive";

  const { notes } = useGetNotes();

  const filteredNotes = notes.notes.filter((note) => note.isArchive === true);


  return (
    <>
      <Header
        head="Archived Notes"
        customClass={isViewingNote ? "hidden xl:flex" : "block"}
      />

      <div className="dark:border-darkBorder grid h-screen grid-cols-1 border-gray-300 xl:mt-5 xl:grid-cols-[300px_1fr] xl:border-t-[1px]">
        <div
          className={`${isViewingNote ? "hidden xl:block" : "block"} dark:border-darkBorder border-r border-gray-300`}
        >
          <CreateButton />
          <p className="mt-3 px-3 text-sm md:px-7">
            All your archived notes are stored here. You can restore or delete
            them anytime.
          </p>
          {filteredNotes?.length === 0 ? (
            <NoNotes message="No notes have been archived yet. Move notes here for safekeeping, or create a new note." />
          ) : (
            <NoteList notes={filteredNotes} path="archive" />
          )}
        </div>

        <motion.div
          key={location.key}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="w-full"
        >
          <Outlet />
        </motion.div>
      </div>
    </>
  );
}

export default Archive;
