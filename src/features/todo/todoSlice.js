import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const TODO_LIST_URL = "/todos";
const USER_LIST_URL = "/users";

const initialState = {
  isLoading: false,
  isError: false,
  todoList: [],
};

// fetch both the todoList and userList
// combine them according to the requirement to include the username
// and status and set them to the todoList state

export const getTodoListWithUsername = createAsyncThunk(
  "getTodoListWithUsername",
  async () => {
    try {
      const todos = await axios.get(TODO_LIST_URL);
      const users = await axios.get(USER_LIST_URL);

      async function combineLists() {
        let list = [];

        for (let todo of todos.data) {
          for (let user of users.data) {
            if (todo.userId === user.id) {
              list.push({
                id: todo.id,
                title: todo.title,
                status: todo.completed ? "Completed" : "Pending",
                username: user.username,
              });
            }
          }
        }

        return list;
      }

      const combinedList = await combineLists();
      return combinedList;
    } catch (err) {
      console.log(err);
    }
  },
);

const todoSlice = createSlice({
  name: "todo",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getTodoListWithUsername.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getTodoListWithUsername.fulfilled, (state, action) => {
        state.todoList = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getTodoListWithUsername.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default todoSlice.reducer;
