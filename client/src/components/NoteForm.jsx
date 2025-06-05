

import { FaRegClock } from "react-icons/fa6";
import { FiTag } from "react-icons/fi";

import NoteCTA from "./NoteCTA";
import Button from "./Button";
import TextArea from "./TextArea";
import Divider from "./Divider";

function NoteForm({isArchive}) {
   
  return (

    <div className="flex xl:flex-row flex-col-reverse h-screen w-full ">
      <div className="flex-grow border-r-[1px] border-gray-300 dark:border-darkBorder">
        <form className="flex  flex-col pr-4">
          <input
            type="text"
            placeholder="Enter a title..."
            className="mt-4 border-0 pl-4 text-xl xl:text-2xl font-bold text-black outline-0 placeholder:text-black dark:placeholder:text-white dark:text-white"
          />
          <div className="text-gray-700 dark:text-gray-500 mt-3 ml-4 flex text-sm">
            <label
              htmlFor="tags"
              className="inline-flex w-36 items-center gap-1 font-medium"
            >
              <FiTag /> <span>Tags</span>
            </label>
            <input
              className="border-px w-[60%] border-gray-400 p-2 dark:border-darkBorder"
              type="text"
              id="tags"
              name="tags"
              placeholder="Add tags separated by commas (e.g Work, Planning)"
            />
          </div>
          <div className=" mt-3 mb-3 ml-4 flex text-sm text-gray-700 dark:text-gray-500">
            <p className="inline-flex w-36 items-center gap-1 font-medium">
              <FaRegClock />
              <span className=" ">Last Edited</span>
            </p>

            <p className="pl-2">Not saved yet</p>
          </div>
          <Divider />
          <TextArea />
        </form>
      </div>
      <NoteCTA isArchive={isArchive} />
    </div>
  
  );
}

export default NoteForm;
