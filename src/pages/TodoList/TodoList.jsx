import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { getTodoListWithUsername, getUserList } from "../../api/fetchData";
import { statusList, BUILD_FORM_URL, PREVIEW_FORM_URL } from "../../List";
import { Todo, Filter } from "../../components";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import styles from "./TodoList.module.css";

const TodoList = () => {
  // const variables
  const ALL = "All";
  const USER_LABEL = "User";
  const STATUS_LABEL = "Status";
  const ITEMS_PER_PAGE = 10;

  const queryClient = useQueryClient();

  // current page
  const { data: currentPage = 1 } = useQuery({
    queryKey: ["currentPage"],
    queryFn: () => 1,
    initialData: 1,
  });

  const setCurrentPage = (page) => {
    queryClient.setQueryData(["currentPage"], page);
  };

  // selected user in filter
  const { data: selectedUser = ALL } = useQuery({
    queryKey: ["selectedUser"],
    queryFn: () => ALL,
    initialData: ALL,
  });

  // selected status in filter
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

  // reset the current page while filtering
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedUser, selectedStatus]);

  // fetch todolist data
  const {
    data: todoList = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todoList"],
    queryFn: getTodoListWithUsername,
    staleTime: 60 * 60 * 1000,
  });

  // filter todolist
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

  // slice the filtered list into pages for pagination
  const paginatedList = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredList.slice(startIndex, endIndex);
  }, [filteredList, currentPage]);

  const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);

  // calculate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5; // how many numbers to show

    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = start + maxVisible - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }

    // Add first + ellipsis
    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add ellipsis + last
    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  // fetch user list for user filter
  const { data: userList = [] } = useQuery({
    queryKey: ["userList"],
    queryFn: getUserList,
    staleTime: 60 * 60 * 1000,
  });

  function handleFilterItem(selectedItem, label) {
    if (label === USER_LABEL) {
      setSelectedUser(selectedItem);
    } else if (label === STATUS_LABEL) {
      setSelectedStatus(selectedItem);
    }
  }

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

        {/* Other page links */}
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
          paginatedList?.map((todo) => (
            <li key={todo.id}>
              <Todo todo={todo} />
            </li>
          ))
        )}
      </ul>

      {/* pagination controls */}
      <div className={styles.todolist_pagination}>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className={styles.todolist_pagination_btn}
        >
          Prev
        </button>

        {/* page numbers */}
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span
              key={page + index}
              className={styles.todolist_pagination_ellipsis}
            >
              ...
            </span>
          ) : (
            <button
              key={`page-${page}`}
              onClick={() => setCurrentPage(page)}
              className={
                page === currentPage
                  ? styles.todolist_pagination_activePage
                  : ""
              }
            >
              {page}
            </button>
          ),
        )}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className={styles.todolist_pagination_btn}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default TodoList;
