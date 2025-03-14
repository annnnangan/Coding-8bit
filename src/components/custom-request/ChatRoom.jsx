import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";
import Swal from "sweetalert2";
import * as bootstrap from "bootstrap";

import customRequestsApi from "@/api/customRequestsApi";

export default function ChatRoom({ username }) {
  // loading (區域)
  const [placeLoadingState, setPlaceLoadingState] = useState(false);

  const navigate = useNavigate();

  // 與機器人問答
  const [answer, setAnswer] = useState(`你好，我是 ${username}`);
  const [userResponses, setUserResponses] = useState([]);
  const [botResponses, setBotResponses] = useState([]);
  const postAnswer = async () => {
    if (!answer.trim()) return;

    // 紀錄使用者回應內容
    setUserResponses((prev) => [
      ...prev,
      { id: userResponses.length + 1, userResponse: answer },
    ]);

    // 清空輸入欄
    setAnswer("");

    try {
      setPlaceLoadingState(true);

      let sessionId = localStorage.getItem("chatSessionId");
      if (!sessionId) {
        sessionId = crypto.randomUUID();
        localStorage.setItem("chatSessionId", sessionId);
      }

      // 發送 API 請求
      const response = await customRequestsApi.postChat({
        message: answer,
        sessionId: sessionId,
      });
      console.log(response);

      if (response.function_call && response.function_call.result.is_complete) {
        const { title, tag, level, content, category } =
          response.function_call.result.data;

        await customRequestsApi.addCustomRequest({
          title,
          tag,
          level,
          content,
          category,
        });

        Swal.fire({
          icon: "success",
          title: "新增成功",
        });

        // 關閉畫布
        const offCanvasElement = document.getElementById("offcanvasRight");
        const bsOffcanvas = bootstrap.Offcanvas.getInstance(offCanvasElement);
        bsOffcanvas.hide();

        navigate("/custom-requests-list");
      }

      // 紀錄機器人回應內容
      setBotResponses((prev) => [
        ...prev,
        { id: botResponses.length + 1, botResponse: response.response },
      ]);
    } catch (error) {
      console.error("請求失敗:", error);
    } finally {
      setPlaceLoadingState(false);
    }
  };

  // 輸入框狀態更新
  const handleAnswer = (e) => {
    setAnswer(e.target.value);
  };

  // 合併使用者與機器人的回應，然後按順序交替顯示
  const combinedResponses = [
    ...userResponses.map((res) => ({ ...res, type: "user" })),
    ...botResponses.map((res) => ({ ...res, type: "bot" })),
  ];
  const sortedResponses = combinedResponses.sort((a, b) => a.id - b.id);

  // 每次留言滾到最底邏輯
  const endOfMessagesRef = useRef(null);
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [sortedResponses]); // 每次 sortedResponses 更新就滾動

  // 畫布一旦顯示出來就執行聊天機器人
  const [hasExecuted, setHasExecuted] = useState(false);
  const offCanvasRef = useRef(null);

  const handleOpen = async () => {
    if (username) {
      await postAnswer();
      setHasExecuted(true);
    }
  };   

  useEffect(() => {
    const offCanvasElement = offCanvasRef.current;

    const handleShowEvent = async () => {
      if (!hasExecuted) {
        await handleOpen()
      }
    };

    if (offCanvasElement) {
      offCanvasElement.addEventListener("shown.bs.offcanvas", handleShowEvent);
    }

    return () => {
      if (offCanvasElement) {
        offCanvasElement.removeEventListener(
          "shown.bs.offcanvas",
          handleShowEvent
        );
      }
    };
  }, [hasExecuted]);

  return (
    <div
      ref={offCanvasRef}
      className="chat-room offcanvas offcanvas-end"
      tabIndex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <h4 id="offcanvasRightLabel" className="room-title">
          建立需求小幫手
        </h4>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body position-relative px-4 px-lg-8">
        {/* <div className="d-flex align-items-center pe-8">
          <div className="flex-shrink-0 align-self-start">
            <img
              src="images/deco/robot-avatar.svg"
              alt="user-image"
              className="user-page-header-img rounded-circle"
            />
          </div>
          <ul className="flex-grow-1 ms-4 ms-lg-6">
            <li className="bg-white rounded-5 py-3 px-5 mb-6 mb-lg-8">
              <p className="fs-7 fs-lg-6">
                哈囉你好^_^
                我是建立需求小幫手~請在輸入框輸入內容與我開始進行對話。
              </p>
            </li>
          </ul>
        </div> */}

        {sortedResponses.map((res, index) => (
          <div
            className={`d-flex align-items-center ${
              res.type === "user" ? "f-end-center" : "pe-8"
            }`}
            key={index}
          >
            <div className="flex-shrink-0 align-self-start">
              {res.type === "bot" && (
                <img
                  src="images/deco/robot-avatar.svg"
                  alt="user-image"
                  className="user-page-header-img rounded-circle"
                />
              )}
            </div>
            <div ref={endOfMessagesRef} />
            <ul
              className={`flex-grow-1 ms-4 ms-lg-6 ${
                res.type === "user" ? "text-end" : ""
              }`}
            >
              <li
                className={`${
                  res.type === "user"
                    ? "bg-brand-02 d-inline-block text-start"
                    : "bg-white"
                } rounded-5 py-3 px-5 mb-6 mb-lg-8`}
              >
                <p className="fs-7 fs-lg-6">
                  {res.type === "user" ? res.userResponse : res.botResponse}
                </p>
              </li>
            </ul>
          </div>
        ))}
        {placeLoadingState && (
          <div className="f-align-center">
            <span
              className="spinner-grow spinner-grow-sm text-brand-01"
              role="status"
              aria-hidden="true"
            ></span>
            <p className="text-brand-01 ms-2">Loading...</p>
          </div>
        )}
      </div>

      {/* 回答輸入框 */}
      <div className="offcanvas-footer bg-white shadow position-absolute bottom-0 f-align-center px-3 px-lg-8 py-4 py-lg-6 w-100 ">
        <input
          type="text"
          className="form-control"
          id="answer"
          name="answer"
          value={answer}
          onChange={handleAnswer}
        />
        <button
          type="button"
          className="btn btn-brand-03 lh-lg py-2 ms-2 ms-md-6"
          onClick={postAnswer}
        >
          發送
        </button>
      </div>

      {/* 回答選項框 */}
      <div className="offcanvas-footer bg-white shadow position-absolute bottom-0 px-3 px-lg-8 py-4 py-lg-6 w-100 d-none">
        <button
          type="button"
          className="btn btn-outline-gray-03 text-gray-01 w-100"
        >
          想獲得新知識
        </button>
        <button
          type="button"
          className="btn btn-outline-gray-03 text-gray-01 w-100 mt-4"
        >
          遇到小問題卡關了
        </button>
      </div>
    </div>
  );
}
ChatRoom.propTypes = {
  username: PropTypes.string.isRequired,
};
