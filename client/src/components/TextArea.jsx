import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import Button from "./Button";
import { useState } from "react";

function TextArea() {
  const [value, setValue] = useState("");

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "font",
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "list",
    "bullet",
    "link",
  ];

  return (
    <div className="flex flex-1 flex-col p-4 pb-32 xl:pb-2">
      <div className="rounded-md border border-gray-300 dark:border-darkBorder">
        <ReactQuill
          modules={modules}
          formats={formats}
          theme="snow"
          value={value}
          onChange={setValue}
          placeholder="Write your notes here..."
          className="custom-quill-editor no-scrollbar h-[22rem] w-full flex-1 overflow-y-auto text-sm leading-relaxed outline-0 dark:text-white dark:placeholder:text-white"
          style={{ fontFamily: "inherit" }}
        />
      </div>

      <div className="mt-8 hidden justify-end gap-5 lg:flex">
        <Button customClass="bg-primaryBlue rounded-md text-white w-24 justify-center font-medium">
          Save Note
        </Button>
        <Button customClass="bg-gray-300 rounded-md text-black w-24 justify-center font-medium">
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default TextArea;
