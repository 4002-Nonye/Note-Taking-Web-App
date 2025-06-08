import { Link } from "react-router-dom";
import Button from "./Button";

function CreateButton() {
  return (
    <div className="px-7 text-2xl font-extrabold xl:mt-3 xl:text-base xl:font-medium">
      <Link
        to="/notes/new"
        purpose="link"
        type="createBtn"
        className="bg-primaryBlue fixed right-3 bottom-28 m-auto flex h-14 w-14 items-center justify-center rounded-full text-white xl:relative xl:right-auto xl:bottom-auto xl:m-0 xl:ml-auto xl:h-auto xl:w-auto xl:rounded-md xl:py-3"
      >
        +<span className="hidden xl:block xl:pl-2">Create New Note</span>
      </Link>
    </div>
  );
}

export default CreateButton;
