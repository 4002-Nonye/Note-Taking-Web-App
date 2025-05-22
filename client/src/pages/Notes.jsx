import { Outlet, useLocation } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";

import NoteList from "../components/NoteList";
import Header from "../components/Header";

function Notes() {
  const location = useLocation();
  const isViewingNote = location.pathname !== "/notes"; // checking if a note is open
  return (
    <>
      <Header
        head="All Notes"
        customClass={isViewingNote ? "hidden xl:flex" : "block"}
      />
      <div className="grid h-screen grid-cols-1 border-gray-300 xl:mt-5 xl:grid-cols-[300px_1fr] xl:border-t-[1px]">
        {/* On mobile: hide note list if viewing a note */}
        <div
          className={`${isViewingNote ? "hidden xl:block" : "block"} border-r border-gray-300`}
        >
          <NoteList />
        </div>
        {/* On desktop: show both; on mobile: show only the form if a note is selected */}

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.key}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="w-full"
          >
            <Outlet location={location} />
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}

export default Notes;
