import PropTypes from "prop-types";
import CommentCard from "../tutor/CommentCard";

export default function CommentsSection({ comments, modal = false }) {
  if (!modal) {
    return (
      <section className="section student-comment">
        <div className="section-component f-between-center">
          <h4>學生評價</h4>
          <a
            href="#"
            className="text-brand-03 d-flex slide-right-hover"
            data-bs-toggle="modal"
            data-bs-target="#studentCommentModal"
          >
            <p>更多</p>
            <span className="material-symbols-outlined icon-fill">
              arrow_forward
            </span>
          </a>
        </div>

        <div className="row row-cols-lg-2 row-cols-1 g-lg-4 g-2">
          <div className="col">
            <div className="card p-4">
              <div className="row justify-content-center">
                <div className="col-lg-5 f-center flex-column">
                  <h4 className="text-brand-03 mb-2">4.9</h4>
                  <div className="f-center mb-2">
                    <img
                      src="images/icon/kid_star.svg"
                      className="text-brand-01"
                      alt=""
                      width="16"
                      height="16"
                    />
                    <img
                      src="images/icon/kid_star.svg"
                      alt=""
                      width="16"
                      height="16"
                    />
                    <img
                      src="images/icon/kid_star.svg"
                      alt=""
                      width="16"
                      height="16"
                    />
                    <img
                      src="images/icon/kid_star.svg"
                      alt=""
                      width="16"
                      height="16"
                    />
                    <img
                      src="images/icon/kid_star_half_purple.svg"
                      alt=""
                      width="16"
                      height="16"
                    />
                  </div>
                  <p className="fs-7">{comments.length} 則評論</p>
                </div>
                <div className="col-lg-7">
                  <ol className="ps-0 mb-0">
                    {/* 5星 */}
                    <li className="f-between-center">
                      <p className="fs-7 me-3">5 星</p>
                      <div
                        className="progress flex-grow-1"
                        style={{ height: "8px" }}
                        role="progressbar"
                        aria-label="Basic example"
                        aria-valuenow="0"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <div
                          className="progress-bar"
                          style={{ width: "85%" }}
                        ></div>
                      </div>
                      <p className="className=fs-7 text-gray-03">108</p>
                    </li>
                    {/* 4星 */}
                    <li className="f-between-center">
                      <p className="fs-7 me-3">4 星</p>
                      <div
                        className="progress flex-grow-1"
                        style={{ height: "8px" }}
                        role="progressbar"
                        aria-label="Basic example"
                        aria-valuenow="0"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <div
                          className="progress-bar"
                          style={{ width: "15%" }}
                        ></div>
                      </div>
                      <p className="className=fs-7 text-gray-03">3</p>
                    </li>
                    {/* 3星 */}
                    <li className="f-between-center">
                      <p className="fs-7 me-3">3 星</p>
                      <div
                        className="progress flex-grow-1"
                        style={{ height: "8px" }}
                        role="progressbar"
                        aria-label="Basic example"
                        aria-valuenow="0"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <div
                          className="progress-bar"
                          style={{ width: "0%" }}
                        ></div>
                      </div>
                      <p className="className=fs-7 text-gray-03">0</p>
                    </li>
                    {/* 2星 */}
                    <li className="f-between-center">
                      <p className="fs-7 me-3">2 星</p>
                      <div
                        className="progress flex-grow-1"
                        style={{ height: "8px" }}
                        role="progressbar"
                        aria-label="Basic example"
                        aria-valuenow="0"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <div
                          className="progress-bar"
                          style={{ width: "0%" }}
                        ></div>
                      </div>
                      <p className="className=fs-7 text-gray-03">0</p>
                    </li>
                    {/* 1星 */}
                    <li className="f-between-center">
                      <p className="fs-7 me-3">1 星</p>
                      <div
                        className="progress flex-grow-1"
                        style={{ height: "8px" }}
                        role="progressbar"
                        aria-label="Basic example"
                        aria-valuenow="0"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <div
                          className="progress-bar"
                          style={{ width: "0%" }}
                        ></div>
                      </div>
                      <p className="className=fs-7 text-gray-03">0</p>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          {/* 1st Comment */}
          {comments.slice(0, 3).map((comment) => (
            <CommentCard comment={comment} key={comment.commentId} />
          ))}
        </div>
      </section>
    );
  } else {
    return (
      <div
        className="modal fade student-comment-modal"
        id="studentCommentModal"
        tabIndex="-1"
        aria-labelledby="studentCommentModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
          <div className="modal-content">
            <div className="modal-header border-0 pb-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h4
                className="modal-title fs-md-2 fs-3 text-center mb-8"
                id="serviceSelectionModalLabel"
              >
                學生評價
              </h4>
              <div className="row flex-column g-2">
                <div className="col">
                  <div className="card p-4">
                    <div className="row justify-content-center">
                      <div className="col-lg-5 f-center flex-column">
                        <h4 className="text-brand-03 mb-2">4.9</h4>
                        <div className="f-center mb-2">
                          <img
                            src="images/icon/kid_star.svg"
                            className="text-brand-01"
                            alt=""
                            width="16"
                            height="16"
                          />
                          <img
                            src="images/icon/kid_star.svg"
                            alt=""
                            width="16"
                            height="16"
                          />
                          <img
                            src="images/icon/kid_star.svg"
                            alt=""
                            width="16"
                            height="16"
                          />
                          <img
                            src="images/icon/kid_star.svg"
                            alt=""
                            width="16"
                            height="16"
                          />
                          <img
                            src="images/icon/kid_star_half_purple.svg"
                            alt=""
                            width="16"
                            height="16"
                          />
                        </div>
                        <p className="fs-7">{comments.length} 則評論</p>
                      </div>
                      <div className="col-lg-7">
                        <ol className="ps-0 mb-0">
                          {/* 5星 */}
                          <li className="f-between-center">
                            <p className="fs-7 me-3">5 星</p>
                            <div
                              className="progress flex-grow-1"
                              style={{ height: "8px" }}
                              role="progressbar"
                              aria-label="Basic example"
                              aria-valuenow="0"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            >
                              <div
                                className="progress-bar"
                                style={{ width: "85%" }}
                              ></div>
                            </div>
                            <p className="className=fs-7 text-gray-03">108</p>
                          </li>
                          {/* 4星 */}
                          <li className="f-between-center">
                            <p className="fs-7 me-3">4 星</p>
                            <div
                              className="progress flex-grow-1"
                              style={{ height: "8px" }}
                              role="progressbar"
                              aria-label="Basic example"
                              aria-valuenow="0"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            >
                              <div
                                className="progress-bar"
                                style={{ width: "15%" }}
                              ></div>
                            </div>
                            <p className="className=fs-7 text-gray-03">3</p>
                          </li>
                          {/* 3星 */}
                          <li className="f-between-center">
                            <p className="fs-7 me-3">3 星</p>
                            <div
                              className="progress flex-grow-1"
                              style={{ height: "8px" }}
                              role="progressbar"
                              aria-label="Basic example"
                              aria-valuenow="0"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            >
                              <div
                                className="progress-bar"
                                style={{ width: "0%" }}
                              ></div>
                            </div>
                            <p className="className=fs-7 text-gray-03">0</p>
                          </li>
                          {/* 2星 */}
                          <li className="f-between-center">
                            <p className="fs-7 me-3">2 星</p>
                            <div
                              className="progress flex-grow-1"
                              style={{ height: "8px" }}
                              role="progressbar"
                              aria-label="Basic example"
                              aria-valuenow="0"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            >
                              <div
                                className="progress-bar"
                                style={{ width: "0%" }}
                              ></div>
                            </div>
                            <p className="className=fs-7 text-gray-03">0</p>
                          </li>
                          {/* 1星 */}
                          <li className="f-between-center">
                            <p className="fs-7 me-3">1 星</p>
                            <div
                              className="progress flex-grow-1"
                              style={{ height: "8px" }}
                              role="progressbar"
                              aria-label="Basic example"
                              aria-valuenow="0"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            >
                              <div
                                className="progress-bar"
                                style={{ width: "0%" }}
                              ></div>
                            </div>
                            <p className="className=fs-7 text-gray-03">0</p>
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
                {comments.map((comment) => (
                  <CommentCard comment={comment} key={comment.commentId} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
CommentsSection.propTypes = {
  comments: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.array.isRequired,
  ]),
  modal: PropTypes.bool,
};
