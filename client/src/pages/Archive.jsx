import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import NoteList from "../components/NoteList";
import Header from "../components/Header";
import NoNotes from "../components/NoNotes";
import ArchivedNotesList from "../components/ArchivedNotesList";

function Archive() {
  const location = useLocation();
  const isViewingNote = location.pathname !== "/archive";

  return (
    <>
      <Header
        head="Archived Notes"
        customClass={isViewingNote ? "hidden xl:flex" : "block"}
      />

      <div className="grid h-screen grid-cols-1 border-gray-300 xl:mt-5 xl:grid-cols-[300px_1fr] xl:border-t-[1px]">
        <div
          className={`${isViewingNote ? "hidden xl:block" : "block"} border-r border-gray-300`}
        >
          <ArchivedNotesList />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={location.key}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="w-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}

export default Archive;
