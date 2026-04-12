import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Filter } from "../../components";
import { inputTypeList, PREVIEW_FORM_URL, TODO_LIST_URL } from "../../List";

import styles from "./CreateForm.module.css";

const CreateForm = () => {
  const NONE = "None";
  const inputTypeLabel = "Input Type";

  const inputLabelRef = useRef();

  const [inputLabel, setInputLabel] = useState("");
  const [selectedInput, setSelectedInput] = useState(NONE);
  const [isValid, setIsValid] = useState(false);
  const [formInputList, setFormInputList] = useState([]);

  useEffect(() => {
    inputLabelRef.current.focus();

    const list = JSON.parse(localStorage.getItem("inputList"));
    if (list) {
      setFormInputList(list);
    }
  }, []);

  useEffect(() => {
    if (inputLabel && selectedInput !== NONE) setIsValid(true);
  }, [inputLabel, selectedInput]);

  function handleSelectInput(selectedInput, label) {
    setSelectedInput(selectedInput);
  }

  function handleAddInputField(e) {
    e.preventDefault();

    const inputType = inputTypeList.find((item) => item.type === selectedInput);

    let list = [...formInputList];
    list.push({ uid: list.length + 1, label: inputLabel, ...inputType });
    setFormInputList(list);

    localStorage.setItem("inputList", JSON.stringify(list));

    setInputLabel("");
    setSelectedInput(NONE);
    setIsValid(false);
  }

  return (
    <section className="container">
      <h1>Build Form</h1>

      <div className={styles.create_form_btns}>
        <button className="common_btn">
          <Link to={PREVIEW_FORM_URL} className="common_link">
            Preview form
          </Link>
        </button>
        <button className="common_btn">
          <Link to={TODO_LIST_URL} className="common_link">
            Todo List
          </Link>
        </button>
      </div>

      <div className={styles.create_form_with_list}>
        <form
          onSubmit={handleAddInputField}
          className={styles.create_form_form}
        >
          <div className={styles.create_form_row}>
            <label htmlFor="input-label" className={styles.create_form_label}>
              Label
            </label>
            <input
              type="text"
              id="input-label"
              ref={inputLabelRef}
              onChange={(e) => setInputLabel(e.target.value)}
              value={inputLabel}
              required
              autoComplete="off"
              className={styles.create_form_input}
            />
          </div>

          <Filter
            label={inputTypeLabel}
            itemList={[{ id: 3001, type: NONE }, ...inputTypeList]}
            selectedItem={selectedInput}
            handleFilterItem={handleSelectInput}
            valueKey="type"
          />

          <button
            className="common_btn"
            disabled={isValid ? false : true}
            type="submit"
          >
            Add Input Field
          </button>
        </form>

        <ul className={styles.create_form_list}>
          {formInputList?.map((item, idx) => (
            <li key={idx}>
              <span className={styles.create_form_list_label}>
                {item?.label}
              </span>
              : {item?.type}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CreateForm;
