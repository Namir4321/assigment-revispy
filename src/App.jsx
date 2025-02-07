import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import LoginPage from "./components/Authentication/LoginPage";
import RegisterPage from "./components/Authentication/RegisterPage";
import OtpValidation from "./components/OTPValidation/OtpValidation";
import { Intrest } from "./components/Intreset/Intrest";
import Announcement from "./components/Navbar/Announcement/Announcement";
import SidebarNav from "./components/Sidebar/SidebarNav";
import { useSelector } from "react-redux";
import Sales from "./components/Sales/Sales";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  const verified = useSelector((state) => state.detail.verified);
  const category = useSelector(
    (state) => state.detail.selectedCategory.length > 0
  );
  const location = useLocation();

  // Prevent redirect loops by checking the current location
  if (user && !verified && location.pathname !== "/verify") {
    return <Navigate to="/verify" replace />;
  }

  if (user && verified && !category && location.pathname !== "/intrest") {
    return <Navigate to="/intrest" replace />;
  }

  return (
    <>
      <div className="">
        <div className="hidden md:block">
          <Navbar />
        </div>
        <div className="block md:hidden absolute">
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
            element={
              user && verified && !category ? <Intrest /> : <Navigate to="/" />
            }
          />
          <Route
            path="/sale"
            element={
              user && verified && category ? <Sales /> : <Navigate to="/" />
            }
          />
          <Route path="/" element={<Navigate to="/sale" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
