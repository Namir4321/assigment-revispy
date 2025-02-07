import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
const NavButton = () => {
  return (
    <div className="flex justify-end items-center gap-4">
      <div className="p-2  rounded-lg cursor-pointer ">
        <CiSearch className="text-3xl font-light" />
      </div>
      <div className="p-2  rounded-lg cursor-pointer ">
        <IoCartOutline className="text-3xl font-light" />
      </div>
    </div>
  );
};

export default NavButton;
