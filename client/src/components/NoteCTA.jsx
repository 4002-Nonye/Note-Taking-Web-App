import { MdOutlineArchive } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

import Button from "./Button";

function NoteCTA() {
  return (
    <div className="flex w-64 flex-col items-center gap-6 pt-9">
      <Button customClass="group" type="ctaBtn">
        <MdOutlineArchive className="group-hover:text-primaryBlue text-2xl text-black transition-all duration-500" />
        Archive Note
      </Button>

      <Button customClass="group" type="ctaBtn">
        <FaRegTrashAlt className="group-hover:text-primaryBlue text-xl text-black transition-all duration-500" />
        Delete Note
      </Button>
    </div>
  );
}

export default NoteCTA;
