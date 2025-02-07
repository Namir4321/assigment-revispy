import React, { useEffect } from 'react'
import  OtpInputForm  from './OtpInputForm';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '@/lib/action';

const OtpValidation = () => {
  const user = useSelector((state) => state.user.currentUser);
  const token = useSelector((state) => state.user.accesstoken);
 const dispatch = useDispatch();
 useEffect(() => {
   if (user && token) {
     dispatch(fetchUser({ user, token }));
   }
 }, [user, token, dispatch]);

  return (
    <div className="flex min-h-[400px] w-full items-center justify-center p-2 md:px-10 md:py-0">
      <div className="w-full max-w-md">
      <OtpInputForm userId={user} token={token}/>
      </div>
    </div>
  );
}

export default OtpValidation