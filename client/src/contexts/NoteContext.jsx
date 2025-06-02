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
    },
    {
      id: 2,
      title: "Shopping",
      content: "Buy groceries",
      tags: ["personal"],
      isArchive: true,
    },
    {
      id: 3,
      title: "Meeting",
      content: "Team sync",
      tags: ["work"],
      isArchive: true,
    },
  ],
};

const reducer = (state, action) => {};

function NoteProvider({ children }) {
  const [{ notes }, dispatch] = useReducer(reducer, initialState);
  return (
    <NoteContext.Provider value={{ notes }}>{children}</NoteContext.Provider>
  );
}

const useNotes = () => {
  const context = useContext(NoteContext);
  if (context === undefined)
    throw new Error("Can not use NoteProvider outside Note context");
  return context;
};

export { useNotes, NoteProvider };
