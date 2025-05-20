import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import NoteList from "./NoteList";
import Notes from "../pages/Notes";

function AppLayout() {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />

      <div className="flex w-full flex-col">
        
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
