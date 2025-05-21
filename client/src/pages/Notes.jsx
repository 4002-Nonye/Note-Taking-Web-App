import { Outlet, useLocation } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";

import NoteList from "../components/NoteList";
import Header from "../components/Header";

function Notes() {
  const location = useLocation();
  return (
    <>
      <Header head="All Notes" />
      <div className="grid-display mt-5 grid h-screen border-t-[1px] border-gray-300">
        <NoteList />
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}

export default Notes;
