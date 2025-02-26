import PropTypes from "prop-types";

export default function Pagination({ pageData, getData, type }) {
  // 切換頁碼
  const changePage = (page) => {
    if (!type) {
      getData(type, page);
    } else {
      getData(page);
    }
  };

  return (
    <ul className="pagination f-center">
      <li className="page-item">
        <button
          className="page-link"
          aria-label="Previous"
          disabled={pageData?.currentPage === 1}
          onClick={() => changePage(pageData?.currentPage - 1)}
        >
          <span aria-hidden="true">
            <span className="material-symbols-outlined align-middle">
              arrow_left
            </span>
          </span>
        </button>
      </li>
      {[...new Array(pageData?.totalPages)].map((_, i) => (
        <li
          className={`page-item ${
            i + 1 === pageData?.currentPage ? "active" : ""
          }`}
          key={i}
        >
          <button
            className="page-link"
            type="button"
            onClick={() => getData(i + 1)}
          >
            {i + 1}
          </button>
        </li>
      ))}
      <li className="page-item">
        <button
          type="button"
          className="page-link"
          aria-label="Next"
          disabled={pageData?.currentPage === pageData?.totalPages}
          onClick={() => changePage(pageData?.currentPage + 1)}
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
  pageData: PropTypes.shape({
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
  }),
  getData: PropTypes.func,
  type: PropTypes.string,
};
