import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import Header from "../components/Header";
import NoteList from "../components/NoteList";
import { useNotes } from "../contexts/NoteContext";
import CreateButton from "../components/CreateButton";
import NoNotes from "../components/NoNotes";
import SearchBar from "../components/SearchBar";

function SearchTab() {
  const location = useLocation();
  const isViewingNote = location.pathname !== "/search";

  const { filteredNotes, searchQuery } = useNotes();

  return (
    <>
      <Header
        head={
          <>
            <span className="hidden xl:block">
              Showing results for: {searchQuery}{" "}
            </span>

            <span className="block xl:hidden">Search </span>
          </>
        }
        customClass={isViewingNote ? "hidden xl:flex" : "block"}
      />
      <div className="block px-3 md:px-7 xl:hidden">
        <SearchBar />
      </div>

      <div className="dark:border-darkBorder grid h-screen grid-cols-1 border-gray-300 xl:mt-5 xl:grid-cols-[300px_1fr] xl:border-t-[1px]">
        <div
          className={`${isViewingNote ? "hidden xl:block" : "block"} dark:border-darkBorder border-r border-gray-300`}
        >
          <CreateButton />
          <p className="mt-3 md:px-7  px-3 text-sm xl:hidden">
            All notes matching the search term{" "}
            {searchQuery ? `"${searchQuery}"` : ""} are shown here.
          </p>
          {filteredNotes?.length === 0 ? (
            <NoNotes message="No notes match your search. Try a different keyword or create a new note." />
          ) : (
            <NoteList notes={filteredNotes} />
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

export default SearchTab;
