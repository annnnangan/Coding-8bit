import PropTypes from "prop-types";

export default function Pagination({ page, getData }) {
  // 切換頁碼
  const changePage = (page) => {
    getData(page);
  };

  return (
    <ul className="pagination f-center">
      <li className="page-item">
        <button
          className="page-link"
          aria-label="Previous"
          disabled={page === 1}
          onClick={() => changePage(page - 1)}
        >
          <span aria-hidden="true">
            <span className="material-symbols-outlined align-middle">
              arrow_left
            </span>
          </span>
        </button>
      </li>
      <li className="page-item">
        <button
          type="button"
          className={`page-link ${page === 1 && "active"}`}
          onClick={() => changePage(1)}
        >
          1
        </button>
      </li>
      <li className="page-item">
        <button
          type="button"
          className={`page-link ${page === 2 && "active"}`}
          onClick={() => changePage(2)}
        >
          2
        </button>
      </li>
      <li className="page-item">
        <button
          type="button"
          className={`page-link ${page === 3 && "active"}`}
          onClick={() => changePage(3)}
        >
          3
        </button>
      </li>
      <li className="page-item">
        <button
          type="button"
          className="page-link"
          aria-label="Next"
          onClick={() => changePage(page + 1)}
        >
          <span aria-hidden="true">
            <span className="material-symbols-outlined align-middle">
              arrow_right
            </span>
          </span>
        </button>
      </li>
    </ul>
  );
}
Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  getData: PropTypes.func.isRequired,
};
