import { createContext, useContext, useReducer } from 'react';

import PropTypes from 'prop-types';

const NoteContext = createContext();

const initialState = {
  showCta: false,
  searchQuery: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
  }
};

function NoteProvider({ children }) {
  const [{ searchQuery }, dispatch] = useReducer(reducer, initialState);

  const handleSearch = (value) => {
    dispatch({
      type: 'SET_SEARCH_QUERY',
      payload: value,
    });
  };

  return (
    <NoteContext.Provider
      value={{
        handleSearch,
        searchQuery,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
}

const useNotes = () => {
  const context = useContext(NoteContext);
  if (context === undefined) throw new Error('Can not use NoteProvider outside Note context');
  return context;
};

export { NoteProvider,useNotes };

NoteProvider.propTypes={
  children:PropTypes.node
}