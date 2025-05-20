import { Outlet } from "react-router-dom";
import NoteList from "../components/NoteList";
import Header from "../components/Header";

function Notes() {
  return (
    <>
      <Header head="All Notes" />
      <div className="grid-display mt-5 grid h-screen gap-4 border-t-[1px] border-gray-300">
        <NoteList />
        <Outlet />
      </div>
    </>
  );
}

export default Notes;
