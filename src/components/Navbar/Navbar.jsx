import { CarFront } from "lucide-react";
import React from "react";

import NavIcon from "./NavIcon";
import NavLink from "./NavLink";
import NavButton from "./NavButton";
import Announcement from "./Announcement/Announcement";

const Navbar = () => {
  
  return (
    <>
    <div className="hidden md:flex justify-between mb-2 items-center containerspace mt-6  w-full ">
      <NavIcon />
      <NavLink />
      <NavButton />
    </div>
    </>
  );
};

export default Navbar;
