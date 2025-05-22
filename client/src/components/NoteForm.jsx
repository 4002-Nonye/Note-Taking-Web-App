

import { FaRegClock } from "react-icons/fa6";
import { FiTag } from "react-icons/fi";

import NoteCTA from "./NoteCTA";
import Button from "./Button";
import TextArea from "./TextArea";
import Divider from "./Divider";

function NoteForm() {
   
  return (

    <div className="flex xl:flex-row flex-col-reverse w-full ">
      <div className="flex-grow border-r-[1px] border-gray-300">
        <form className="flex h-[calc(100vh-5rem)] flex-col">
          <input
            type="text"
            placeholder="Enter a title..."
            className="mt-4 border-0 pl-4 text-2xl font-bold text-black outline-0 placeholder:text-black"
          />
          <div className="text-grey-300 mt-3 ml-4 flex text-sm">
            <label
              htmlFor="tags"
              className="inline-flex w-36 items-center gap-1 font-medium"
            >
              <FiTag /> <span>Tags</span>
            </label>
            <input
              className="border-px w-[60%] border-gray-400 p-2"
              type="text"
              id="tags"
              name="tags"
              placeholder="Add tags separated by commas (e.g Work, Planning)"
            />
          </div>
          <div className="text-grey-300 mt-3 mb-3 ml-4 flex text-sm">
            <p className="inline-flex w-36 items-center gap-1 font-medium">
              <FaRegClock />
              <span>Last Edited</span>
            </p>

            <p className="pl-2">Not saved yet</p>
          </div>
          <Divider />
          <TextArea />
        </form>
      </div>
      <NoteCTA />
    </div>
  
  );
}

export default NoteForm;
