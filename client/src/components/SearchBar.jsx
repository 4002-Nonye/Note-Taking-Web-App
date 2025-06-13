import { useEffect, useRef } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

// Context
import { useNotes } from '../contexts/NoteContext';

function SearchBar() {
  const { handleSearch, searchQuery } = useNotes();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const hasNavigated = useRef(false); // Prevents multiple navigations to /search

  // Handles input changes
  const handleChange = (e) => {
    const value = e.target.value;

    // Update URL query parameter
    setSearchParams({ query: value });

    // Update global search state
    handleSearch(value);

    // Navigate to /search if not already there
    if (!hasNavigated.current && location.pathname !== '/search') {
      hasNavigated.current = true;
      navigate(`/search?query=${value}`);
    }
  };

  // Sync search query from URL param on initial mount
  useEffect(() => {
    const value = searchParams.get('query');
    handleSearch(value);
  }, []);

  // Clear search state when navigating away from /search
  useEffect(() => {
    const isSearchPage = location.pathname === '/search';

    if (!isSearchPage) {
      handleSearch('');
      hasNavigated.current = false;
    }
  }, [location.pathname]);
  return (
    <div className="dark:border-darkBorder relative rounded-md border-[1px] border-gray-300 px-4 py-3">
      <input
        value={searchQuery??''}
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
