import React from "react";
import { Outlet } from "react-router-dom";

const Content = () => {
  return (
    <div className="overflow-y-scroll px-4 h-screen flex-grow ">
      <Outlet />
    </div>
  );
};

export default Content;
