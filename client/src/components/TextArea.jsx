import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form"; // <-- import here
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ErrMsg from "./ErrMsg";

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

function TextArea({ control, err }) {
  return (
    <div className="relative flex flex-col p-4 pb-24 xl:pb-4">
      <Controller
        control={control}
        name="content"
        rules={{ required: "Provide a valid content" }}
        render={({ field: { value, onChange } }) => (
          <>
            <ReactQuill
              value={value}
              onChange={onChange}
              modules={modules}
              formats={formats}
              theme="snow"
              placeholder="Write your notes here..."
              className={`custom-quill-editor no-scrollbar h-full overflow-y-auto text-sm leading-relaxed outline-0 dark:text-white dark:placeholder:text-white`}
              style={{ fontFamily: "inherit" }}
            />
            {err.content && (
              <div className="absolute bottom-0 right-4 mt-1 text-sm text-red-600">
                <ErrMsg err={err.content.message} />
              </div>
            )}
          </>
        )}
      />
    </div>
  );
}

TextArea.propTypes = {
  control: PropTypes.object.isRequired,
  err: PropTypes.object,
};

export default TextArea;
