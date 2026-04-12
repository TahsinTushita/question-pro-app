import Todo from "../Todo/Todo";

import styles from "./TodoPage.module.css";

const TodoPage = ({ todoList }) => {
  return (
    <ul className={styles.todopage}>
      {todoList?.map((todo) => (
        <li key={todo.id}>
          <Todo todo={todo} />
        </li>
      ))}
    </ul>
  );
};
export default TodoPage;
