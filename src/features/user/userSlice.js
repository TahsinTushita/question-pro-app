import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../api/axios";

const USER_LIST_URL = "/users";
const All = "All";

const initialState = {
  isLoading: false,
  isError: false,
  userList: [],
};

export const getUserList = createAsyncThunk("getUserList", async () => {
  try {
    const response = await axios.get(USER_LIST_URL);
    let newList = [...response.data];
    newList.unshift({ id: 1001, username: All });
    return newList;
  } catch (err) {
    console.log(err);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUserList.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getUserList.fulfilled, (state, action) => {
        state.userList = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getUserList.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default userSlice.reducer;
