import { Outlet, useLocation, useMatch, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import NoteList from "../components/NoteList";
import Header from "../components/Header";
import NoNotes from "../components/NoNotes";
import { useNotes } from "../contexts/NoteContext";

function TaggedNotes() {
  const location = useLocation();
  const match = useMatch("/tags/:tag/:noteId");
  const isViewingNote = !!match;
  const { tag } = useParams();
  const { notes } = useNotes();
  const filteredNotes = notes.filter((note) => note.tags.includes(tag));

  return (
    <>
      <Header
        head={`Notes Tagged: ${tag}`}
        customClass={isViewingNote ? "hidden xl:flex" : "block"}
      />
      <div className="grid h-screen grid-cols-1 border-gray-300 xl:mt-5 xl:grid-cols-[300px_1fr] xl:border-t-[1px]">
        <div
          className={`${isViewingNote ? "hidden xl:block" : "block"} border-r border-gray-300`}
        >
          {filteredNotes.length === 0 ? (
            <NoNotes />
          ) : (
            <NoteList notes={filteredNotes} path={`tags/${tag}`} />
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

export default TaggedNotes;
