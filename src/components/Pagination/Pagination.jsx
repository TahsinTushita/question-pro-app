import styles from "./Pagination.module.css";

const Pagination = ({
  totalTodos,
  ItemsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalTodos / ItemsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className={styles.pagination_pages}>
      {pages.map((page, idx) => (
        <button
          key={idx}
          onClick={() => setCurrentPage(page)}
          className={
            page === currentPage
              ? styles.pagination_page_active
              : styles.pagination_page
          }
        >
          {page}
        </button>
      ))}
    </div>
  );
};
export default Pagination;
