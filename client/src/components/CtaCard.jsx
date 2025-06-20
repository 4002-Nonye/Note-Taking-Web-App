import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { FaTrashRestoreAlt } from 'react-icons/fa';
import { MdDelete,MdOutlineArchive } from 'react-icons/md';
import { ClipLoader } from 'react-spinners';

import { useModal } from '../contexts/ModalContext';
import { useDeleteNote } from '../features/notes/useDeleteNote';
import { useEditNote } from '../features/notes/useEditNote';

import Button from './Button';

function CtaCard({ noteId }) {
  // Modal context gives current action (archive, restore, delete) and function to hide modal
  const { handleHideModal, action } = useModal();

  // Hooks for deleting and editing notes, including loading states
  const { deleteNote, isPending: isDeleting } = useDeleteNote();
  const { editNote, isPending: isEditing } = useEditNote();

  // Archive note handler
  const handleArchive = () => {
    editNote(
      { id: noteId, updatedContent: { archive: true } },
      {
        onSuccess: () => {
          handleHideModal();
        },
      }
    );
  };

  // Restore note handler
  const handleRestore = () => {
    editNote(
      { id: noteId, updatedContent: { archive: false } },
      {
        onSuccess: () => {
          handleHideModal();
        },
      }
    );
  };

  // Delete note handler
  const handleDelete = () => {
    deleteNote(noteId, {
      onSuccess: handleHideModal,
    });
  };

  // Different modal options based on current action
  const modalOptions = {
    archive: {
      icon: MdOutlineArchive,
      head: 'Archive Note',
      text: 'Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime.',
      confirmLabel: 'Archive',
      action: handleArchive,
      loading: isEditing,
    },
    restore: {
      icon: FaTrashRestoreAlt,
      head: 'Restore Note',
      text: 'Are you sure you want to restore this note? This note will be restored to All Notes section.',
      confirmLabel: 'Restore',
      action: handleRestore,
      loading: isEditing,
    },
    delete: {
      icon: MdDelete,
      head: 'Delete Note',
      text: 'Are you sure you want to delete this note permanently? This action cannot be undone.',
      confirmLabel: 'Delete',
      action: handleDelete,
      loading: isDeleting,
    },
  };

  // Grab current modal info based on action
  const {
    icon: Icon,
    head,
    text,
    confirmLabel,
    action: modalAction,
    loading,
  } = modalOptions[action] || {};

  // If action is not recognized, don't render anything
  if (!modalOptions[action]) return null;

  return (
    <>
      {/* Overlay backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm"
        onClick={handleHideModal}
      />

      {/* Modal content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        className="dark:bg-bgTag fixed top-[50%] left-1/2 z-[1000] flex w-[90%] -translate-x-1/2 -translate-y-1/2 flex-col rounded-md bg-white px-5 py-8 text-black shadow-xl md:w-[32rem] dark:text-white dark:shadow-none"
      >
        {/* Icon and title */}
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

        {/* Action buttons */}
        <div className="xsm:justify-end mt-3 flex justify-center gap-4">
          <Button
            onclick={handleHideModal}
            customClass="rounded-md bg-white text-black shadow-md dark:shadow-none  w-24 flex items-center text-center justify-center"
            btnType="button"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onclick={modalAction}
            customClass={`rounded-md text-center text-white w-24 flex items-center text-center justify-center ${
              action === 'delete' ? 'bg-red-500' : 'bg-primaryBlue'
            }`}
            btnType="button"
            disabled={loading}
          >
            {loading ? <ClipLoader color="white" size={22} /> : confirmLabel}
          </Button>
        </div>
      </motion.div>
    </>
  );
}

CtaCard.propTypes = {
  noteId: PropTypes.string.isRequired,
};

export default CtaCard;
