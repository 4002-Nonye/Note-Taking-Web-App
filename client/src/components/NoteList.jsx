import Button from "./Button";
import NoNotes from "./NoNotes";
import NoteCard from "./NoteCard";

function NoteList() {
  return (
    <div className="border-r-[1px] border-gray-300 pt-5">
      <div className="px-9">
        {" "}
        <Button type="createBtn" customClass="m-auto w-4/4 ">
          + Create New Note
        </Button>
      </div>

      {/* <NoNotes /> */}
      <div className="mt-7 flex flex-col gap-5 text-[13px] h-[30rem] custom-scrollbar  no-scrollbar overflow-y-scroll ">
        <NoteCard />
      </div>
    </div>
  );
}

export default NoteList;
