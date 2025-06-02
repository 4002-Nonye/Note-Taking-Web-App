import { FiTag } from "react-icons/fi";
import { Link } from "react-router-dom";
import Notes from "./Notes";

function Tags() {
  return (
    <>
     

      <div className="mt-4 px-5 xl:hidden">
        <h2 className="text-2xl font-bold text-gray-500">Tags</h2>
        <ul className="mt-4 flex flex-col gap-3">
          <li className="border-b-[1px] border-gray-300 py-3">
            <Link to="/tags/work" className="inline-flex h-full items-center gap-2 capitalize">
              <FiTag className="text-xl" />
              <span className="text-sm">work</span>
            </Link>
          </li>
          <li className="border-b-[1px] border-gray-300 py-3">
            <Link to="/tags/cleaning" className="inline-flex h-full items-center gap-2 capitalize">
              <FiTag className="text-xl" />
              <span className="text-sm">cleaning</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Tags;