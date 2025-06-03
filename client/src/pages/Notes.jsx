import { Outlet, useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import NoteList from "../components/NoteList";
import Header from "../components/Header";
import NoNotes from "../components/NoNotes";
import { useNotes } from "../contexts/NoteContext";
import CreateButton from "../components/CreateButton";

function Notes() {
  const location = useLocation();
  const isViewingNote =
    location.pathname !== "/notes" && !location.pathname.startsWith("/tags");

  const { notes } = useNotes();

  return (
    <>
      <Header
        head="All Notes"
        customClass={isViewingNote ? "hidden xl:flex" : "block"}
      />
      <div className="grid h-screen grid-cols-1 border-gray-300 xl:mt-5 xl:grid-cols-[300px_1fr] xl:border-t-[1px]">
        <div
          className={`${isViewingNote ? "hidden xl:block" : "block"} border-r border-gray-300`}
        >
          <CreateButton />

          {notes?.length === 0 ? (
            <NoNotes message="You don’t have any notes yet. Start a new note to capture your thoughts and ideas." />
          ) : (
            <NoteList notes={notes} path="notes" />
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

export default Notes;
