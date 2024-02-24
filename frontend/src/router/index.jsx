import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";

import NotFound from "../pages/NotFound";
import Navbar from "../layouts/Navbar";
import Dashboard from "../pages/Dashboard";
import Sidebar from "../layouts/Sidebar";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Forget_pwd from "../pages/ForgetPassord/Forget_pwd";

export const router = createBrowserRouter([
  {
    element: <Navbar />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <SignUp />,
      },
      {
        path: "/forget-pwd",
        element: <Forget_pwd />,
      },
      {
        path: "/",
        element: <Sidebar />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
