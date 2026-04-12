import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { getTodoListWithUsername } from "../../features/todo/todoSlice";
// import { getUserList } from "../../features/user/userSlice";
import { getTodoListWithUsername, getUserList } from "../../api/fetchData";
import { statusList, BUILD_FORM_URL, PREVIEW_FORM_URL } from "../../List";
import { Todo, Filter } from "../../components";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import styles from "./TodoList.module.css";

const TodoList = () => {
  const ALL = "All";
  const USER_LABEL = "User";
  const STATUS_LABEL = "Status";

  const queryClient = useQueryClient();

  const { data: selectedUser = ALL } = useQuery({
    queryKey: ["selectedUser"],
    queryFn: () => ALL,
    initialData: ALL,
  });

  const { data: selectedStatus = ALL } = useQuery({
    queryKey: ["selectedStatus"],
    queryFn: () => ALL,
    initialData: ALL,
  });

  const setSelectedUser = (value) => {
    queryClient.setQueryData(["selectedUser"], value);
  };

  const setSelectedStatus = (value) => {
    queryClient.setQueryData(["selectedStatus"], value);
  };

  const {
    data: todoList = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todoList"],
    queryFn: getTodoListWithUsername,
    staleTime: 60 * 60 * 1000,
  });

  const { data: filteredList = [] } = useQuery({
    queryKey: ["filteredList", selectedUser, selectedStatus],
    queryFn: () => {
      if (selectedUser === ALL && selectedStatus === ALL) {
        return todoList;
      } else if (selectedUser !== ALL && selectedStatus === ALL) {
        return todoList.filter((todo) => todo.username === selectedUser);
      } else if (selectedUser === ALL && selectedStatus !== ALL) {
        return todoList.filter((todo) => todo.status === selectedStatus);
      } else {
        return todoList.filter(
          (todo) =>
            todo.username === selectedUser && todo.status === selectedStatus,
        );
      }
    },
    staleTime: 60 * 60 * 1000,
    enabled: todoList.length > 0,
  });

  const { data: userList = [] } = useQuery({
    queryKey: ["userList"],
    queryFn: getUserList,
    staleTime: 60 * 60 * 1000,
  });

  function handleFilterItem(selectedItem, label) {
    if (label === USER_LABEL) {
      setSelectedUser(selectedItem);
    } else if (label === STATUS_LABEL) {
      console.log(selectedItem);
      setSelectedStatus(selectedItem);
    }
  }

  // if (isLoading) return <p>Loading ...</p>;
  // if (error) return <p>Error</p>;

  return (
    <section className="container">
      <h1>Todo List</h1>

      <div className={styles.todolist_filter_btns}>
        <div className={styles.todolist_filter_btn}>
          {/* filter by username */}
          <Filter
            label={USER_LABEL}
            itemList={[{ id: 1003, username: ALL }, ...userList]}
            selectedItem={selectedUser}
            handleFilterItem={handleFilterItem}
            valueKey="username"
          />

          {/* filter by status */}
          <Filter
            label={STATUS_LABEL}
            itemList={[{ id: 1004, status: ALL }, ...statusList]}
            selectedItem={selectedStatus}
            handleFilterItem={handleFilterItem}
            valueKey="status"
          />
        </div>

        <div className={styles.todolist_filter_btn}>
          <button className="common_btn">
            <Link to={BUILD_FORM_URL} className="common_link">
              Build form
            </Link>
          </button>
          <button className="common_btn">
            <Link to={PREVIEW_FORM_URL} className="common_link">
              Preview form
            </Link>
          </button>
        </div>
      </div>

      <ul className={styles.todolist}>
        {/* Render the todo list */}
        {isLoading ? (
          <p className={styles.todolist_loading}>Loading ...</p>
        ) : (
          filteredList?.map((todo) => (
            <li key={todo.id}>
              <Todo todo={todo} />
            </li>
          ))
        )}
      </ul>
    </section>
  );
};

export default TodoList;
