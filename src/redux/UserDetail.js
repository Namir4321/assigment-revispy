import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "../lib/action";

const userDetailRedux = createSlice({
  name: "user",
  initialState: {
    userId: "",
    verified: false,
    selectedCategory: "",
    isFetching: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.userId = action.payload._id;
        state.verified = action.payload.verified;
        state.selectedCategory = action.payload.selectedCategories.length;
        state.error = null;
      })
      
      .addCase(fetchUser.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload || "An unexpected error occurred";
        state.isLoggedIn = false;
      });
  },
});

export default userDetailRedux.reducer;
