import { motion } from 'framer-motion';
import { Outlet, useLocation } from 'react-router-dom';

import CreateButton from '../components/CreateButton';
import Header from '../components/Header';
import NoNotes from '../components/NoNotes';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import SkeletonLoader from '../components/SkeletonLoader';
import { useNotes } from '../contexts/NoteContext';
import { useGetNotes } from '../features/notes/useGetNotes';

function SearchTab() {
  const location = useLocation();
  const isViewingNote = location.pathname !== '/search';

  const { searchQuery } = useNotes();
  const { notes, isPending } = useGetNotes();

  // Filter notes based on search query
  const filteredNotes =
  searchQuery?.trim()
    ? notes?.notes?.filter(
        (note) =>
          note?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note?.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note?.tags?.some((tag) => tag?.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];


  return (
    <>
      {/* Header */}
      <Header
        head={
          <>
            <span className="hidden xl:block">Showing results for: {searchQuery}</span>
            <span className="block xl:hidden">Search</span>
          </>
        }
        customClass={isViewingNote ? 'hidden xl:flex' : 'block'}
      />

      {/* Mobile Search Bar */}
      <div className="block px-3 md:px-7 xl:hidden">
        <SearchBar />
      </div>

      {/* Main Layout */}
      <div className="dark:border-darkBorder grid h-screen grid-cols-1 border-gray-300 xl:mt-5 xl:grid-cols-[300px_1fr] xl:border-t-[1px]">
        {/* Left Panel: Note List */}
        <div
          className={`${
            isViewingNote ? 'hidden xl:block' : 'block'
          } dark:border-darkBorder border-r border-gray-300`}
        >
          <CreateButton />

          {/* Info Message for Mobile */}
          <p className="mt-3 px-3 text-sm md:px-7 xl:hidden">
            All notes matching the search term {searchQuery ? `"${searchQuery}"` : ''} are shown here.
          </p>

          {/* No Notes Found */}
          {filteredNotes?.length === 0 && (
            <NoNotes message="No notes match your search. Try a different keyword or create a new note." />
          )}

          {/* Notes List or Loader */}
          {isPending ? (
            <SkeletonLoader type="card" />
          ) : (
            <NoteList notes={filteredNotes} path={`search/${searchQuery}`} />
          )}
        </div>

        {/* Right Panel: Note Viewer */}
        <motion.div
          key={location.key}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="w-full"
        >
          <Outlet />
        </motion.div>
      </div>
    </>
  );
}

export default SearchTab;
