import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { Button } from "../ui/button";
import { logoutuser } from "@/redux/userRedux";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NavButton = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  return (
    <div className="flex justify-end items-center gap-4">
      {/* Search Icon */}
      <div className="p-2 rounded-lg cursor-pointer">
        <CiSearch className="text-3xl font-light" />
      </div>

      {/* Cart Icon */}
      <div className="p-2 rounded-lg cursor-pointer">
        <IoCartOutline className="text-3xl font-light" />
      </div>

      {/* Auth Button */}
      <div className="p-2 rounded-lg cursor-pointer">
        {user ? (
          <Button
            onClick={() => dispatch(logoutuser())}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Logout
          </Button>
        ) : (
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavButton;
