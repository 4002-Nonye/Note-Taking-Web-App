import _ from 'lodash';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaMagic, FaRegClock } from 'react-icons/fa';
import { FiTag } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

import { useSuggestTags } from '../features/ai/useSuggestTags';
import { useCreateNote } from '../features/notes/useCreateNote';
import { useEditNote } from '../features/notes/useEditNote';
import { formatDate } from '../utils/formatDate';

import Button from './Button';
import Divider from './Divider';
import ErrMsg from './ErrMsg';
import NoteCTA from './NoteCTA';
import TextArea from './TextArea';

/**
 * Form component for creating/editing notes
 * @param {Object} note - The note object to edit (optional i.e required for edit, not required for create)
 * @param {Boolean} isError - Flag for error state
 */
function Form({ note = {}, isError }) {
  // Navigation hook
  const navigate = useNavigate();

  // Destructure note data for edit session
  const { _id: editId, ...editValues } = note;
  const isEditSession = Boolean(editId);

  // Custom hooks for API operations
  const { suggestTags, isPending: isSuggestingTags } = useSuggestTags();
  const { createNote, isPending: isCreatingNote } = useCreateNote();
  const { editNote, isPending: isEditingNote } = useEditNote();
  
  // Extract values from note for edit
  const { title, content, tags, lastEdited } = editValues;

  // Prepare default form values
  const defaultFormValues = {
    title,
    content,
    tags: tags?.join(', '), // Convert tags array to comma-separated string
  };

  // Form management using react-hook-form
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields },
    getValues,
  } = useForm({
    defaultValues: isEditSession ? defaultFormValues : {},
  });

  /**
   * Handler for suggesting tags based on title
   */
  const handleSuggestTags = () => {
    const { title } = getValues();
    
    // Validation checks
    if (!title || title === '') {
      toast('Provide a title to generate tags', { icon: '⚠️' });
      return;
    }
    if (title === editValues.title) {
      toast('No changes were made', { icon: '⚠️' });
      return;
    }
    if (!dirtyFields.title) {
      toast('No changes were made', { icon: '⚠️' });
      return;
    }

    // Call suggestTags API
    suggestTags(title, {
      onSuccess: (data) => {
        const generatedTags = data.tags?.join(', ');
        if (generatedTags) {
          reset({ ...getValues(), tags: generatedTags });
        }
      },
    });
  };

  /**
   * Form submission handler
   * @param {Object} data - Form data
   */
  const onSubmit = async (data) => {
    const date = new Date();

    // Prepare note data for API
    const noteData = {
      ...data,
      tags: data.tags.split(',').map((tag) => tag.trim()), // Convert comma-separated string to array
      lastEdited: formatDate(date),
    };

    // Create new note if not in edit mode
    if (!isEditSession) {
      const newNote = await createNote(noteData);
      navigate(`/notes/${newNote.note._id}`);
      return;
    }

    // Check for changes in edit mode
    const noChangesMade = _.isEqual(data, defaultFormValues);

    if (noChangesMade) {
      toast('No changes were made', { icon: '⚠️' });
      return;
    }

    // Update existing note
    editNote({ id: editId, updatedContent: noteData });
  };

  /**
   * Form error handler
   * @param {Object} errors - Form errors
   */
  const onError = (errors) => {
    console.log(errors);
  };

  // Loading state
  const isLoading = isCreatingNote || isEditingNote;

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="dark:bg-darkbg flex flex-col xl:flex-row-reverse"
    >
      {/* Sidebar actions (only shown when no errors) */}
      {!isError && (
        <NoteCTA 
          isArchive={note.archive} 
          reset={reset} 
          defaultFormValues={defaultFormValues} 
        />
      )}

      {/* Main form content */}
      <div className="dark:border-darkBorder flex flex-1 flex-grow flex-col border-r-[1px] border-gray-300 pb-16 xl:pb-0">
        {/* Title input section */}
        <div className="flex flex-col px-4">
          <input
            type="text"
            placeholder="Enter a title..."
            className="mt-4 border-0 text-xl font-bold text-black capitalize outline-0 placeholder:text-black xl:text-2xl dark:text-white dark:placeholder:text-white"
            {...register('title', {
              required: 'Provide a valid title',
            })}
          />
          {errors.title && <ErrMsg err={errors.title.message} className="mt-1" />}
        </div>

        {/* Tags input section */}
        <div className="mt-3 px-4">
          <div className="flex items-center text-sm text-gray-700 dark:text-gray-500">
            <label
              htmlFor="tags"
              className="inline-flex w-28 items-center gap-1 font-medium md:w-32"
            >
              <FiTag />
              <span>Tags</span>
            </label>
            <div className="flex flex-1 flex-col">
              <div className="flex gap-2">
                <input
                  className="dark:border-darkBorder w-[80%] border-b border-gray-400 p-2 outline-0"
                  type="text"
                  id="tags"
                  placeholder="Add tags separated by commas (e.g Work, Planning)"
                  {...register('tags', {
                    required: 'Provide a valid tag',
                  })}
                />
                {/* AI tag suggestion button */}
                <Button
                  onclick={() => handleSuggestTags()}
                  btnType="button"
                  customClass="bg-primaryBlue rounded-md text-white font-medium flex justify-center items-center px-4"
                >
                  {isSuggestingTags ? <ClipLoader color="white" size={22} /> : <FaMagic />}
                </Button>
              </div>
              {errors.tags && <ErrMsg err={errors.tags.message} className="mt-1" />}
            </div>
          </div>
        </div>

        {/* Last edited timestamp */}
        <div className="mt-3 mb-3 ml-4 flex text-sm text-gray-700 dark:text-gray-500">
          <p className="inline-flex w-28 items-center gap-1 font-medium md:w-32">
            <FaRegClock />
            <span>Last Edited</span>
          </p>
          <p className="pl-2">{lastEdited || 'Not saved yet'}</p>
        </div>

        <Divider />

        {/* Main content textarea */}
        <TextArea control={control} err={errors} />

        {/* Form action buttons (desktop only) */}
        <div className="mt-4 hidden justify-end gap-5 lg:flex">
          <Button
            customClass={`bg-primaryBlue rounded-md text-white w-24 justify-center font-medium ${
              isLoading ? 'pointer-events-none' : ''
            }`}
          >
            {isLoading ? <ClipLoader color="white" size={22} /> : 'Save note'}
          </Button>
          <Button
            onclick={() => reset(defaultFormValues)}
            btnType="button"
            customClass="bg-gray-300 rounded-md text-black w-24 justify-center font-medium"
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
}

// PropTypes for type checking
Form.propTypes = {
  note: PropTypes.object,
  isError: PropTypes.bool,
};

export default Form;