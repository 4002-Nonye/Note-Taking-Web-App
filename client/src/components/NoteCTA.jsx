import { MdOutlineArchive } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

import Button from "./Button";

function NoteCTA() {
  return (
    <div className="flex w-full flex-row items-center justify-between gap-6 border-b-[1px] border-gray-300 px-4 pt-9 pb-6 xl:w-64 xl:items-start xl:px-0">
      <Button customClass="group flex gap-2  items-center xl:hidden text-sm">
        <FaArrowLeft className="group-hover:text-primaryBlue text-sm transition-all duration-500" />
        <span>Go back</span>
      </Button>

      <div className="flex w-48 md:w-96 items-center gap-6 xl:w-64 xl:flex-col">
        <Button customClass="group justify-center items-center" type="ctaBtn">
          <MdOutlineArchive className="group-hover:text-primaryBlue text-2xl text-black transition-all duration-500" />
          <span className="hidden md:block">Archive Note</span>
        </Button>

        <Button customClass="group justify-center" type="ctaBtn">
          <FaRegTrashAlt className="group-hover:text-primaryBlue text-xl text-black transition-all duration-500" />
          <span className="hidden md:block">Delete Note</span>
        </Button>
      </div>
    </div>
  );
}

export default NoteCTA;
