import {
  Outlet,
  useLocation,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
import { motion } from "framer-motion";
import NoteList from "../components/NoteList";
import Header from "../components/Header";
import NoNotes from "../components/NoNotes";
import { useNotes } from "../contexts/NoteContext";
import Button from "../components/Button";
import CreateButton from "../components/CreateButton";
import { FaArrowLeft } from "react-icons/fa6";

function TaggedNotes() {
  const location = useLocation();
  const match = useMatch("/tags/:tag/:noteId");
  const isViewingNote = !!match;
  const { tag } = useParams();
  const { notes } = useNotes();
  const filteredNotes = notes.filter((note) => note.tags.includes(tag));
  const navigate = useNavigate();

  return (
    <>
      {!isViewingNote && (
        <Button
          onclick={() => navigate(-1)}
          customClass="group flex gap-2 items-center xl:hidden text-sm text-gray-500 px-4 mt-2"
        >
          <FaArrowLeft className="group-hover:text-primaryBlue text-sm transition-all duration-500" />
          <span>Go back</span>
        </Button>
      )}
      <Header
        head={`Notes Tagged: ${tag}`}
        customClass={isViewingNote ? "hidden xl:flex" : "block"}
      />
      <div className="grid h-screen grid-cols-1 border-gray-300  dark:border-darkBorder xl:mt-5 xl:grid-cols-[300px_1fr] xl:border-t-[1px]">
        <div
          className={`${isViewingNote ? "hidden xl:block" : "block"} border-r border-gray-300 dark:border-darkBorder`}
        >
          <CreateButton />

          <p className="mt-3 px-3 text-sm md:px-7">
            All notes tagged with '{tag}' are stored here.
          </p>
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
