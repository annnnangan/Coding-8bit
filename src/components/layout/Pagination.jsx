export default function Pagination() {
  return (
    <ul className="pagination f-center">
      <li className="page-item disabled">
        <a className="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">
            <span className="material-symbols-outlined align-middle">
              {" "}
              arrow_left
            </span>
          </span>
        </a>
      </li>
      <li className="page-item">
        <a className="page-link active" href="#">
          1
        </a>
      </li>
      <li className="page-item">
        <a className="page-link" href="#">
          2
        </a>
      </li>
      <li className="page-item">
        <a className="page-link" href="#">
          3
        </a>
      </li>
      <li className="page-item">
        <a className="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">
            <span className="material-symbols-outlined align-middle">
              {" "}
              arrow_right
            </span>
          </span>
        </a>
      </li>
    </ul>
  );
}
