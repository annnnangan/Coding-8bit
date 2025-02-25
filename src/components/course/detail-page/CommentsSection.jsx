import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { formatDateToTaiwanStyle } from "../../../utils/timeFormatted-utils";
import { countReplies } from "../../../utils/countReplies-utils";
import userApi from "../../../api/userApi";
import courseApi from "../../../api/courseApi";

export default function CommentsSection({ comments, videoId }) {
  const [userComments, setUserComments] = useState([]);
  const [replyCount, setReplyCount] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [commentText, setCommentText] = useState("");
  const [hasParent, setHasParent] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [showReplyBox, setShowReplyBox] = useState({});

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      try {
        const data = {
          content: commentText,
          parent_id: hasParent,
        };
        await courseApi.postCourseComments(videoId, data);
      } catch (error) {
        console.error(error);
      } finally {
        const reloadComments = await courseApi.getCourseComments(videoId);
        setUserComments(reloadComments.data.reverse());
        setCommentText("");
      }
    }
  };
  const deleteComment = async (commentId) => {
    try {
      await courseApi.deleteCourseComments(commentId);
    } catch (error) {
      console.error(error);
    } finally {
      const reloadComments = await courseApi.getCourseComments(videoId);
      console.log(reloadComments);

      const reduceComments = (data) => {
        const { parentComments, childComments } = data.reduce(
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

      if (reloadComments && Array.isArray(reloadComments.data)) {
        const { parentComments, childComments } = reduceComments(
          reloadComments.data
        );
        setUserComments(parentComments.reverse());
        setReplyCount(countReplies(childComments));
      }
    }
  };

  const replyComment = async (commentId) => {
    console.log(commentId);

    setShowReplyBox((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const handleReplyKeyDown = async (event, commentId) => {
    if (event.key === "Enter" && replyText.trim() !== "") {
      event.preventDefault();
      try {
        const data = {
          content: replyText,
          parent_id: commentId,
        };
        await courseApi.postCourseComments(videoId, data);
      } catch (error) {
        console.error(error);
      } finally {
        const reloadComments = await courseApi.getCourseComments(videoId);
        const reduceComments = (data) => {
          const { parentComments, childComments } = data.reduce(
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

        if (reloadComments && Array.isArray(reloadComments.data)) {
          const { parentComments, childComments } = reduceComments(
            reloadComments.data
          );
          setUserComments(parentComments.reverse());
          setReplyCount(countReplies(childComments));
        }

        setReplyText("");
        setShowReplyBox((prev) => ({
          ...prev,
          [commentId]: false,
        }));
      }
    }
  };

  useEffect(() => {
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
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={handleKeyDown}
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
                  {userComment.user_id == userInfo.id ? (
                    <button
                      type="button"
                      className="btn btn-outline-none fs-7 py-2 px-4 rounded-2 delete-comment"
                      onClick={() => deleteComment(userComment.id)}
                    >
                      刪除
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-outline-none fs-7 py-2 px-4 rounded-2 delete-comment"
                      onClick={() => replyComment(userComment.id)}
                    >
                      回覆
                    </button>
                  )}
                </div>
              </div>
              <div className="reply">
                <p className="reply-style fs-6">{userComment.content}</p>
                {showReplyBox[userComment.id] && (
                  <input
                    type="text"
                    placeholder="回覆留言"
                    name="reply-comment"
                    id="reply-comment"
                    className="w-100 reply-comment p-2 mt-2"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyDown={(e) => handleReplyKeyDown(e, userComment.id)}
                  />
                )}
                {replyCount[userComment.id] ? (
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
                            : ""}{" "}
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
                              <div className="tutor-content mb-6" key={item.id}>
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
                                        {formatDateToTaiwanStyle(
                                          item.createdAt
                                        )}
                                      </time>
                                    </div>
                                    {item.user_id == userInfo.id ? (
                                      <button
                                        type="button"
                                        className="btn btn-outline-none fs-7 py-2 px-4 rounded-2 reply-comment"
                                        onClick={() => deleteComment(item.id)}
                                      >
                                        刪除
                                      </button>
                                    ) : (
                                      <></>
                                    )}
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
                ) : (
                  <></>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
CommentsSection.propTypes = {
  comments: PropTypes.array,
  videoId: PropTypes.string,
};
