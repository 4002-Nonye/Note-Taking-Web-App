import { motion } from 'framer-motion';
import { Outlet, useLocation } from 'react-router-dom';

import CreateButton from '../components/CreateButton';
import Header from '../components/Header';
import NoNotes from '../components/NoNotes';
import NoteList from '../components/NoteList';
import SkeletonLoader from '../components/SkeletonLoader';
import { useGetNotes } from '../features/notes/useGetNotes';

function Archive() {
  const location = useLocation();

  // Check if we're viewing a single note (not just the archive list)
  const isViewingNote = location.pathname !== '/archive';

  // Fetch all notes
  const { notes, isPending } = useGetNotes();

  // Filter only notes that are archived
  const filteredNotes = notes?.notes?.filter((note) => note.archive === true);

  return (
    <>
      {/* Page header, only visible on larger screens when not viewing a specific note */}
      <Header head="Archived Notes" customClass={isViewingNote ? 'hidden xl:flex' : 'block'} />

    
      <div className="dark:border-darkBorder grid h-screen grid-cols-1 border-gray-300 xl:mt-5 xl:grid-cols-[300px_1fr] xl:border-t-[1px]">
        
        {/* Sidebar section: hidden on small screens if viewing a note */}
        <div
          className={`${isViewingNote ? 'hidden xl:block' : 'block'} dark:border-darkBorder border-r border-gray-300`}
        >
          <CreateButton />

          {/* Info paragraph */}
          <p className="mt-3 px-3 text-sm md:px-7">
            All your archived notes are stored here. You can restore or delete them anytime.
          </p>

          {/* Show message if no archived notes are found */}
          {(filteredNotes?.length === 0 || !filteredNotes) && (
            <NoNotes message="No notes have been archived yet. Move notes here for safekeeping, or create a new note." />
          )}

          {/* Show skeleton loader while notes are being fetched */}
          {isPending ? (
            <SkeletonLoader type="card" />
          ) : (
            <NoteList notes={filteredNotes} path="archive" />
          )}
        </div>

        {/* Main panel for viewing a specific archived note */}
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

export default Archive;
