import React from "react";
import AuthCardRegister from "./AuthCardRegister";
import AuthCardLogin from "./AuthCardLogin";

const LoginPage = () => {
  return (
    <div className="flex  w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <AuthCardLogin/>
      </div>
    </div>
  );
};

export default LoginPage;
