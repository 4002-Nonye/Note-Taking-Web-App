import { FaRegClock } from "react-icons/fa6";
import { FiTag } from "react-icons/fi";

import NoteCTA from "./NoteCTA";
import Button from "./Button";
import TextArea from "./TextArea";
import Divider from "./Divider";

import { ClipLoader } from "react-spinners";

import { useParams } from "react-router-dom";
import { useGetNoteById } from "../features/notes/useGetNoteById";
import Form from "./Form";

function NoteForm({ isArchive }) {
  const { noteId } = useParams();

  // Only fetch note if we're in edit mode (noteId exists)
  const { note, isPending } = useGetNoteById(noteId, {
    enabled: !!noteId, // Only run the query if noteId exists
  });

  // If we're editing and still loading, show loading state
  if (noteId && isPending) return <div>Loading...</div>;

  return (
    <div className="flex h-full w-full flex-col-reverse xl:flex-row">
      <div className="dark:border-darkBorder flex-grow border-r-[1px] border-gray-300">
        {/* Pass null as note when creating new note */}
        <Form note={noteId ? note?.data : {}} isPending={isPending} />
      </div>

      <NoteCTA isArchive={isArchive} />
    </div>
  );
}

export default NoteForm;
