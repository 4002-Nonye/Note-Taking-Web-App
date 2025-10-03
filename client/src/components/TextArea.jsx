import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import ReactQuill from 'react-quill';

import ErrMsg from './ErrMsg';

import 'react-quill/dist/quill.snow.css';

// Toolbar configuration for ReactQuill editor
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link'],
    ['clean'],
  ],
};

// Allowed formats for ReactQuill content
const formats = ['header', 'bold', 'italic', 'underline', 'strike', 'list', 'bullet', 'link'];

function TextArea({ control, err }) {
  return (
    <div className="relative flex flex-col p-4 pb-24 xl:pb-4">
      {/* Controller wraps ReactQuill to work with react-hook-form */}
      <Controller
        control={control}
        name="content"
        rules={{ required: 'Provide a valid content' }}
        render={({ field: { value, onChange } }) => (
          <>
            {/* ReactQuill editor */}
            <ReactQuill
              value={value}
              name="note-content"
              id="note-content"
              onChange={onChange}
              modules={modules}
              formats={formats}
              theme="snow"
              placeholder="Write your notes here..."
              className={`custom-quill-editor no-scrollbar h-full overflow-y-auto text-sm leading-relaxed outline-0 dark:text-white dark:placeholder:text-white`}
              style={{ fontFamily: 'inherit' }}
            />
            {/* Display error message if validation fails */}
            {err.content && (
              <div className="absolute right-4 bottom-0 mt-1 text-sm text-red-600">
                <ErrMsg err={err.content.message} />
              </div>
            )}
          </>
        )}
      />
    </div>
  );
}

// Prop type validation
TextArea.propTypes = {
  control: PropTypes.object.isRequired,
  err: PropTypes.object,
};

export default TextArea;
