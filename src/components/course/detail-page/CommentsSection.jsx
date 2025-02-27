import PropTypes from "prop-types";
import ReactLonding from "react-loading";
import Swal from "sweetalert2";
import { z } from "zod";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDateToTaiwanStyle } from "@/utils/timeFormatted-utils";
import { countReplies, reduceComments } from "@/utils/countReplies-utils";
import { getUserData } from "@/utils/slice/authSlice";
import courseApi from "@/api/courseApi";

export default function CommentsSection({
  comments,
  videoId,
  disableInputComment,
}) {
  const [replyText, setReplyText] = useState(""); // 回覆輸入
  const [commentText, setCommentText] = useState(""); // 留言輸入
  const [userComments, setUserComments] = useState([]); // 留言
  const [replyCount, setReplyCount] = useState({}); // 回覆數
  const [showReplyBox, setShowReplyBox] = useState({}); // 是否顯示回覆輸入框
  const [isSending, setIsSending] = useState(false); // 是否留言中
  const [isRepling, setIsRepling] = useState(false); // 是否回覆中
  const [errors, setErrors] = useState({}); // 錯誤訊息
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userData);

  // 定義驗證模式
  const commentSchema = z.object({
    commentText: z.string().min(1, "留言不能為空"),
  });

  const replySchema = z.object({
    replyText: z.string().min(1, "回覆不能為空"),
  });

  const validateComment = (text) => {
    try {
      commentSchema.parse({ commentText: text });
      setErrors((prev) => ({ ...prev, commentText: null }));
      return true;
    } catch (error) {
      setErrors((prev) => ({ ...prev, commentText: error.errors[0].message }));
      return false;
    }
  };

  const validateReply = (text) => {
    try {
      replySchema.parse({ replyText: text });
      setErrors((prev) => ({ ...prev, replyText: null }));
      return true;
    } catch (error) {
      setErrors((prev) => ({ ...prev, replyText: error.errors[0].message }));
      return false;
    }
  };

  const deleteComment = async (commentId) => {
    Swal.fire({
      title: "確定要刪除嗎？",
      text: "刪除後有問題請洽管理人員",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "確定",
      cancelButtonText: "取消",
    })
      .then(async (result) => {
        await courseApi.deleteCourseComments(commentId);
        if (result.isConfirmed) {
          Swal.fire({
            title: "成功刪除",
            text: "已刪除留言",
            icon: "success",
          });
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(async () => {
        const reloadComments = await courseApi.getCourseComments(videoId);
        const { parentComments, childComments } =
          reduceComments(reloadComments);
        setUserComments(parentComments.reverse());
        setReplyCount(countReplies(childComments));
        setCommentText("");
        setIsSending(false);
      });
  };

  const replySwitch = async (commentId) => {
    setShowReplyBox((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const sendComment = async () => {
    if (
      validateComment(commentText) &&
      commentText.trim() !== "" &&
      !isSending
    ) {
      setIsSending(true);
      try {
        const data = {
          content: commentText,
          parent_id: null,
        };
        await courseApi.postCourseComments(videoId, data);
      } catch (error) {
        console.error(error);
      } finally {
        const reloadComments = await courseApi.getCourseComments(videoId);
        const { parentComments, childComments } =
          reduceComments(reloadComments);
        setUserComments(parentComments.reverse());
        setReplyCount(countReplies(childComments));
        setCommentText("");
        setIsSending(false);
      }
    }
  };

  const replyComment = async (commentId) => {
    if (validateReply(replyText) && replyText.trim() !== "" && !isRepling) {
      setIsRepling(true);
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
        const { parentComments, childComments } =
          reduceComments(reloadComments);
        setUserComments(parentComments.reverse());
        setReplyCount(countReplies(childComments));
        setReplyText("");
        setIsRepling(false);
        setShowReplyBox((prev) => ({
          ...prev,
          [commentId]: false,
        }));
      }
    }
  };

  useEffect(() => {
    if (comments && Array.isArray(comments)) {
      const { parentComments, childComments } = reduceComments(comments);
      setUserComments(parentComments.reverse());
      setReplyCount(countReplies(childComments));
    }
  }, [comments]);

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  return (
    <>
      {/* <Loader/> */}
      <section className="video-comments pt-6">
        <div className="d-flex align-items-center py-4 mb-6">
          <img
            className="user-comment-picture me-3"
            src={userInfo.avatar_url}
            alt="當前使用者頭像"
          />
          <input
            type="text"
            placeholder={disableInputComment ? "課程尚未開放" : "留言..."}
            name="user-comment"
            id="user-comment"
            className={`user-comment w-100 py-2 ${
              errors.commentText ? "input-error" : ""
            }`}
            style={{ cursor: disableInputComment ? "not-allowed" : "" }}
            disabled={disableInputComment}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />

          {!disableInputComment && (
            <div>
              {!isSending && (
                <i
                  className="bi bi-send fs-4 p-2 send-icon-color"
                  onClick={() => sendComment()}
                ></i>
              )}
              {isSending && (
                <div className="p-2">
                  <ReactLonding
                    type={"spin"}
                    color={"#645caa"}
                    height={"1.5rem"}
                    width={"1.5rem"}
                  />
                </div>
              )}
            </div>
          )}
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
                      onClick={() => replySwitch(userComment.id)}
                    >
                      回覆
                    </button>
                  )}
                </div>
              </div>
              <div className="reply">
                <p className="reply-style fs-6">{userComment.content}</p>
                {showReplyBox[userComment.id] && (
                  <div className="d-flex align-items-center py-2">
                    <input
                      type="text"
                      placeholder="回覆留言"
                      name="reply-comment"
                      id="reply-comment"
                      className={`w-100 reply-comment p-2 me-2 ${
                        errors.replyText ? "input-error" : ""
                      }`}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    />
                    <div>
                      {!isRepling && (
                        <i
                          className="bi bi-reply fs-4 p-2 reply-icon-color"
                          onClick={() => replyComment(userComment.id)}
                        ></i>
                      )}
                      {isRepling && (
                        <div className="p-2">
                          <ReactLonding
                            type={"spin"}
                            color={"#645caa"}
                            height={"1.5rem"}
                            width={"1.5rem"}
                          />
                        </div>
                      )}
                    </div>
                  </div>
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
                          data-bs-toggle="collapse"
                          data-bs-target={`#flush-collapse${index}`}
                          aria-expanded="false"
                          aria-controls={`flush-collapse${index}`}
                          className={`accordion-button mouse-pointer-style collapsed py-2 px-4 ${
                            replyCount[userComment.id] === undefined
                              ? "d-none"
                              : ""
                          }`}
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
                          {replyCount[userComment.id].map((item) => (
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
                                      {formatDateToTaiwanStyle(item.createdAt)}
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
  disableInputComment: PropTypes.bool,
};
