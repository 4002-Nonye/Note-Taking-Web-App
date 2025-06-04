import { Link } from "react-router-dom";

function NoteCard({ note, path }) {
  return (
    <div key={note.id} className="flex flex-col hover:bg-gray-200 dark:hover:bg-bgCard  transition-colors duration-700">
      <Link
        to={`/${path}/${note.id}`}
        className=" py-2 "
      >
        <h3 className="px-7 text-[16px] font-bold md:px-7 md:text-[18px] xl:text-sm">
          {note.title}
        </h3>

        <ul className="my-4 flex w-full flex-wrap items-center gap-2 px-7 text-center md:px-7">
          {note?.tags?.map((tag) => (
            <li key={tag} className="h-full rounded-md bg-gray-300 dark:bg-bgTag px-3  py-2">
              {tag}
            </li>
          ))}
        </ul>

        <p className="px-7 md:px-7">
          {note.date ? new Date(note.date).toLocaleDateString() : ""}
        </p>
      </Link>
    </div>
  );
}

export default NoteCard;
