import { Link } from "react-router-dom";

import styles from "./Home.module.css";

const TODO_URL = "/todos";
const CREATE_FORM_URL = "/form-builder";
const PREVIEW_FORM_URL = "/form-preview";

const Home = () => {
  return (
    <main className="container">
      <h1>Home</h1>

      <div className={styles.home_btns}>
        <button className="common_btn">
          <Link className="common_link" to={TODO_URL}>
            Todo List
          </Link>
        </button>
        <button className="common_btn">
          <Link className="common_link" to={CREATE_FORM_URL}>
            Build Form
          </Link>
        </button>
        <button className="common_btn">
          <Link className="common_link" to={PREVIEW_FORM_URL}>
            Preview & Submit Form
          </Link>
        </button>
      </div>
    </main>
  );
};

export default Home;
