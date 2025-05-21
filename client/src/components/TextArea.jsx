import Button from "./Button";

function TextArea() {
  return (
    <div className="flex flex-1 flex-col p-4">
      <textarea
        className="no-scrollbar overflow-y-scroll max-h-[22rem] w-[85%] flex-1 resize-none  text-base leading-relaxed outline-0"
        placeholder="Write your notes here..."
      ></textarea>

      <div className="mt-3 flex justify-end gap-5">
        <Button customClass="bg-primaryBlue text-white w-24 justify-center font-medium">
          Save Note
        </Button>
        <Button customClass="bg-gray-300 text-black w-24 justify-center font-medium">
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default TextArea;
