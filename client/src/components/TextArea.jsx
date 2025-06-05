import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from "./Button"; // Adjust the path to your Button component

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

function TextArea({ value, setValue }) {
  return (
    <div className="flex h-screen flex-1 flex-col p-4">
      <div className="max-h-[calc(100vh-10rem)] flex-1">
        <ReactQuill
          modules={modules}
          formats={formats}
          theme="snow"
          value={value}
          onChange={setValue}
          placeholder="Write your notes here..."
          className="custom-quill-editor no-scrollbar h-full overflow-y-auto text-sm leading-relaxed outline-0 dark:text-white dark:placeholder:text-white"
          style={{ fontFamily: "inherit" }}
        />
      </div>

      {/* Buttons fixed below editor */}
      <div className="mt-4 hidden justify-end gap-5 lg:flex">
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
