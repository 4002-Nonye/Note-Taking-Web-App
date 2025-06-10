import PropTypes from "prop-types";

import { MdOutlineArchive } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

import Button from "./Button";
import CtaCard from "./CtaCard";

import MoveBack from "./MoveBack";
import { useModal } from "../contexts/ModalContext";
import { useParams } from "react-router-dom";

function NoteCTA({ isArchive, reset, defaultFormValues }) {
  const { showModal, handleShowModal } = useModal();
  const { noteId } = useParams();

  return (
    <div className="dark:border-darkBorder flex w-full flex-row items-center justify-between border-b-[1px] border-gray-300 pt-9 pb-6 text-gray-500 lg:px-4 xl:w-64 xl:items-start xl:gap-6 xl:border-b-0 xl:px-0">
      <MoveBack
        text="Go back"
        navigateTo={-1}
        className="group flex items-center gap-2 text-sm xl:hidden"
      />

      <div className="flex items-center gap-3 xl:w-64 xl:flex-col xl:gap-6">
        <Button
          btnType="button"
          customClass="group justify-center  items-center"
          type="ctaBtn"
          onclick={() => handleShowModal(isArchive ? "restore" : "archive")}
        >
          <MdOutlineArchive className="group-hover:text-primaryBlue text-xl text-gray-500 transition-all duration-500 lg:text-2xl" />
          <span className="hidden lg:block">
            {" "}
            {isArchive ? "Restore Note" : "Archive Note"}
          </span>
        </Button>

        <Button
          customClass="group justify-center"
          type="ctaBtn"
          btnType="button"
          onclick={() => handleShowModal("delete")}
        >
          <FaRegTrashAlt className="group-hover:text-primaryBlue text-lg text-gray-500 transition-all duration-500 lg:text-xl" />
          <span className="hidden lg:block">Delete Note</span>
        </Button>

        <Button
          btnType="button"
          customClass="w-1/4 lg:text-xl text-sm lg:hidden"
          onclick={() => reset(defaultFormValues)}
        >
          Cancel
        </Button>
        <Button customClass="text-primaryBlue w-2/4 lg:text-xl text-sm lg:hidden">
          Save
        </Button>
      </div>
      {showModal && <CtaCard noteId={noteId} />}
    </div>
  );
}
NoteCTA.propTypes = {
  isArchive: PropTypes.bool,
  reset: PropTypes.func,
  defaultFormValues: PropTypes.object,
};
export default NoteCTA;
