import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <header className="fixed top-0 left-0 w-full border-2 py-4 px-6 z-10">
        <nav>
          <ul className="flex space-x-4 float-end">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/forget-pwd">Forget pswd</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className=" p-16 mx-auto">
        <Outlet />
      </main>
      {/* Add footer wehn finished */}
      {/* <footer>Footer</footer> */}
    </>
  );
};

export default Navbar;
