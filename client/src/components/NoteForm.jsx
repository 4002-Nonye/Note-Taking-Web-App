import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

import { useGetNoteById } from '../features/notes/useGetNoteById';

import Form from './Form'


function NoteForm() {
  const isDark = document.documentElement.classList.contains('dark');

  const { noteId } = useParams();

  const { note, isPending, isError, error } = useGetNoteById(noteId);

  // If we're editing and still loading, show loading state
  if (noteId && isPending)
    return (
      <div className="flex h-full items-center justify-center">
        <ClipLoader
          size={50}
          color={isDark ? '#ffffff' : '#000000'}
          cssOverride={{
            borderWidth: '5px',
          }}
        />
      </div>
    );

  return (
    <div>
      {isError ? (
        <div className="mt-10 flex items-center justify-center">{error.error}💥</div>
      ) : (
        <Form note={noteId ? note?.data : {}} isPending={isPending} isError={isError} />
      )}
    </div>
  );
}

export default NoteForm;
