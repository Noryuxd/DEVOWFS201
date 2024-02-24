import { RouterProvider } from "react-router-dom";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import "./App.css";
import { router } from "./router";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Forget_pwd from "./pages/ForgetPassord/Forget_pwd";

function App() {

  return (
    <>
      <RouterProvider router={router} />
      {/* <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/sing-up" element={<SignUp />} />
          <Route path="/forget-pwd" element={<Forget_pwd />} />

        </Routes>
      </Router> */}
    </>
  );
}

export default App;
