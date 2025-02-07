import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FaGripLines } from "react-icons/fa6";
import NavButton from "../Navbar/NavButton";
import NavIcon from "../Navbar/NavIcon";
import NavLink from "../Navbar/NavLink";

const Sidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <FaGripLines />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <NavIcon />
        </SheetHeader>
        <NavLink />
        {/* <SheetFooter className="bg-red-300 flex justify-start ">
          Logout
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
