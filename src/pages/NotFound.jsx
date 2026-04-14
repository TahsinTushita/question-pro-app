import { Link } from "react-router-dom";
import { HOME_URL } from "../List";

const NotFound = () => {
  return (
    <section className="container">
      <h1>Not Found</h1>
      <button className="common_btn">
        <Link className="common_link" to={HOME_URL}>
          Go to Home Page
        </Link>
      </button>
    </section>
  );
};

export default NotFound;
