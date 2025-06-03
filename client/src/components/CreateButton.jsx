import Button from "./Button";

function CreateButton() {
  return (
    <div className="px-7 text-2xl font-extrabold xl:mt-3 xl:text-base xl:font-medium">
      <Button
        type="createBtn"
        customClass="m-auto xl:w-4/4 rounded-full fixed right-3 bottom-30 xl:relative xl:bottom-auto xl:right-auto xl:m-0 xl:ml-auto"
      >
        +<span className="hidden xl:block xl:pl-2">Create New Note</span>
      </Button>
    </div>
  );
}

export default CreateButton;
