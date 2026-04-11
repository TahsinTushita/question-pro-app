import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const TODO_LIST_URL = "/todos";

const initialState = {
  isLoading: false,
  isError: false,
  todoList: [],
};

export const getTodoList = createAsyncThunk("getTodoList", async () => {
  try {
    const response = await axios.get(TODO_LIST_URL);
    return response.data;
  } catch (err) {
    console.log(err);
  }
});

const todoSlice = createSlice({
  name: "todo",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getTodoList.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getTodoList.fulfilled, (state, action) => {
        state.todoList = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getTodoList.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default todoSlice.reducer;
