import { FiTag } from "react-icons/fi";
import { MdOutlineArchive } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

function MobileNav() {
  return (
    <div className="fixed bottom-0 font-medium z-40 w-full xl:hidden border-t-[1px] bg-white border-gray-300">
      <ul className="flex justify-between px-9 text-lg  py-6 ">
        <li>
          <Link to="/notes" className='flex flex-col items-center'>
            <AiOutlineHome />
            <span>Home</span>
          </Link>
        </li>

        <li  className='flex flex-col items-center'>
          <IoSearchOutline />
          <span>Search</span>
        </li>

        <li  >
          <Link to="/archive" className='flex flex-col items-center'>
            <MdOutlineArchive />
            <span>Archived Notes</span>
          </Link>
        </li>

        <li  >
          <Link to="/tags" className='flex flex-col items-center'>
            <FiTag />
            <span>Tag</span>
          </Link>
        </li>

        <li  >
          <Link to="/settings" className='flex flex-col items-center'>
            <IoSettingsOutline />
            <span>Settings</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default MobileNav;
