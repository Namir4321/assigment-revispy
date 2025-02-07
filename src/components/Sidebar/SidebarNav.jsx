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
import { logoutuser } from "@/redux/userRedux";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
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
        {user ? (
          <SheetFooter className="bg-red-300  flex mt-5 md:mt-0 absolute">
            <Button
              onClick={() => {
                dispatch(logoutuser());
              }}
            >
              Logout
            </Button>
          </SheetFooter>
        ) : (
          <Link to="/login" className="mt-5">
            <Button className="mt-5">LogIn</Button>
          </Link>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
