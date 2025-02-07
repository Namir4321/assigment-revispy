import React from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

const Announcement = () => {
  return (
    <div className="w-full bg-muted p-1 flex justify-center items-center">
      <MdKeyboardArrowLeft className="text-2xl" />
      <p>Get 10% off on business sign up</p>
      <MdKeyboardArrowRight className="text-2xl" />
    </div>
  );
};

export default Announcement;
