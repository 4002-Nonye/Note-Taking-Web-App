import { Link } from "react-router-dom";
import Button from "./Button";

function NoteList() {
  return (
    <div className="border-r-[1px] border-gray-300 px-8 pt-5">
      <Button type="createBtn" customClass="w-full ">
        + Create New Note
      </Button>

      <Link to="/notes/1">note 1</Link>
    </div>
  );
}

export default NoteList;
