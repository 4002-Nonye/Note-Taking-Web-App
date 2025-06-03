import { createContext, useContext, useReducer } from "react";

const NoteContext = createContext();

const initialState = {
  notes: [
    {
      id: 1,
      title: "Work Task",
      content: "Complete project",
      tags: ["work", "server"],
      isArchive: false,
      date: new Date(),
    },
    {
      id: 2,
      title: "Shopping",
      content: "Buy groceries",
      tags: ["personal"],
      isArchive: true,
      date: new Date(),
    },
    {
      id: 3,
      title: "Meeting",
      content: "Team sync",
      tags: ["work"],
      isArchive: true,
      date: new Date(),
    },
  ],
  searchQuery: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };

    default: {
      state;
    }
  }
};

function NoteProvider({ children }) {
  const [{ notes, searchQuery }, dispatch] = useReducer(reducer, initialState);

  const handleSearch = (value) => {
    dispatch({
      type: "SET_SEARCH_QUERY",
      payload: value,
    });
  };

  const filteredNotes =
  searchQuery.trim() === ""
    ? []
    : notes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );

  return (
    <NoteContext.Provider
      value={{ notes, filteredNotes, handleSearch, searchQuery }}
    >
      {children}
    </NoteContext.Provider>
  );
}

const useNotes = () => {
  const context = useContext(NoteContext);
  if (context === undefined)
    throw new Error("Can not use NoteProvider outside Note context");
  return context;
};

export { useNotes, NoteProvider };
