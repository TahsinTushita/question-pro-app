import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTodoListWithUsername } from "../../features/todo/todoSlice";
import { getUserList } from "../../features/user/userSlice";
import { statusList } from "../../List";
import { Todo, Filter } from "../../components";

import styles from "./TodoList.module.css";

const TodoList = () => {
  const All = "All";
  const userLabel = "User";
  const statusLabel = "Status";

  // access the todoList and the userList from the redux store
  const { todoList } = useSelector((state) => state.todo);
  const { userList } = useSelector((state) => state.user);

  const [selectedUser, setSelectedUser] = useState(All);
  const [selectedStatus, setSelectedStatus] = useState(All);

  const dispatch = useDispatch();

  useEffect(() => {
    // fetch the todoList with username
    dispatch(getTodoListWithUsername());

    // fetch the user list
    dispatch(getUserList());
  }, []);

  // filter todo list by username and status
  const filteredList = useMemo(() => {
    if (selectedUser === All && selectedStatus === All) {
      return todoList;
    } else if (selectedUser !== All && selectedStatus === All) {
      return todoList.filter((todo) => todo.username === selectedUser);
    } else if (selectedUser === All && selectedStatus !== All) {
      return todoList.filter((todo) => todo.status === selectedStatus);
    } else {
      return todoList.filter(
        (todo) =>
          todo.username === selectedUser && todo.status === selectedStatus,
      );
    }
  }, [todoList, selectedUser, selectedStatus]);

  function handleFilterItem(selectedItem, label) {
    if (label === userLabel) {
      setSelectedUser(selectedItem);
    } else {
      setSelectedStatus(selectedItem);
    }
  }

  return (
    <section className="container">
      <h1>Todo List</h1>

      <div className={styles.todolist_filters}>
        {/* filter by username */}
        <Filter
          label={userLabel}
          itemList={userList}
          selectedItem={selectedUser}
          handleFilterItem={handleFilterItem}
        />

        {/* filter by status */}
        <Filter
          label={statusLabel}
          itemList={statusList}
          selectedItem={selectedStatus}
          handleFilterItem={handleFilterItem}
        />
      </div>

      <ul className={styles.todolist}>
        {/* Render the todo list */}
        {filteredList?.map((todo) => (
          <li key={todo.id}>
            <Todo todo={todo} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TodoList;
