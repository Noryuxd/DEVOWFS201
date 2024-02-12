import React from "react";
import { Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className="fixed left-0 top-[64px] h-full w-48">
        <ul className="flex flex-col items-center h-full border-2">
          <li className="my-2">Main</li>
          <li className="my-2">My Offers</li>
          <li className="my-2">Messages</li>
        </ul>
      </div>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Sidebar;
