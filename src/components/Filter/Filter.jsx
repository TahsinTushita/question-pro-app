import styles from "./Filter.module.css";

const Filter = ({
  label,
  itemList,
  selectedItem,
  handleFilterItem,
  valueKey,
}) => {
  return (
    <div className={styles.filter}>
      <label htmlFor="item" className={styles.filter_label}>
        {label}:
      </label>
      <select
        name="item"
        id="item"
        className={styles.filter_select}
        onChange={(e) => handleFilterItem(e.target.value, label)}
      >
        {itemList?.map((item) => (
          <option
            key={item.id}
            value={item[valueKey]}
            selected={item[valueKey] === selectedItem}
          >
            {item[valueKey]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
