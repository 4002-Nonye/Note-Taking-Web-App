import { Link } from "react-router-dom";

function NoteCard({ note, path }) {
  return (
    <div key={note.id} className="flex flex-col">
      <Link to={`/${path}/${note.id}`} className=" py-2 border-b-[1px] border-gray-300">
        <h3 className="px-3 text-[16px] md:text-[18px] font-bold md:px-7 xl:text-sm">
          {note.title}
        </h3>

        <ul className="my-4 flex w-full flex-wrap items-center gap-2 px-3 text-center md:px-7">
          {note?.tags?.map((tag) => (
            <li key={tag} className="h-full rounded-md bg-gray-200 px-3 py-2">
              {tag}
            </li>
          ))}
        </ul>

        <p className="px-3 md:px-7">21 May, 2025</p>
      </Link>
    </div>
  );
}

export default NoteCard;
