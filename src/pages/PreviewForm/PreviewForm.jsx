import { useEffect, useState } from "react";
import { BUILD_FORM_URL, TODO_LIST_URL } from "../../List";
import { Link } from "react-router-dom";

import styles from "./PreviewForm.module.css";

const PreviewForm = () => {
  const [inputList, setInputList] = useState();

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("inputList"));
    if (list) setInputList(list);
  }, []);

  function handleInputChange(val, idx) {
    const updatedList = [...inputList];
    updatedList[idx].value = val;
    setInputList(updatedList);
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log(inputList.map((item) => `${item.label}: ${item.value}`));

    let newList = [...inputList];
    newList.map((item) => (item.value = ""));
    setInputList(newList);
  }

  return (
    <section className="container">
      <h1>Preview Form</h1>

      <div className={styles.preview_form_btns}>
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

      {inputList ? (
        <form onSubmit={handleSubmit} className={styles.preview_form_form}>
          {inputList?.map((item, idx) => (
            <div key={item.id} className={styles.preview_form_row}>
              <label htmlFor={item.id} className={styles.preview_form_label}>
                {item.label}
              </label>
              {item.type === "textarea" ? (
                <textarea
                  id={item.id}
                  name={item.name}
                  className={styles.preview_form_textarea}
                  value={item.value}
                  onChange={(e) => handleInputChange(e.target.value, idx)}
                  required={item.required}
                />
              ) : item.type === "text" ||
                "password" ||
                "email" ||
                "tel" ||
                "number" ? (
                <input
                  type={item.type}
                  id={item.id}
                  name={item.name}
                  className={styles.preview_form_input_field}
                  value={item.value}
                  onChange={(e) => handleInputChange(e.target.value, idx)}
                  required={item.required}
                />
              ) : null}
            </div>
          ))}

          <button type="submit" className="common_btn">
            Submit
          </button>
        </form>
      ) : (
        <p>Build a Form in the Build Form page to see the preview!</p>
      )}
    </section>
  );
};

export default PreviewForm;
