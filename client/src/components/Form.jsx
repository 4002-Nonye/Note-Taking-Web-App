import React, { useEffect } from "react";
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
import { cleanTags } from "../utils/cleanTags";
import { useNavigate } from "react-router-dom";

function Form({ note = {}, isPending }) {
  const navigate = useNavigate();
  const { _id: editId, ...editValues } = note;
  const isEditSession = Boolean(editId);

  const { createNote, isPending: isCreatingNote } = useCreateNote();
  const { editNote, isPending: isEditingNote } = useEditNote();
  const { title, content, tags, lastEdited } = editValues;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { title, content, tags, lastEdited },
  });

  // Reset form when note changes

  const onSubmit = async (data) => {
    const date = new Date();

    const cleanedTags = cleanTags(data.tags);

    const noteData = {
      ...data,
      tags: cleanedTags,
      lastEdited: formatDate(date),
    };

    if (isEditSession) {
      editNote({ id: editId, updatedContent: noteData });
    } else {
      const newNote = await createNote(noteData);
      navigate(`/notes/${newNote.note._id}`);
    }
  };

  const onError = (errors) => {
    console.log(errors);
  };

  const isLoading = isCreatingNote || isEditingNote;

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="dark:bg-darkbg flex flex-col pr-4 pb-16 xl:pb-0"
    >
      <input
        type="text"
        placeholder="Enter a title..."
        className="mt-4 border-0 pl-4 text-xl font-bold text-black outline-0 placeholder:text-black xl:text-2xl dark:text-white dark:placeholder:text-white"
        {...register("title", {
          required: "Provide a valid title",
        })}
      />

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
      </div>

      <div className="mt-3 mb-3 ml-4 flex text-sm text-gray-700 dark:text-gray-500">
        <p className="inline-flex w-36 items-center gap-1 font-medium">
          <FaRegClock />
          <span>Last Edited</span>
        </p>
        <p className="pl-2">{editValues.lastEdited || "Not saved yet"}</p>
      </div>

      <Divider />

      <TextArea control={control} />

      <div className="mt-4 hidden justify-end gap-5 lg:flex">
        <Button
          customClass={`bg-primaryBlue rounded-md text-white w-24 justify-center font-medium ${
            isLoading ? "pointer-events-none" : ""
          }`}
        >
          {isLoading ? <ClipLoader color="white" size={22} /> : "Save note"}
        </Button>
        <Button customClass="bg-gray-300 rounded-md text-black w-24 justify-center font-medium">
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default Form;
