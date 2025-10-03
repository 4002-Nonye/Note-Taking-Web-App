import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa6';
import { Outlet, useLocation, useMatch, useNavigate, useParams } from 'react-router-dom';

import Button from '../components/Button';
import CreateButton from '../components/CreateButton';
import Header from '../components/Header';
import NoNotes from '../components/NoNotes';
import NoteList from '../components/NoteList';
import SkeletonLoader from '../components/SkeletonLoader';
import { useGetNotes } from '../features/notes/useGetNotes';

function TaggedNotes() {
  const location = useLocation();
  const match = useMatch('/tags/:tag/:noteId');
  const isViewingNote = !!match; // true if URL matches a specific note under tag
  const { tag } = useParams();
  const { notes, isPending } = useGetNotes();
  const navigate = useNavigate();

  // Filter notes to only those that include the current tag
  const filteredNotes = notes?.notes?.filter((note) => note.tags.includes(tag));

  return (
    <>
      {/* Show back button only when NOT viewing a specific note (on small screens) */}
      {!isViewingNote && (
        <Button
          onclick={() => navigate(-1)} // Go back in browser history
          customClass="group flex gap-2 items-center xl:hidden text-sm text-gray-500 px-4 mt-2"
        >
          <FaArrowLeft className="group-hover:text-primaryBlue text-sm transition-all duration-500" />
          <span>Go back</span>
        </Button>
      )}

      <Header
        head={`Notes Tagged: ${tag}`}
        customClass={isViewingNote ? 'hidden xl:flex' : 'block'}
      />

      <div className="dark:border-darkBorder grid h-screen grid-cols-1 border-gray-300 xl:mt-5 xl:grid-cols-[300px_1fr] xl:border-t-[1px]">
        <div
          className={`${isViewingNote ? 'hidden xl:block' : 'block'} dark:border-darkBorder border-r border-gray-300`}
        >
          <CreateButton />

          <p className="mt-3 px-3 text-sm md:px-7">
            All notes tagged with &apos;{tag}&apos; are stored here.
          </p>

          {/* Conditionally render NoNotes component or loading skeleton */}
          {!isPending && filteredNotes.length === 0 && <NoNotes message='No note match the tag'/>}
          {isPending ? (
            <SkeletonLoader type="card" />
          ) : (
            <NoteList notes={filteredNotes} path={`tags/${tag}`} />
          )}
        </div>

        {/* Main content area for nested routes (individual note view) */}
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

export default TaggedNotes;
