import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { formatDate } from '../utils/formatDate';

function NoteCard({ note, path }) {
  return (
    <div
      key={note.id}
      className="dark:hover:bg-bgCard flex flex-col transition-colors duration-700 hover:bg-gray-200"
    >
      <Link to={`/${path}/${note._id}`} className="py-2">
        <h3 className="px-7 text-[16px] font-bold capitalize md:px-7 md:text-[18px] xl:text-sm">
          {note.title}
        </h3>

        <ul className="my-4 flex w-full flex-wrap items-center gap-2 px-7 text-center md:px-7">
          {note?.tags?.map((tag) => (
            <li key={tag} className="dark:bg-bgTag h-full rounded-md bg-gray-300 px-3 py-2">
              {tag}
            </li>
          ))}
        </ul>

        <p className="px-7 md:px-7">{formatDate(new Date(note.createdAt))}</p>
      </Link>
    </div>
  );
}

export default NoteCard;

NoteCard.propTypes = {
  note: PropTypes.object,
  path: PropTypes.string,
};
