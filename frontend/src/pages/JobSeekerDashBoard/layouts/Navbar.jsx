import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <div className="bg-gray-100 text-gray-600 w-full  z-10 flex items-center justify-between px-6  py-12 h-16 ">
      <h1 className="text-3xl text-black font-bold">
        <NavLink to="/dashboard">Dashboard</NavLink>
      </h1>
      <div className="flex items-center">
        <NavLink
          to="/"
          className="bg-white text-blue-600 hover:text-white hover:bg-blue-600 font-bold mr-4 border p-2 border-blue-400 rounded"
        >
          Back To HomePage
        </NavLink>
        <FontAwesomeIcon
          icon={faBell}
          className="text-gray-600 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Navbar;
