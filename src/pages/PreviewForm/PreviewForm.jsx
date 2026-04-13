import { useEffect, useState } from "react";
import { BUILD_FORM_URL, TODO_LIST_URL } from "../../List";
import { Link } from "react-router-dom";

import styles from "./PreviewForm.module.css";

const PreviewForm = () => {
  // const variables
  const CHECKBOX = "checkbox";
  const TEXTAREA = "textarea";
  const SELECT = "select";
  const TEXT = "text";
  const PASSWORD = "password";
  const EMAIL = "email";
  const TEL = "tel";
  const NUMBER = "number";

  const [inputList, setInputList] = useState();

  useEffect(() => {
    // get input list from localstorage
    const list = JSON.parse(localStorage.getItem("inputList"));
    if (list) setInputList(list);
  }, []);

  // handle input field onChange
  function handleInputChange(val, idx, type) {
    const updatedList = [...inputList];

    // if input is not a "checkbox" - update its value property
    // but for a "checkbox" - update its checked property
    if (type !== CHECKBOX) {
      updatedList[idx].value = val;
    } else {
      updatedList[idx].checked = !updatedList[idx].checked;
    }

    setInputList(updatedList);
  }

  // handle submission
  function handleSubmit(e) {
    e.preventDefault();

    // for every input except "checkbox" - print the value
    // for "checkbox" - only print the value if checked is true
    console.log(
      inputList.map(
        (item) =>
          `${item.label}: ${item.type !== CHECKBOX ? item.value : item.type === CHECKBOX && item.checked ? item.value : ""}`,
      ),
    );

    let newList = [...inputList];

    // reset the list
    newList.map((item) =>
      item.type !== CHECKBOX ? (item.value = "") : (item.checked = false),
    );
    setInputList(newList);
    document.getElementById("input-form").reset();
  }

  return (
    <section className="container">
      <h1>Preview Form</h1>

      {/* links to other pages */}
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
            // checkbox
            item.type === CHECKBOX ? (
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
              // all inputs except "checkbox"
              <div key={item.id} className={styles.preview_form_row}>
                <label htmlFor={item.id} className={styles.preview_form_label}>
                  {item.label}
                </label>
                {/* textarea */}
                {item.type === TEXTAREA ? (
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
                ) : // select
                item.type === SELECT ? (
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
                ) : // text, password, email, tel, number
                item.type === TEXT || PASSWORD || EMAIL || TEL || NUMBER ? (
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

          {/* submit button */}
          <button type="submit" className="common_btn">
            Submit
          </button>
        </form>
      ) : (
        // show when the list is empty
        <p>Build a Form in the Build Form page to see the preview!</p>
      )}
    </section>
  );
};

export default PreviewForm;
