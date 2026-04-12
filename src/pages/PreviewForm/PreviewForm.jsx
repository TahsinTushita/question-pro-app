import { useEffect, useState } from "react";
import { BUILD_FORM_URL, TODO_LIST_URL } from "../../List";
import { Link } from "react-router-dom";

const PreviewForm = () => {
  const [inputList, setInputList] = useState();

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("inputList"));
    if (list) setInputList(list);
  }, []);

  return (
    <section className="container">
      <h1>Preview Form</h1>

      <div>
        <button className="common_btn">
          <Link to={BUILD_FORM_URL} className="common_link">
            Build form
          </Link>
        </button>
        <button className="common_btn">
          <Link to={TODO_LIST_URL} className="common_link">
            Todo List
          </Link>
        </button>
      </div>

      <form>
        {inputList?.map((item) => (
          <div key={item.id}>
            <label htmlFor={item.id}>{item.label}</label>
            {item.type === "text" ? (
              <input type={item.type} id={item.id} name={item.name} />
            ) : (
              <textarea id={item.id} name={item.name} />
            )}
          </div>
        ))}

        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default PreviewForm;
