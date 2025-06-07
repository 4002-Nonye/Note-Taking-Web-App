import { useForm } from "react-hook-form";

import { FaRegClock } from "react-icons/fa6";
import { FiTag } from "react-icons/fi";

import NoteCTA from "./NoteCTA";
import Button from "./Button";
import TextArea from "./TextArea";
import Divider from "./Divider";
import { formatDate } from "../utils/formatDate";
import { useCreateNote } from "../features/notes/useCreateNote";
import { ClipLoader } from "react-spinners";

function NoteForm({ isArchive }) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createNote, isPending } = useCreateNote();

  const onSubmit = (data) => {
    const date = new Date();
    const newNote = {
      ...data,
      lastEdited: formatDate(date),
    };

    // createNote(newNote);
  };
  const onError = (errors) => {
    console.log(errors);
  };
  return (
    <div className="flex h-full w-full flex-col-reverse xl:flex-row">
      <div className="dark:border-darkBorder flex-grow border-r-[1px] border-gray-300">
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="dark:bg-darkbg flex flex-col pr-4 pb-16 xl:pb-0"
        >
          <input
            name="title"
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
              <FiTag /> <span>Tags</span>
            </label>
            <input
              className="border-px dark:border-darkBorder w-[60%] border-gray-400 p-2 outline-0"
              type="text"
              id="tags"
              name="tags"
              placeholder="Add tags separated by commas (e.g Work, Planning)"
              {...register("tags", {
                required: "Provide a valid tag",
              })}
            />
          </div>
          <div className="mt-3 mb-3 ml-4 flex text-sm text-gray-700 dark:text-gray-500">
            <p className="inline-flex w-36 items-center gap-1 font-medium">
              <FaRegClock />
              <span className=" ">Last Edited</span>
            </p>

            <p className="pl-2">Not saved yet</p>
          </div>
          <Divider />
          <TextArea control={control} />

          <div className="mt-4 hidden justify-end gap-5 lg:flex">
            <Button
              customClass={`bg-primaryBlue rounded-md text-white w-24 justify-center font-medium ${isPending ? "pointer-events-none" : ""}`}
            >
              {isPending ? <ClipLoader color="white" size={22} /> : "Save note"}
            </Button>
            <Button customClass="bg-gray-300 rounded-md text-black w-24 justify-center font-medium">
              Cancel
            </Button>
          </div>
        </form>
      </div>

      <NoteCTA isArchive={isArchive} />
    </div>
  );
}

export default NoteForm;
