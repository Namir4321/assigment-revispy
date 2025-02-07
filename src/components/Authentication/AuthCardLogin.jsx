import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormContainer from "../Form/FormContainer";
import FormInput from "../Form/FormInput";
import SubmitButton from "../Form/SubmitButton";
import {
  LoginAuthAction,
} from "@/lib/action";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
const AuthCardLogin = () => {
  const dispatch = useDispatch();
  const handleFormSubmit = (previousState, formData) => {
    // Convert FormData to plain object
    const rawData = Object.fromEntries(formData);
    dispatch(LoginAuthAction(rawData));
  };
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl flex justify-center items-center">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent className="mb-8">
          <FormContainer action={handleFormSubmit}>
            <FormInput
              name="email"
              label="Email"
              type="email"
              placeholder="Enter your name"
            />
            <FormInput
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
            />
            <SubmitButton
              className="w-full uppercase  rounded-sm mt-4"
              text="LOGIN"
              btnSize="default"
              variant="default"
            />
          </FormContainer>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="uppercase font-semibold">
              Sign Up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthCardLogin;
