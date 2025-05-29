import { MdWbSunny } from "react-icons/md";
import { AiOutlineFontSize } from "react-icons/ai";

import Nav from "./Nav";

function Themes() {
  return (
    <div className="m-auto flex lg:block  w-3/4 items-center justify-center gap-5 rounded-md bg-white p-3 px-4 shadow-lg lg:w-full lg:flex-col lg:items-start lg:justify-items-start lg:rounded-none lg:bg-inherit  lg:shadow-none xl:mt-5">
      <Nav to="color-theme" icon={MdWbSunny} arrowVisible='lg:block hidden' className='w-full'>
        <span className="hidden lg:block">Color Theme</span>
      </Nav>

      <Nav to="font-theme" icon={AiOutlineFontSize} arrowVisible='lg:block hidden' className='w-full'>
        <span className="hidden lg:block">Font Theme</span>
      </Nav>
    </div>
  );
}

export default Themes;
