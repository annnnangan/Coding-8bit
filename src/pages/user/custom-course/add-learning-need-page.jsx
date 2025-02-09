import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

import ReactQuill from "react-quill-new";

import AddLearningNeedRobot from "../../../components/custom-course/addLearningNeedRobot";
import ChatRoom from "../../../components/custom-course/ChatRoom";

export default function AddLearningNeedPage() {
  // ReactQuill 文字編輯器
  const [value, setValue] = useState("");
  const modules = {
    toolbar: [
      [{ font: [] }],
      ["bold", "italic", "underline"],
      ["link", "image", "video"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["blockquote", "code-block"],
      ["clean"],
    ],
  };

  // 返回上一頁
  const navigate = useNavigate();
  const toPrevPage = () => {
    navigate(-1)
  }

  return (
    <>
      <Helmet>
        <title>Coding∞bit ｜ 新增客製化需求</title>
      </Helmet>
      <AddLearningNeedRobot />

      <div className="add-learning-need-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="guide-wrap">
                <div className="guide-text-wrap p-0 p-sm-8">
                  <h2>學習需求是什麼？</h2>
                  <div className="mt-4 mt-lg-6">
                    <p className="fs-7">
                      不曉得您在程式學習上有沒有遇到以下情況：
                    </p>
                    <ul className="disc-list-style ps-5 py-4 py-lg-5">
                      <li>
                        <h3>
                          只是想學習一個小知識點，卻找不到適合的教學，網路上的知識雜七雜八，沒有一個是真正符合需求的。
                        </h3>
                      </li>
                      <li className="mt-5">
                        <h3>
                          學習到一半突然遇上一個小bug，卻不知道如何解決，需要有人手把手引導。
                        </h3>
                      </li>
                    </ul>
                    <p className="fs-7">
                      這些情況，就適合提出客製化學習需求！只要在本頁面描述您的情況並填寫相關資訊，發表學習需求，就有機會獲得專屬解答。
                    </p>
                  </div>
                  <div className="divider-label-brand-02 d-flex align-items-center py-2 py-lg-4">
                    <hr />
                  </div>
                  <h2>該怎麼描述我的需求？</h2>
                  <ul className="py-5">
                    <li>
                      <h3>1. 在標題寫上您使用的程式語言，並簡述您的學習需求</h3>
                      <p className="fs-7 ps-5 mt-2">
                        開頭寫上程式語言，再用簡短的一句話說明您希望解決的問題或達成的目標。
                      </p>
                    </li>
                    <li className="mt-4 mt-lg-5">
                      <h3>2. 選擇背景資訊</h3>
                      <p className="fs-7 ps-5 mt-2">
                        我們提供了幾個下拉式選單，請選擇符合自己情況的選項，讓大家更了解您的狀況，能回答得更加精準。
                      </p>
                    </li>
                    <li className="mt-4 mt-lg-5">
                      <h3>3. 填入關鍵字</h3>
                      <p className="fs-7 ps-5 mt-2">
                        填寫幾個關鍵字，讓大家更容易看見這個需求。關鍵字與關鍵字之間請以半形逗號隔開。
                      </p>
                    </li>
                    <li className="mt-4 mt-lg-5">
                      <h3>4. 描述您的學習需求</h3>
                      <p className="fs-7 ps-5 mt-2">
                        請明確描述您想學習怎麼樣的小知識 /
                        想解決什麼問題，以成果為導向。
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="openRobot-button-wrap bg-brand-02 position-relative">
                  <img
                    src="images/deco/addLearningNeedBot.svg"
                    alt="addLearningNeedBot-icon"
                    className="position-absolute"
                  />
                  <div>
                    <h3 className="text-brand-03 fw-medium">
                      還是不太清楚該怎麼填寫？
                    </h3>
                    <button
                      type="button"
                      className="btn btn-outline-none text-brand-03 fs-7 fs-lg-6 fw-bold slide-right-hover d-inline-flex f-align-center px-0 py-3"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasRight"
                      aria-controls="offcanvasRight"
                    >
                      點我開啟建立需求小幫手
                      <span className="material-symbols-outlined icon-fill fs-5 ms-1">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="learning-need-form-wrap card-column">
                <h1>提出您的學習需求</h1>
                <form className="mt-6 mt-lg-8">
                  <h4 className="fs-7 fw-normal text-gray-01 lh-base">圖片</h4>
                  <div className="image-upload-wrapper mt-1">
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      className="form-control p-0"
                      id="image"
                    />
                    <label
                      htmlFor="image"
                      className="form-label image-upload-label mb-0"
                    >
                      <span className="material-symbols-outlined mb-2">
                        imagesmode
                      </span>
                      請上傳圖片，讓其他人更容易理解您的需求
                    </label>

                    {/* 上傳圖片後的樣子 */}
                    <button type="button" className="img-wrapper border-0 p-0 d-none">
                      <img
                        src="images/course/course-4.png"
                        alt="learning-need-image"
                        className="w-100 object-fit"
                      />
                      <span className="material-symbols-outlined delete-icon">
                        delete
                      </span>
                    </button>
                  </div>

                  <div className="mt-6 mt-lg-8">
                    <label htmlFor="title" className="form-label">
                      學習需求標題
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      placeholder="ex. CSS 毛玻璃製作效果"
                    />
                  </div>

                  <div className="mt-6 mt-lg-8">
                    <div className="row">
                      <div className="col">
                        <label className="form-label">程式語言類別</label>
                        <div className="dropdown">
                          <button
                            type="button"
                            className="btn btn-outline-gray-03 border-1 dropdown-toggle d-block w-100 text-start px-4"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            請選擇類別
                            <span className="material-symbols-outlined position-absolute end-0 pe-3">
                              keyboard_arrow_down
                            </span>
                          </button>
                          <ul className="dropdown-menu w-100 mt-1">
                            <li>
                              <button type="button" className="dropdown-item">
                                前端語言
                              </button>
                            </li>
                            <li>
                              <button type="button" className="dropdown-item">
                                後端語言
                              </button>
                            </li>
                            <li>
                              <button type="button" className="dropdown-item">
                                全端語言
                              </button>
                            </li>
                            <li>
                              <button type="button" className="dropdown-item">
                                其他
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="col">
                        <label className="form-label" htmlFor="tech_stack">
                          開發工具與語言
                        </label>
                        <div className="dropdown">
                          <button
                            type="button"
                            className="btn btn-outline-gray-03 border-1 dropdown-toggle d-block w-100 text-start px-4 position-relative"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            請選擇類別
                            <span className="material-symbols-outlined position-absolute end-0 pe-3">
                              keyboard_arrow_down
                            </span>
                          </button>
                          <ul className="dropdown-menu w-100 mt-1">
                            <li>
                              <button type="button" className="dropdown-item">
                                Html
                              </button>
                            </li>
                            <li>
                              <button type="button" className="dropdown-item">
                                CSS
                              </button>
                            </li>
                            <li>
                              <button type="button" className="dropdown-item">
                                JavaScript
                              </button>
                            </li>
                            <li>
                              <button type="button" className="dropdown-item">
                                React
                              </button>
                            </li>
                            <li>
                              <button type="button" className="dropdown-item">
                                Vue
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 mt-lg-8">
                    <label className="form-label" htmlFor="level">
                      您的學習等級
                    </label>
                    <div className="dropdown">
                      <button
                        type="button"
                        className="btn btn-outline-gray-03 border-1 dropdown-toggle d-block w-100 text-start px-4"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        請選擇學習等級
                        <span className="material-symbols-outlined position-absolute end-0 pe-3">
                          keyboard_arrow_down
                        </span>
                      </button>
                      <ul className="dropdown-menu w-100 mt-1">
                        <li>
                          <button type="button" className="dropdown-item">
                            Lv.1 - 什麼都不會的小萌新
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 mt-lg-8">
                    <label htmlFor="searchKeywords" className="form-label">
                      關鍵字 (請用半型逗號隔開)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="searchKeywords"
                      placeholder="ex. React, 前端開發, 效能優化, Hooks"
                    />
                  </div>

                  <div className="pb-8 mt-6 mt-lg-8">
                    <label htmlFor="content" className="form-label">
                      學習需求描述
                    </label>
                    <ReactQuill
                      value={value}
                      onChange={setValue}
                      placeholder="請描述您的學習需求"
                      modules={modules}
                    />
                  </div>
                </form>

                {/*web button wrap */}
                <div className="btn-container text-end mt-auto d-none d-lg-block">
                  <button
                    type="submit"
                    className="btn btn-outline-brand-03 border-3 w-25"
                    style={{ padding: "9px 24px" }}
                    onClick={toPrevPage}
                  >
                    取消
                  </button>
                  <button type="submit" className="btn btn-brand-03 ms-4">
                    提出學習需求
                  </button>
                </div>

                {/* media button wrap */}
                <div className="text-end fixed-bottom bg-white shadow d-lg-none py-4">
                  <div className="container">
                    <div className="d-flex">
                      <button
                        type="submit"
                        className="btn btn-outline-brand-03 w-100"
                        onClick={toPrevPage}
                      >
                        取消
                      </button>
                      <button
                        type="submit"
                        className="btn btn-brand-03 w-100 ms-4"
                      >
                        提出學習需求
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 聊天室 */}
      <ChatRoom />
    </>
  );
}
