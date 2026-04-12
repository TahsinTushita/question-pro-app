import axios from "./axios";
const TODO_LIST_URL = "/todos";
const USER_LIST_URL = "/users";

export const getUserList = async () => {
  try {
    const response = await axios.get(USER_LIST_URL);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getTodoListWithUsername = async () => {
  try {
    const todos = await axios.get(TODO_LIST_URL);
    const users = await getUserList();

    async function combineLists() {
      let list = [];

      for (let todo of todos.data) {
        for (let user of users) {
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
};
