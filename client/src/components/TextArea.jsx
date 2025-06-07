import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form"; // <-- import here
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "link",
];

function TextArea({ control }) {
  return (
    <div className="flex flex-col p-4 pb-24 xl:pb-4">
      <Controller
        control={control}
        name="content"
        rules={{ required: "Provide a valid content" }}
        render={({ field: { value, onChange } }) => (
          <ReactQuill
            value={value}
            onChange={onChange}
            modules={modules}
            formats={formats}
            theme="snow"
            placeholder="Write your notes here..."
            className="custom-quill-editor no-scrollbar h-full overflow-y-auto text-sm leading-relaxed outline-0 dark:text-white dark:placeholder:text-white"
            style={{ fontFamily: "inherit" }}
          />
        )}
      />
    </div>
  );
}

TextArea.propTypes = {
  control: PropTypes.object.isRequired,
};

export default TextArea;
