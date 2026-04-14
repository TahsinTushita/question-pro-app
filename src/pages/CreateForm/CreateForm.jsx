import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Filter } from "../../components";
import { inputTypeList, PREVIEW_FORM_URL, TODO_LIST_URL } from "../../List";

import styles from "./CreateForm.module.css";

const CreateForm = () => {
  // const variables
  const NONE = "None";
  const inputTypeLabel = "Input Type";
  const SELECT = "select";
  const CHECKBOX = "checkbox";

  const inputLabelRef = useRef();

  // useState variables
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
    // set the focus to the label input on initial render
    inputLabelRef.current.focus();

    // fetch the input list from the localstorage
    const list = JSON.parse(localStorage.getItem("inputList"));
    if (list) {
      setFormInputList(list);
    }
  }, []);

  useEffect(() => {
    // check if the form is valid to submit
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

  // select input type
  function handleSelectInput(selectedInput, label) {
    setSelectedInput(selectedInput);

    // if input type is "select", show the add option portion
    if (selectedInput === SELECT) {
      setIsOptionNeeded(true);
    } else {
      setIsOptionNeeded(false);
    }

    // if input type is "checkbox", hide the required checkbox
    if (selectedInput === CHECKBOX) {
      setIsShowRequired(false);
    } else {
      setIsShowRequired(true);
    }
  }

  // add option to "select" input
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

  // add new input field
  function handleAddInputField(e) {
    e.preventDefault();

    const inputId = selectedInput + crypto.randomUUID();

    let list = [...formInputList];
    list.push({
      id: inputId,
      name: inputId,
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

    // set input form list to localstorage
    localStorage.setItem("inputList", JSON.stringify(list));

    // reset the state variables
    setInputLabel("");
    setSelectedInput(NONE);
    setIsRequired(false);
    setIsOptionNeeded(false);
    setOptions([]);
    setSelectedOption("");
    setIsValid(false);
    setIsShowRequired(true);
  }

  // remove an input field
  function handleRemoveInputField(e, fieldId) {
    e.preventDefault();

    let list = [...formInputList];
    list = list.filter((item) => item.id !== fieldId);
    setFormInputList(list);

    // set updated input list to localstorage
    localStorage.setItem("inputList", JSON.stringify(list));

    // reset the state variables
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

      {/* link to other pages */}
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

      {/* add input field form */}
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

          {/* select input type */}
          <Filter
            label={inputTypeLabel}
            itemList={[{ id: 3001, type: NONE }, ...inputTypeList]}
            selectedItem={selectedInput}
            handleFilterItem={handleSelectInput}
            valueKey="type"
          />

          {/* required checkbox shown for every input field except "checkbox" */}
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

          {/* add option portion shown for "select" input */}
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

          {/* add input field button */}
          <button
            className="common_btn"
            disabled={isValid ? false : true}
            onClick={handleAddInputField}
            type="button"
          >
            Add Input Field
          </button>
        </form>

        {/* added input field list */}
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
                      , options({" "}
                      {item.options.slice(1).map((option) => (
                        <span key={option.oid}>{option.value} </span>
                      ))}
                      )
                    </span>
                  ) : null}
                </div>

                {/* remove input field button */}
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
