import { Link } from "react-router-dom";

import { FiTag } from "react-icons/fi";
import { MdOutlineArchive } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";

import logo from "../assets/icon-logo.svg";

import Nav from "./Nav";
import { useNotes } from "../contexts/NoteContext";

function Sidebar() {
  const { notes } = useNotes();
  const tags = notes.flatMap((note) => note.tags);

  // avoid duplicate tags
  const uniqueTags = [...new Set(tags)];
  return (
    <aside className="w-full border-gray-300 bg-gray-200 p-3 lg:p-6 xl:w-[20%] xl:border-r-[1px] xl:bg-inherit xl:p-0 xl:pt-7">
      <img className="p-3" src={logo} alt="app-logo" />

      <nav className="mt-3 hidden flex-col gap-3 p-3 xl:flex">
        <Nav to="/notes" icon={AiOutlineHome}>
          All Notes
        </Nav>
        <Nav to="/archive" icon={MdOutlineArchive}>
          Archived Notes
        </Nav>
      </nav>

      <div className="mt-4 hidden border-t-[1px] border-gray-300 p-3 xl:block">
        <h2 className="font-medium text-gray-500">Tags</h2>

        <ul className="mt-4 flex flex-col gap-3">
          {uniqueTags.map((tag) => (
            <li key={tag}>
              <Link
                to={`tags/${tag}`}
                className="inline-flex h-full items-center gap-2 capitalize"
              >
                <FiTag className="text-xl" />{" "}
                <span className="text-sm">{tag}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
