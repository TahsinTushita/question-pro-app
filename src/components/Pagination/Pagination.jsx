import { useState, useEffect } from "react";

import styles from "./Pagination.module.css";

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  const [pageNumbers, setPageNumbers] = useState([]);

  // calculate page numbers
  function getPageNumbers() {
    const pages = [];
    const maxVisible = 5; // how many numbers to show

    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = start + maxVisible - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }

    // Add first + ellipsis
    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add ellipsis + last
    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  }

  useEffect(() => {
    setPageNumbers(getPageNumbers());
  }, [currentPage, totalPages]);

  return (
    <div className={styles.pagination}>
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className={styles.pagination_btn}
      >
        Prev
      </button>

      {/* page numbers */}
      {pageNumbers.map((page, index) =>
        page === "..." ? (
          <span key={page + index} className={styles.pagination_ellipsis}>
            ...
          </span>
        ) : (
          <button
            key={`page-${page}`}
            onClick={() => setCurrentPage(page)}
            className={page === currentPage ? styles.pagination_activePage : ""}
          >
            {page}
          </button>
        ),
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        className={styles.pagination_btn}
      >
        Next
      </button>
    </div>
  );
};
export default Pagination;
