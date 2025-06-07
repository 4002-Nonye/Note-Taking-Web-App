import { FiTag } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useNotes } from "../contexts/NoteContext";


function Tags() {
  const { notes } = useNotes();
  const tags = notes.flatMap((note) => note.tags);
  const uniqueTags = [...new Set(tags)];
  return (
    <>
    
      <div className="mt-4 px-5 xl:hidden ">
        <h2 className="text-2xl font-bold text-gray-500">Tags</h2>
        <ul className="mt-4 flex flex-col gap-3">
          {uniqueTags.map((tag) => {
            return (
              <li key={tag} className="border-b-[1px] border-gray-300 py-3 dark:border-darkBorder last:border-b-0 capitalize">
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
