import React from 'react'
import AuthCardLogin from './AuthCardLogin';
import AuthCardRegister from './AuthCardRegister';

const RegisterPage = () => {
  return (
    <div className="flex  w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <AuthCardRegister/>
      </div>
    </div>
  );
}

export default RegisterPage