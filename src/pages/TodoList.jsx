import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTodoList } from "../features/todo/todoSlice";
import { getUserList } from "../features/user/userSlice";

const TodoList = () => {
  const { todoList } = useSelector((state) => state.todo);
  const { userList } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodoList());
    dispatch(getUserList());
  }, []);

  return (
    <section>
      <h1>Todo List</h1>
      <ul>
        {todoList.map((todo) => (
          <li key={todo.id}>
            <p>{todo.title}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TodoList;
