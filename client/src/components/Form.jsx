import { useForm } from "react-hook-form";
import { formatDate } from "../utils/formatDate";
import { FiTag } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa";
import Divider from "./Divider";
import { useCreateNote } from "../features/notes/useCreateNote";
import { useEditNote } from "../features/notes/useEditNote";
import TextArea from "./TextArea";
import Button from "./Button";
import { ClipLoader } from "react-spinners";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ErrMsg from "./ErrMsg";
import NoteCTA from "./NoteCTA";
import _ from "lodash";


function Form({ note = {}, isError }) {
  const navigate = useNavigate();

  const { _id: editId, ...editValues } = note;
  const isEditSession = Boolean(editId);

  const { createNote, isPending: isCreatingNote } = useCreateNote();
  const { editNote, isPending: isEditingNote } = useEditNote();
  const { title, content, tags, lastEdited } = editValues;
  const defaultFormValues = {
    title,
    content,
    tags: tags?.join(", "),
  };

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession ? defaultFormValues : {},
  });

  const onSubmit = async (data) => {
    const date = new Date();

    const noteData = {
      ...data,
      tags: data.tags.split(",").map((tag) => tag.trim()),
      lastEdited: formatDate(date),
    };

    if (!isEditSession) {
      // Always create a new note when not in edit mode
      const newNote = await createNote(noteData);
      navigate(`/notes/${newNote.note._id}`);
      return;
    }

    const noChangesMade = _.isEqual(data, defaultFormValues);

    if (noChangesMade) {
      toast("No changes were made", { icon: "⚠️" });
      return;
    }

    editNote({ id: editId, updatedContent: noteData });
  };

  const onError = (errors) => {
    console.log(errors);
  };

  const isLoading = isCreatingNote || isEditingNote;


  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="dark:bg-darkbg flex flex-col xl:flex-row-reverse"
    >
      {!isError && (
        <NoteCTA
          isArchive={note.archive}
          reset={reset}
          defaultFormValues={defaultFormValues}
        />
      )}

      <div className="dark:border-darkBorder flex flex-1 flex-grow flex-col border-r-[1px] border-gray-300 pb-16 xl:pb-0">
        <div className="flex items-center justify-between">
          <input
            type="text"
            placeholder="Enter a title..."
            className="mt-4 border-0 pl-4 text-xl font-bold text-black outline-0 placeholder:text-black xl:text-2xl dark:text-white dark:placeholder:text-white"
            {...register("title", {
              required: "Provide a valid title",
            })}
          />
          {errors.title && <ErrMsg err={errors.title.message} />}
        </div>

        <div className="mt-3 ml-4 flex text-sm text-gray-700 dark:text-gray-500">
          <label
            htmlFor="tags"
            className="inline-flex w-36 items-center gap-1 font-medium"
          >
            <FiTag />
            <span>Tags</span>
          </label>
          <input
            className="border-px dark:border-darkBorder w-[60%] border-gray-400 p-2 outline-0"
            type="text"
            id="tags"
            placeholder="Add tags separated by commas (e.g Work, Planning)"
            {...register("tags", {
              required: "Provide a valid tag",
            })}
          />
          {errors.tags && <ErrMsg err={errors.tags.message} />}
        </div>

        <div className="mt-3 mb-3 ml-4 flex text-sm text-gray-700 dark:text-gray-500">
          <p className="inline-flex w-36 items-center gap-1 font-medium">
            <FaRegClock />
            <span>Last Edited</span>
          </p>
          <p className="pl-2">{lastEdited || "Not saved yet"}</p>
        </div>

        <Divider />

        <TextArea control={control} err={errors} />

        <div className="mt-4 hidden justify-end gap-5 lg:flex">
          <Button
            customClass={`bg-primaryBlue rounded-md text-white w-24 justify-center font-medium ${
              isLoading ? "pointer-events-none" : ""
            }`}
          >
            {isLoading ? <ClipLoader color="white" size={22} /> : "Save note"}
          </Button>
          <Button
            onclick={() => reset(defaultFormValues)}
            btnType="button"
            customClass="bg-gray-300 rounded-md text-black w-24 justify-center font-medium"
          >
            Cancel
          </Button>
        </div>
      </div>
    
    </form>
  );
}

export default Form;
