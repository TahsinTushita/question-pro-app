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

  function handleInputChange(val, idx, type) {
    const updatedList = [...inputList];

    if (type !== "checkbox") {
      updatedList[idx].value = val;
    } else {
      updatedList[idx].checked = !updatedList[idx].checked;
    }

    setInputList(updatedList);
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log(
      inputList.map(
        (item) =>
          `${item.label}: ${item.type !== "checkbox" ? item.value : item.type === "checkbox" && item.checked ? item.value : ""}`,
      ),
    );

    let newList = [...inputList];
    newList.map((item) =>
      item.type !== "checkbox" ? (item.value = "") : (item.checked = false),
    );
    setInputList(newList);
    document.getElementById("input-form").reset();
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

      {inputList?.length ? (
        <form
          onSubmit={handleSubmit}
          className={styles.preview_form_form}
          id="input-form"
        >
          {inputList?.map((item, idx) =>
            item.type === "checkbox" ? (
              <div key={item.id} className={styles.preview_form_checkbox_row}>
                <input
                  type={item.type}
                  id={item.id}
                  name={item.name}
                  value={item.value}
                  onChange={(e) =>
                    handleInputChange(e.target.value, idx, item.type)
                  }
                  checked={item.checked}
                  className={styles.preview_form_checkbox_field}
                />

                <label
                  htmlFor={item.id}
                  className={styles.preview_form_checkbox_label}
                >
                  {item.label}
                </label>
              </div>
            ) : (
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
                    onChange={(e) =>
                      handleInputChange(e.target.value, idx, item.type)
                    }
                    required={item.required}
                  />
                ) : item.type === "select" ? (
                  <select
                    name={item.name}
                    id={item.id}
                    onChange={(e) =>
                      handleInputChange(e.target.value, idx, item.type)
                    }
                    className={styles.preview_form_input_field}
                    required={item.required}
                  >
                    {item.options.map((option) => (
                      <option key={option.oid} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                  </select>
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
                    onChange={(e) =>
                      handleInputChange(e.target.value, idx, item.type)
                    }
                    required={item.required}
                  />
                ) : null}
              </div>
            ),
          )}

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
