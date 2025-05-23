import { MdWbSunny } from "react-icons/md";
import { FaFonticonsFi } from "react-icons/fa6";

import Nav from "./Nav";

function Themes() {
  return (
    <div className="px-4 mt-5">
      <Nav to="color-theme" icon={MdWbSunny} >
        Color Theme
      </Nav>

      <Nav to="font-theme" icon={FaFonticonsFi}>
        Font Theme
      </Nav>
     

    </div>
  );
}

export default Themes;
