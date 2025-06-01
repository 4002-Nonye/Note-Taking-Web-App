import { useState } from "react";

import Button from "./Button";
import NoNotes from "./NoNotes";
import NoteCard from "./NoteCard";

function NoteList({ tag }) {
  const [notes, setNotes] = useState([
    { id: 1, title: "Work Task", content: "Complete project", tags: ["work"] },
    { id: 2, title: "Shopping", content: "Buy groceries", tags: ["personal"] },
    { id: 3, title: "Meeting", content: "Team sync", tags: ["work"] },
  ]);

  return (
    <div className="border-gray-300 pb-24 xl:border-r-[1px] xl:pt-5 xl:pb-0">
      <div className="px-9 text-2xl font-extrabold xl:text-base xl:font-medium">
        {" "}
        <Button
          type="createBtn"
          customClass="m-auto xl:w-4/4 rounded-full fixed right-3 bottom-30  xl:relative xl:bottom-auto xl:right-auto xl:m-0 xl:ml-auto "
        >
          +<span className="hidden xl:block xl:pl-2">Create New Note</span>
        </Button>
      </div>

      <div className="no-scrollbar mt-7 flex flex-col gap-5 text-[13px] xl:h-[calc(100vh-16rem)] xl:overflow-y-auto">
        {!notes.length ? <NoNotes /> : <NoteCard />}
      </div>
    </div>
  );
}

export default NoteList;
