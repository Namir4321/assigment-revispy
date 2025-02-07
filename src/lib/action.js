import { createAsyncThunk } from "@reduxjs/toolkit";
import { publicRequest } from "../Request";
// import { store } from "@/redux/store";
import {
  LoginSchema,
  RegisterSchema,
  validateZodSchema,
} from "./FormValidation";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, redirect, useNavigate } from "react-router-dom";
// import { store } from "@/redux/store";
export const RegisterAuthAction = async (previousState, formData) => {
  try {
    const rawData = Object.fromEntries(formData.entries());
    const validateFields = await validateZodSchema(RegisterSchema, rawData);
    console.log(validateFields);
    const response = await publicRequest.post("auth/register", validateFields);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
export const LoginAuthAction = createAsyncThunk(
  "auth/login",
  async (rawData, { rejectWithValue }) => {
    try {
      const validateFields = await validateZodSchema(LoginSchema, rawData);
      const response = await publicRequest.post("auth/login", validateFields);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Login failed");
    }
  }
);
export const fetchCategories = async (page = 1, limit = 6, token) => {
  try {
    const response = await publicRequest.get(
      `user/getcategory?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
export const submitSelectedCategories = async ({
  selectedCategories,
  userId,
  token,
}) => {
  console.log(token);
  try {
    const response = await publicRequest.put(
      `user/update-category/${userId}`,
      { selectedCategories },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Response:", response.data);
    // Handle the response as needed
  } catch (error) {
    console.error("Error submitting selected categories:", error);
    // Handle the error as needed
  }
};

export const VerifyOtp = async (otp, userId, token) => {
 
  try {
    const response = await publicRequest.post(
      `user/verifyotp/${userId}`,
      { code: otp },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    if (response.success) {
      redirect("/")
    }
    // return response.data;
  } catch (err) {
    console.log(err);
  }
};
export const fetchUser = createAsyncThunk(
  "user/fetch",
  async ({ user, token }, { rejectWithValue }) => {
    try {
     console.log(token,user)
      const response = await publicRequest.get(`/user/getuser/${user}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);
