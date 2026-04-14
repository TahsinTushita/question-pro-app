import { Link } from "react-router-dom";
import { TODO_LIST_URL, BUILD_FORM_URL, PREVIEW_FORM_URL } from "../../List";

import styles from "./Home.module.css";

const Home = () => {
  return (
    <main className="container">
      <h1>Home</h1>

      <div className={styles.home_btns}>
        <button className="common_btn">
          <Link className="common_link" to={TODO_LIST_URL}>
            Todo List
          </Link>
        </button>
        <button className="common_btn">
          <Link className="common_link" to={BUILD_FORM_URL}>
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
