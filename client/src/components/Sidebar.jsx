import { AiOutlineHome } from 'react-icons/ai';
import { FiTag } from 'react-icons/fi';
import { MdOutlineArchive } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

import darkLogo from '../assets/icon-logo.svg';
import logo from '../assets/icon-logo-white.svg';
import { useGetNotes } from '../features/notes/useGetNotes';

import Nav from './Nav';
import SkeletonLoader from './SkeletonLoader';

function Sidebar() {
  // Fetch notes and loading status using custom hook
  const { notes, isPending } = useGetNotes();

  // Extract all tags from notes (flatten all tags arrays)
  const tags = notes?.notes?.flatMap((note) => note.tags);

  // Remove duplicate tags 
  const uniqueTags = [...new Set(tags)];

  return (
    <aside className="dark:border-darkBorder dark:bg-bgCard xl:dark:bg-darkbg w-full border-gray-300 bg-gray-200 p-3 lg:p-6 xl:w-[20%] xl:border-r-[1px] xl:bg-inherit xl:p-0 xl:pt-7">
      {/* Logo for light mode */}
      <img src={darkLogo} alt="logo" className="block p-3 dark:hidden" />
      
      {/* Logo for dark mode */}
      <img src={logo} alt="logo" className="hidden p-3 dark:block" />

      {/* Navigation links for main sections */}
      <nav className="mt-3 hidden flex-col gap-3 p-3 xl:flex">
        <Nav to="/notes" icon={AiOutlineHome}>
          All Notes
        </Nav>
        <Nav to="/archive" icon={MdOutlineArchive}>
          Archived Notes
        </Nav>
      </nav>

      {/* Tags section  */}
      <div className="dark:border-darkBorder mt-4 hidden border-t-[1px] border-gray-300 p-3 xl:block">
        <h2 className="font-medium text-gray-500">Tags</h2>

        <ul className="no-scrollbar mt-4 flex h-96 flex-col gap-3 overflow-auto">
          {/* Show loading skeleton while fetching */}
          {isPending && <SkeletonLoader type="tag" />}
          
          {/* Render list of unique tags as navigation links */}
          {uniqueTags?.map((tag) => (
            <li key={tag}>
              <NavLink
                to={`tags/${tag}`}
                className="inline-flex h-full items-center gap-2 capitalize"
              >
                {/* Use NavLink's isActive to style active tag */}
                {({ isActive }) => (
                  <>
                    <FiTag className="text-xl" />
                    <span className={`text-sm ${isActive ? 'text-primaryBlue' : ''}`}>{tag}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
