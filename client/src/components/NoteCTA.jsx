import { MdOutlineArchive } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

import Button from "./Button";

function NoteCTA() {
  return (
    <div className="flex text-gray-500 w-full flex-row items-center justify-between xl:gap-6 border-b-[1px] border-gray-300 lg:px-4 pt-9 pb-6 xl:w-64 xl:items-start xl:px-0">
      <Button customClass="group flex gap-2  items-center xl:hidden text-sm">
        <FaArrowLeft className="group-hover:text-primaryBlue text-sm transition-all duration-500" />
        <span>Go back</span>
      </Button>

      <div className="flex items-center  xl:gap-6 gap-3 xl:w-64 xl:flex-col">
       
        <Button customClass="group justify-center  items-center" type="ctaBtn">
          <MdOutlineArchive className="group-hover:text-primaryBlue text-xl lg:text-2xl text-gray-500 transition-all duration-500" />
          <span className="hidden lg:block">Archive Note</span>
        </Button>

        <Button customClass="group justify-center" type="ctaBtn">
          <FaRegTrashAlt className="group-hover:text-primaryBlue text-lg lg:text-xl text-gray-500 transition-all duration-500" />
          <span className="hidden lg:block">Delete Note</span>
        </Button>

        <Button customClass="w-1/4 lg:text-xl text-sm lg:hidden">Cancel</Button>
        <Button customClass="text-primaryBlue w-2/4 lg:text-xl text-sm lg:hidden">Save</Button>
      </div>
    </div>
  );
}

export default NoteCTA;
