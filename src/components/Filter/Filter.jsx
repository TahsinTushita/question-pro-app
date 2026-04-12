import styles from "./Filter.module.css";

const Filter = ({ label, itemList, selectedItem, handleFilterItem }) => {
  return (
    <div className={styles.filter}>
      <label htmlFor="item" className={styles.filter__label}>
        {label}:
      </label>
      <select
        name="item"
        id="item"
        className={styles.filter__select}
        onChange={(e) => handleFilterItem(e.target.value, label)}
      >
        {itemList.map((item) => (
          <option
            key={item.id}
            value={item.username}
            selected={item.username === selectedItem}
          >
            {item.username}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
