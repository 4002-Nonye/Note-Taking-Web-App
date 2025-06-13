import { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { useNotes } from '../contexts/NoteContext';
import { useGetNoteById } from '../features/notes/useGetNoteById';

import Form from './Form';
import SkeletonLoader from './SkeletonLoader';

function NoteForm() {
  // Get noteId from URL params (if editing an existing note)
  const { noteId, query } = useParams();
  const { handleSearch } = useNotes();

  useEffect(() => {
    handleSearch(query);
  }, [query]);

  // Fetch note data by ID
  const { note, isPending, isError, error } = useGetNoteById(noteId);

  // Show loader while fetching note data (only if editing existing note)
  if (noteId && isPending) {
    return <SkeletonLoader />;
  }

  return (
    <div>
      {isError ? (
        <div className="mt-10 flex items-center justify-center">
          {/* Display error message */}
          {error.error}💥
        </div>
      ) : (
        <Form note={noteId ? note?.data : {}} isPending={isPending} isError={isError} />
      )}
    </div>
  );
}

export default NoteForm;
