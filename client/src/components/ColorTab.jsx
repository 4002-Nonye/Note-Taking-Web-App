import { IoSunny, IoMoon } from "react-icons/io5";

function ColorTab() {
  return (
    <div className="px-7 pt-9 text-sm">
        <div className='mb-6'>
        <h3 className="font-bold text-lg">Color Theme</h3>
      <p>Choose your color theme</p>

        </div>
     



      <div className="flex flex-col gap-7">



      <div className="flex w-2/4 items-center gap-3 rounded-md border-[1px] border-gray-300 p-3 cursor-pointer">
        <div className="rounded-md border-[1px] border-gray-300 p-3 text-2xl">
          <IoSunny className="text-2xl" />
        </div>

        <div>
          <p className="font-bold">Light Mode</p>
          <p>Pick a clean and classic light theme</p>
        </div>
      </div>

      <div className="flex w-2/4 items-center gap-3 rounded-md border-[1px] border-gray-300 p-3 cursor-pointer">
        <div className="rounded-md border-[1px] border-gray-300 p-3 text-2xl">
          <IoMoon />
        </div>

        <div>
          <p className="font-bold">Dark Mode</p>
          <p>Select a sleek and modern dark theme</p>
        </div>
      </div>



      </div>
    </div>
  );
}

export default ColorTab;
