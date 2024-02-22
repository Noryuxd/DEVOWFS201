import React from "react";
import { Link } from "react-router-dom";

const HomeNavbar = () => {
  return (
    <nav className="h-12 border-2">
      <ul className="flex justify-end space-x-4 p-2">
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/browse-employees">Browse Employees</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      </ul>
    </nav>
  );
};

export default HomeNavbar;
