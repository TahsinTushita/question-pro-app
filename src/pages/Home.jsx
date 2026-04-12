import { Link } from "react-router-dom";

const TODO_URL = "/todos";
const CREATE_FORM_URL = "/form-builder";
const PREVIEW_FORM_URL = "/form-preview";

const Home = () => {
  return (
    <main className="container">
      <button>
        <Link to={TODO_URL}>Todo List</Link>
      </button>
      <button>
        <Link to={CREATE_FORM_URL}>Create Form</Link>
      </button>
      <button>
        <Link to={PREVIEW_FORM_URL}>Preview & Submit Form</Link>
      </button>
    </main>
  );
};

export default Home;
