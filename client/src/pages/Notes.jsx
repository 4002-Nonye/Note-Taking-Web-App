import { motion } from 'framer-motion';
import { Outlet, useLocation } from 'react-router-dom';

import CreateButton from '../components/CreateButton';
import Header from '../components/Header';
import NoNotes from '../components/NoNotes';
import NoteList from '../components/NoteList';
import SkeletonLoader from '../components/SkeletonLoader';
import { useGetNotes } from '../features/notes/useGetNotes';

function Notes() {
  const location = useLocation();

  // Check if the user is viewing a specific note (not just the main /notes page)
  const isViewingNote = location.pathname !== '/notes';

  // Fetch all notes from the server (custom hook handles loading and error states)
  const { notes, isPending: isFetchingNotes } = useGetNotes();

  // Filter out only notes that are NOT archived
  const filteredNotes = notes?.notes?.filter((note) => note.archive === false);

  return (
    <>
      {/* Page header - hidden on smaller screens if a note is being viewed */}
      <Header head="All Notes" customClass={isViewingNote ? 'hidden xl:flex' : 'block'} />

    
      <div className="dark:border-darkBorder grid h-screen grid-cols-1 border-gray-300 xl:mt-5 xl:grid-cols-[300px_1fr] xl:border-t-[1px]">
        
        {/* Sidebar - hidden on small screens if a note is open */}
        <div
          className={`${isViewingNote ? 'hidden xl:block' : 'block'} dark:border-darkBorder border-r border-gray-300`}
        >
          {/* Button to create a new note */}
          <CreateButton />

          {/* Show message if there are no unarchived notes */}
          {filteredNotes?.length === 0 && (
            <NoNotes message="You don’t have any notes yet. Start a new note to capture your thoughts and ideas." />
          )}

          {/* Show skeleton loader while notes are loading */}
          {isFetchingNotes ? (
            <SkeletonLoader type="card" />
          ) : (
            <NoteList notes={filteredNotes} path="notes" />
          )}
        </div>

        {/* Main panel for nested routes (view/edit a note) */}
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

export default Notes;
