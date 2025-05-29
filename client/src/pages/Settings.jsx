import React from "react";
import Header from "../components/Header";
import Themes from "../components/Themes";
import { Outlet } from "react-router-dom";

function Settings() {
  return (
    <>
      <Header head="Settings" />

      <div className="grid lg:h-screen  grid-cols-1 border-gray-300 xl:mt-5 lg:grid-cols-[300px_1fr] xl:border-t-[1px]">
        <div className="xl:border-r border-gray-300">
          <Themes />
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default Settings;
