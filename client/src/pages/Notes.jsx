import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import NoteList from "../components/NoteList";
import Header from "../components/Header";
import NoNotes from "../components/NoNotes";

function Notes() {
  const location = useLocation();
  const isViewingNote = location.pathname !== "/notes";

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
          {" "}
          <NoteList />
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
