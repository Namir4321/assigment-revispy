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
import { LoginAuthAction, RegisterAuthAction } from "@/lib/action";

const AuthCardRegister = () => {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl flex justify-center items-center">
            Create your account
          </CardTitle>
        </CardHeader>
        <CardContent className="mb-8">
          <FormContainer action={RegisterAuthAction}>
            <FormInput
              name="name"
              label="Name"
              type="text"
              placeholder="Enter your Name"
            />
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
              text="Register"
              btnSize="default"
              variant="default"
            />
          </FormContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthCardRegister;
