import { MdOutlineArchive } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

import Button from "./Button";
import { useNavigate } from "react-router-dom";

function NoteCTA({ isArchive }) {
  const navigate = useNavigate();
  return (
    <div className="flex w-full flex-row items-center justify-between border-b-[1px] border-gray-300 pt-9 pb-6 text-gray-500 lg:px-4 xl:w-64 xl:items-start xl:gap-6 xl:px-0">
      <Button
        onclick={() => navigate(-1)}
        customClass="group flex gap-2  items-center xl:hidden text-sm"
      >
        <FaArrowLeft className="group-hover:text-primaryBlue text-sm transition-all duration-500" />
        <span>Go back</span>
      </Button>

      <div className="flex items-center gap-3 xl:w-64 xl:flex-col xl:gap-6">
        <Button customClass="group justify-center  items-center" type="ctaBtn">
          <MdOutlineArchive className="group-hover:text-primaryBlue text-xl text-gray-500 transition-all duration-500 lg:text-2xl" />
          <span className="hidden lg:block">
            {" "}
            {isArchive ? "Restore Note" : "Archive Note"}
          </span>
        </Button>

        <Button customClass="group justify-center" type="ctaBtn">
          <FaRegTrashAlt className="group-hover:text-primaryBlue text-lg text-gray-500 transition-all duration-500 lg:text-xl" />
          <span className="hidden lg:block">Delete Note</span>
        </Button>

        <Button customClass="w-1/4 lg:text-xl text-sm lg:hidden">Cancel</Button>
        <Button customClass="text-primaryBlue w-2/4 lg:text-xl text-sm lg:hidden">
          Save
        </Button>
      </div>
    </div>
  );
}

export default NoteCTA;
