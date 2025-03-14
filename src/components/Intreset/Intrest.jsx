import React, { useEffect } from "react";
import IntrestCard from "./IntrestCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "@/lib/action";

export const Intrest = () => {
  const user = useSelector((state) => state.user.currentUser);
  const token = useSelector((state) => state.user.accesstoken);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user && token) {
      dispatch(fetchUser({ user, token }));
    }
  }, [user, token, dispatch]);

  return (
    <div className="flex  w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <IntrestCard userId={user} token={token} />
      </div>
    </div>
  );
};
