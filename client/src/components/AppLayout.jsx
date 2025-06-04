import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

import MobileNav from "./MobileNav";

function AppLayout() {
  return (
    <div className="flex w-full flex-col xl:flex-row">
      <Sidebar />

      <div className="flex w-full flex-col">
     
        <Outlet />
      </div>

      <MobileNav />
    </div>
  );
}

export default AppLayout;
