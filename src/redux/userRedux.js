import { createSlice } from "@reduxjs/toolkit";
import { LoginAuthAction } from "../lib/action";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: "",
    isFetching: false,
    error: null,
    isLoggedIn: false,
    accesstoken: "",
  },
  reducers: {
    logoutuser: (state) => {
      localStorage.removeItem("user");
      return {
        currentUser: "",
        isFetching: false,
        error: null,
        isLoggedIn: false,
        accesstoken: "",
        verified: false,
        selectedCategory: 0,
      };
    },
    changeVerify:(state)=>{
      return{
        
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginAuthAction.pending, (state) => {
        state.isFetching = true;
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(LoginAuthAction.fulfilled, (state, action) => {
        state.isFetching = false;
        state.currentUser = action.payload.userId;
        state.isLoggedIn = true;
        state.accesstoken = action.payload.accessToken;
        state.verified = action.payload.verified;
        state.selectedCategory = action.payload.category;
        state.error = null;
      })
      .addCase(LoginAuthAction.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload || "An unexpected error occurred";
        state.isLoggedIn = false;
      });
  },
});

export const { logoutuser } = userSlice.actions;
export default userSlice.reducer;
