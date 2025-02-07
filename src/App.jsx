import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import AuthCard from "./components/Authentication/AuthCardRegister";
import LoginPage from "./components/Authentication/LoginPage";
import RegisterPage from "./components/Authentication/RegisterPage";
import OtpValidation from "./components/OTPValidation/OtpValidation";
import { Intrest } from "./components/Intreset/Intrest";
import Announcement from "./components/Navbar/Announcement/Announcement";
import SidebarNav from "./components/Sidebar/SidebarNav";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  const verified = useSelector((state) => state.detail.verified);
console.log(user,verified)
  return (
    <>
      <div className="">
        <div className="hidden md:block">
          <Navbar />
        </div>
        <div className="block md:hidden absolute ">
          <SidebarNav />
        </div>
        <Announcement />
        <Routes>
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <LoginPage />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <RegisterPage />}
          />
          <Route
            path="/verify"
            element={
              user && !verified ? <OtpValidation /> : <Navigate to="/" />
            }
          />
          <Route
            path="/intrest"
            element={user && verified ? <Intrest /> : <Navigate to="/verify" />}
          />
        </Routes>

        {/* <LoginPage /> */}
        {/* <RegisterPage/> */}
        {/* <OtpValidation/> */}
        {/* <Intrest /> */}
      </div>
    </>
  );
}

export default App;
