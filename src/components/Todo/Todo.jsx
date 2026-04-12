import styles from "./Todo.module.css";

const Todo = (props) => {
  const { title, status, username } = props.todo;

  return (
    <section className={styles.todo}>
      <p className={styles.todo__title}>{title}</p>
      <p className={styles.todo_status}>
        Status: <span className={styles.todo_span}>{status}</span>
      </p>
      <p className={styles.todo_username}>
        User Name: <span className={styles.todo_span}>{username}</span>
      </p>
    </section>
  );
};

export default Todo;
