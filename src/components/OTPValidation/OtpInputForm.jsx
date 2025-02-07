import React, { useState, useRef } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSelector } from "react-redux";
import { VerifyOtp } from "@/lib/action";

const OtpInputForm = ({ userId, token }) => {
  const [otp, setOtp] = useState("");
  const handleOtpChange = (value) => {
    setOtp(value);
  };
  const handleSubmitOTP = async (event) => {
    event.preventDefault();
    // console.log("Submitted OTP:", otp, userId);
    await VerifyOtp(otp, userId, token);
  };
  return (
    <Card className="md:px-4 px-0">
      <CardHeader>
        <CardTitle className="text-2xl flex justify-center">
          Verify your email
        </CardTitle>
        <CardDescription className="flex justify-center text-center">
          Enter the 8-digit code you have received on dev***@revispy.com
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmitOTP}>
          <div className="flex flex-col items-center gap-2">
            <h6 className="text-lg font-medium text-start md:px-2 w-full">
              Code
            </h6>
            <InputOTP
              value={otp}
              onChange={handleOtpChange}
              maxLength={8}
              className="w-full"
            >
              <InputOTPGroup className="gap-2 flex justify-center">
                {Array.from({ length: 8 }).map((_, index) => (
                  <InputOTPSlot
                    key={index}
                    className="border-2"
                    index={index}
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
          <div className="mt-8">
            <Button type="submit" className="w-full uppercase rounded-sm">
              Submit
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default OtpInputForm;
