import PropTypes from "prop-types";

export default function CommentsSection({ comments }) {
  return (
    <>
      <section className="video-comments pt-6">
        <div className="d-flex py-4 mb-6">
          <img
            className="user-comment-picture me-3"
            src="https://raw.githubusercontent.com/ahmomoz/Coding-bit/refs/heads/main/assets/images/user/user-2.png"
            alt="當前使用者頭像"
          />
          <input
            type="text"
            placeholder="發表留言"
            name="user-comment"
            id="user-comment"
            className="w-100 user-comment py-2"
          />
        </div>
        <ul className="history-comments">
          {comments.map((comment, index) => (
            <li className="mb-6" key={comment.commentId}>
              <div className="user-content d-flex mb-3">
                <img
                  className="user-image me-4"
                  src={comment.user.avatar}
                  alt="留言者頭像"
                />
                <div className="d-flex justify-content-between align-items-center flex-fill">
                  <div className="f-column">
                    <span className="user-name mb-2">{comment.user.name}</span>
                    <time className="comment-time fs-7">{comment.time}</time>
                  </div>
                  <button
                    type="button"
                    className="btn btn-outline-none fs-7 py-2 px-4 rounded-2 delete-comment"
                  >
                    刪除
                  </button>
                </div>
              </div>
              <div className="reply">
                <p className="reply-style fs-6">
                  這個課程把Hooks解釋得很清楚，讓我對useEffect和useCallback有了更深入的理解。講師的示例簡單易懂，推薦給大家。
                </p>
                <div
                  className="accordion accordion-flush"
                  id="accordionFlushExample"
                >
                  <div className="accordion-item">
                    <div
                      className="accordion-header mb-4"
                      id={`flush-heading${index}`}
                    >
                      <span
                        className="accordion-button mouse-pointer-style collapsed py-2 px-4"
                        data-bs-toggle="collapse"
                        data-bs-target={`#flush-collapse${index}`}
                        aria-expanded="false"
                        aria-controls={`flush-collapse${index}`}
                      >
                        {comment.replies.length} 則回覆
                      </span>
                    </div>
                    <div
                      id={`flush-collapse${index}`}
                      className="accordion-collapse collapse rounded-2"
                      aria-labelledby={`flush-collapse${index}`}
                    >
                      <div className="accordion-body">
                        {comment.replies.map((item, index) => (
                          <div
                            className={`tutor-content ${
                              index !== comment.replies.length - 1 ? "mb-8" : ""
                            }`}
                            key={item.replyId}
                          >
                            <div className="d-flex mb-3">
                              <img
                                className="tutor-image me-4"
                                src={item.user.avatar}
                                alt="留言回覆者頭像"
                              />
                              <div className="d-flex justify-content-between align-items-center flex-fill">
                                <div className="f-column">
                                  <span className="tutor-name mb-2">
                                    {item.user.name}
                                  </span>
                                  <time className="comment-time fs-7">
                                    {item.time}
                                  </time>
                                </div>
                                <button
                                  type="button"
                                  className="btn btn-outline-none fs-7 py-2 px-4 rounded-2 reply-comment"
                                >
                                  回覆
                                </button>
                              </div>
                            </div>
                            <p className="tutor-reply-style fs-6">
                              {item.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
CommentsSection.propTypes = {
  comments: PropTypes.array.isRequired,
};
