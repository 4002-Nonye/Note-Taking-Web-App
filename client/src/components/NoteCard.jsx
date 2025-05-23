import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function NoteCard({ isArchive }) {
  return (
    <div className="flex flex-col gap-3">
      <Link to={`/${isArchive ? "archive" : "notes"}/1`} className="my-3" >
        <h3 className="px-4 text-[18px] font-bold md:px-9 xl:text-sm">
          This is the title
        </h3>

        <ul className="my-4 flex w-full flex-wrap items-center gap-2 px-4 text-center md:px-9">
          <li className="h-full rounded-md bg-gray-200 px-3 py-2">working</li>
          <li className="h-full rounded-md bg-gray-200 px-3 py-2">server </li>
        </ul>

        <p className="px-4 md:px-9">21 May, 2025</p>
      </Link>
    </div>
  );
}

export default NoteCard;

NoteCard.propTypes = {
  isArchive: PropTypes.bool,
};
     