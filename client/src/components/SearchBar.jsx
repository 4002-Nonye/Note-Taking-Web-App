import { useRef } from 'react';

import { IoSearchOutline } from 'react-icons/io5';
import { useLocation,useNavigate } from 'react-router-dom';

import { useNotes } from '../contexts/NoteContext';

function SearchBar() {
  const { handleSearch, searchQuery } = useNotes();
  const navigate = useNavigate();
  const location = useLocation();
  const hasNavigated = useRef(false); // Tracks if navigation has occurred

  const handleChange = (e) => {
    const value = e.target.value;
    handleSearch(value);

    // Navigate to /search on first input change
    if (!hasNavigated.current && location.pathname !== '/search') {
      hasNavigated.current = true;
      navigate('/search');
    }
  };

  return (
    <div className="dark:border-darkBorder relative rounded-md border-[1px] border-gray-300 px-4 py-3">
      <input
        value={searchQuery}
        name="search"
        type="text"
        placeholder="Search by title, content or tags..."
        className="w-80 border-0 pl-5 outline-0"
        onChange={handleChange}
        autoFocus={location.pathname === '/search'}
      />

      <IoSearchOutline className="absolute top-3.5 left-2 text-xl" />
    </div>
  );
}

export default SearchBar;
