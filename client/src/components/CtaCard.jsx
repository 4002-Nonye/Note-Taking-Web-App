import { MdOutlineArchive } from "react-icons/md";
import { FaTrashRestoreAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { motion } from "framer-motion";

import Button from "./Button";
import { useModal } from "../contexts/ModalContext";

function CtaCard() {
  const { handleHideModal, action } = useModal();
  const modalOptions = [
    {
      type: "archive",
      icon: MdOutlineArchive,
      head: "Archive Note",
      text: "Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime.",
      confirmLabel: "Archive",
    },
    {
      type: "restore",
      icon: FaTrashRestoreAlt,
      head: "Restore Note",
      text: "Are you sure you want to restore this note? This note will be restored to All Notes section.",
      confirmLabel: "Restore",
    },
    {
      type: "delete",
      icon: MdDelete,
      head: "Delete Note",
      text: "Are you sure you want to delete this note permanently? This action cannot be undone.",
      confirmLabel: "Delete",
    },
  ];
  const selected = modalOptions.find((opt) => opt.type === action);
  const { icon: Icon, head, text, confirmLabel, type } = selected;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm"
        onClick={handleHideModal}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        className="dark:bg-bgTag fixed top-[50%] left-1/2 z-[1000] flex w-[90%] md:w-[32rem] -translate-x-1/2 -translate-y-1/2 flex-col rounded-md bg-white px-5 py-8 text-black shadow-xl dark:text-white dark:shadow-none"
      >
        <div className="flex items-start justify-between gap-5">
          <div className="rounded-md p-2 dark:bg-[#717784] dark:text-white">
            <Icon className="text-2xl" />
          </div>

          <div>
            <h4 className="text-lg font-bold">{head}</h4>
            <p className="mt-2 text-sm">{text}</p>
          </div>
        </div>

        <hr className="my-4 w-full border-t border-gray-300 dark:border-gray-600" />

        <div className="mt-3 flex justify-center xsm:justify-end gap-4">
          <Button
            onclick={handleHideModal}
            customClass="bg-white text-black rounded-md px-6 shadow-md dark:shadow-none"
            btnType="button"
          >
            Cancel
          </Button>
          <Button
            customClass={` ${type === "delete" ? "bg-red-500" : "bg-primaryBlue"}  text-white rounded-md px-6`}
            btnType="button"
          >
            {confirmLabel}
          </Button>
        </div>
      </motion.div>
    </>
  );
}

export default CtaCard;
