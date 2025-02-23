import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { formatDateToTaiwanStyle } from "../../../utils/timeFormatted-utils";
import { countReplies } from "../../../utils/countReplies-utils";
import userApi from "../../../api/userApi";

export default function CommentsSection({ comments }) {
  const [userComments, setUserComments] = useState([]);
  const [replyCount, setReplyCount] = useState({});
  const [userInfo, setUserInfo] = useState({});

  const reduceComments = () => {
    const { parentComments, childComments } = comments.reduce(
      (acc, comment) => {
        if (comment.parent_id === null) {
          acc.parentComments.push(comment);
        } else {
          acc.childComments.push(comment);
        }
        return acc;
      },
      { parentComments: [], childComments: [] }
    );

    return { parentComments, childComments };
  };

  useEffect(() => {
    if (comments && Array.isArray(comments)) {
      const { parentComments, childComments } = reduceComments();
      setUserComments(parentComments.reverse());
      setReplyCount(countReplies(childComments));
    }
  }, [comments]);

  useEffect(() => {
    const getUserInfo = async () => {
      const res = await userApi.getUserData();
      setUserInfo(res);
    };
    getUserInfo();
  }, []);

  return (
    <>
      <section className="video-comments pt-6">
        <div className="d-flex py-4 mb-6">
          <img
            className="user-comment-picture me-3"
            src={userInfo.avatar_url}
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
          {userComments.map((userComment, index) => (
            <li className="mb-6" key={userComment.id}>
              <div className="user-content d-flex mb-3">
                <img
                  className="user-image me-4"
                  src={userComment.User.avatar_url}
                  alt="留言者頭像"
                />
                <div className="d-flex justify-content-between align-items-center flex-fill">
                  <div className="f-column">
                    <span className="user-name mb-2">
                      {userComment.User.username}
                    </span>
                    <time className="comment-time fs-7">
                      {formatDateToTaiwanStyle(userComment.createdAt)}
                    </time>
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
                <p className="reply-style fs-6">{userComment.content}</p>
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
                        className={`accordion-button mouse-pointer-style collapsed py-2 px-4 ${
                          replyCount[userComment.id] === undefined
                            ? "d-none"
                            : ""
                        }`}
                        data-bs-toggle="collapse"
                        data-bs-target={`#flush-collapse${index}`}
                        aria-expanded="false"
                        aria-controls={`flush-collapse${index}`}
                      >
                        {replyCount[userComment.id]
                          ? replyCount[userComment.id].length
                          : 0}{" "}
                        則回覆
                      </span>
                    </div>
                    <div
                      id={`flush-collapse${index}`}
                      className="accordion-collapse collapse rounded-2"
                      aria-labelledby={`flush-collapse${index}`}
                    >
                      <div className="accordion-body">
                        {replyCount[userComment.id] &&
                          replyCount[userComment.id].map((item) => (
                            <div className="tutor-content" key={item.id}>
                              <div className="d-flex mb-3">
                                <img
                                  className="tutor-image me-4"
                                  src={item.User.avatar_url}
                                  alt="留言回覆者頭像"
                                />
                                <div className="d-flex justify-content-between align-items-center flex-fill">
                                  <div className="f-column">
                                    <span className="tutor-name mb-2">
                                      {item.User.username}
                                    </span>
                                    <time className="comment-time fs-7">
                                      {formatDateToTaiwanStyle(item.createdAt)}
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
