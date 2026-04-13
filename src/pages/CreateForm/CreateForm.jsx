import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Filter } from "../../components";
import { inputTypeList, PREVIEW_FORM_URL, TODO_LIST_URL } from "../../List";

import styles from "./CreateForm.module.css";

const CreateForm = () => {
  const NONE = "None";
  const inputTypeLabel = "Input Type";
  const SELECT = "select";
  const CHECKBOX = "checkbox";

  const inputLabelRef = useRef();

  const [inputLabel, setInputLabel] = useState("");
  const [selectedInput, setSelectedInput] = useState(NONE);
  const [isRequired, setIsRequired] = useState(false);
  const [isOptionNeeded, setIsOptionNeeded] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [isShowRequired, setIsShowRequired] = useState(true);
  const [formInputList, setFormInputList] = useState([]);

  useEffect(() => {
    inputLabelRef.current.focus();

    const list = JSON.parse(localStorage.getItem("inputList"));
    if (list) {
      setFormInputList(list);
    }
  }, []);

  useEffect(() => {
    if (inputLabel && selectedInput !== NONE) {
      if (!isOptionNeeded) {
        setIsValid(true);
      } else {
        if (options.length > 0) {
          setIsValid(true);
        }
      }
    }
  }, [inputLabel, selectedInput, isOptionNeeded, options]);

  function handleSelectInput(selectedInput, label) {
    setSelectedInput(selectedInput);

    if (selectedInput === SELECT) {
      setIsOptionNeeded(true);
    } else {
      setIsOptionNeeded(false);
    }

    if (selectedInput === CHECKBOX) {
      setIsShowRequired(false);
    } else {
      setIsShowRequired(true);
    }
  }

  function handleAddOption(e) {
    e.preventDefault();

    if (selectedOption) {
      let optionList = [...options];
      optionList.push({
        oid: options.length + 2,
        value: selectedOption,
        name: selectedOption,
      });
      setOptions(optionList);
      setSelectedOption("");
    }
  }

  function handleAddInputField(e) {
    e.preventDefault();

    let list = [...formInputList];
    list.push({
      id: selectedInput + (list.length + 1).toString(),
      name: selectedInput + (list.length + 1).toString(),
      label: inputLabel,
      type: selectedInput,
      value: selectedInput === CHECKBOX ? inputLabel : "",
      checked: false,
      required: isRequired,
      options:
        selectedInput === SELECT && options.length > 1
          ? [{ oid: 1, value: "", name: "None" }, ...options]
          : [],
    });
    setFormInputList(list);

    localStorage.setItem("inputList", JSON.stringify(list));

    setInputLabel("");
    setSelectedInput(NONE);
    setIsRequired(false);
    setIsOptionNeeded(false);
    setOptions([]);
    setSelectedOption("");
    setIsValid(false);
    setIsShowRequired(true);
  }

  function handleRemoveInputField(e, fieldId) {
    e.preventDefault();

    let list = [...formInputList];
    list = list.filter((item) => item.id !== fieldId);
    setFormInputList(list);

    localStorage.setItem("inputList", JSON.stringify(list));

    setInputLabel("");
    setSelectedInput(NONE);
    setIsRequired(false);
    setIsOptionNeeded(false);
    setOptions([]);
    setSelectedOption("");
    setIsValid(false);
    setIsShowRequired(true);
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
        <form className={styles.create_form_form}>
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

          {isShowRequired ? (
            <div className={styles.create_form_row}>
              <input
                type="checkbox"
                id="required-checkbox"
                className={styles.create_form_input}
                onChange={(e) => setIsRequired(e.target.checked ? true : false)}
                checked={isRequired}
              />
              <label
                htmlFor="required-checkbox"
                className={styles.create_form_list_checkbox_label}
              >
                Required
              </label>
            </div>
          ) : null}

          {isOptionNeeded ? (
            <div className={styles.create_form_options_div}>
              <div className={styles.create_form_options_add}>
                <input
                  type="text"
                  id="add-option"
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  placeholder="option"
                  className={styles.create_form_input}
                />
                <button
                  onClick={handleAddOption}
                  className="common_btn"
                  disabled={selectedOption ? false : true}
                >
                  Add Option
                </button>
              </div>
              <div className={styles.create_form_options_pills}>
                {options?.map((option, idx) => (
                  <button
                    disabled
                    key={idx}
                    className={styles.create_form_options_pill}
                  >
                    {option.value}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <button
            className="common_btn"
            disabled={isValid ? false : true}
            onClick={handleAddInputField}
          >
            Add Input Field
          </button>
        </form>

        <ul className={styles.create_form_list}>
          {formInputList?.map((item) => (
            <li key={item.id}>
              <div className={styles.create_form_list_item}>
                <div>
                  <span className={styles.create_form_list_label}>
                    {item.label}
                  </span>
                  : {item.type}
                  {item.required ? ", required" : null}
                  {item.type === SELECT && item.options.length ? (
                    <span>
                      , options(
                      {item.options.slice(1).map((option) => (
                        <span key={option.oid}>{option.value} </span>
                      ))}
                      )
                    </span>
                  ) : null}
                </div>

                <button onClick={(e) => handleRemoveInputField(e, item.id)}>
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CreateForm;
