import type { PaginationProps } from "./types";

import styles from "./styles.module.scss";

const { wrapper } = styles;

export const Pagination = ({
  currentPage,
  totalPages,
  setPage,
}: PaginationProps) => {
  return (
    <div className={wrapper}>
      <button
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => setPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};
