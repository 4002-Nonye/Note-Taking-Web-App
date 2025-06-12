import { FiTag } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { useGetNotes } from '../features/notes/useGetNotes';

function Tags() {
  const { notes, isPending } = useGetNotes();
  if (isPending) return;

  const tags = notes.notes.flatMap((note) => note.tags);
  const uniqueTags = [...new Set(tags)];
  return (
    <>
      <div className="mt-4 px-5 xl:hidden">
        <h2 className="text-2xl font-bold text-gray-500">Tags</h2>
        <ul className="mt-4 flex flex-col gap-3">
          {uniqueTags.map((tag) => {
            return (
              <li
                key={tag}
                className="dark:border-darkBorder border-b-[1px] border-gray-300 py-3 capitalize last:border-b-0"
              >
                <Link
                  to={`/tags/${tag}`}
                  className="inline-flex h-full items-center gap-2 capitalize"
                >
                  <FiTag className="text-xl" />
                  <span className="text-sm">{tag}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default Tags;
