import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";

import ReactQuill from "react-quill-new";

import Loader from "../../../components/common/Loader";

export default function TutorManageAddVideo() {
  // loading
  const [loadingState, setLoadingState] = useState(false);

  // 返回上一頁
  const navigate = useNavigate();
  const toPrevPage = () => {
    navigate(-1);
  };

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

  // 依路由決定此頁顯示分類
  const { type } = useParams();

  const [videoSrc, setVideoSrc] = useState("");

  return (
    <>
      <Helmet>
        <title>Coding∞bit ｜ 新增課程影片</title>
      </Helmet>
      {loadingState && <Loader />}

      <main className="tutor-add-video-wrap container-fluid py-6 py-lg-0">
        <h1 className="fs-4 fs-lg-2">
          {type === "topicSeries" && "新增章節影片"}
          {type === "customLearning" && "新增課程影片 - 客製化學習需求"}
          {type === "freeTipShorts" && "新增課程影片 - 實用技術短影片"}
        </h1>

        <div className="row">
          <div className="col-xxl-6">
            <div className="mt-6 mt-lg-8 px-xl-11">
              <div className="video-upload-wrapper w-100 mt-1">
                {/* 隱藏的影片上傳 Input */}
                <input
                  type="file"
                  accept="video/mp4,video/webm,video/ogg"
                  className="form-control w-100 p-0"
                  id="video"
                />

                {/* 未上傳時的提示 */}
                {!videoSrc && (
                  <label
                    htmlFor="video"
                    className="form-label video-upload-label w-100 mb-0"
                  >
                    <span className="material-symbols-outlined mb-2">
                      video_file
                    </span>
                    上傳影片
                  </label>
                )}

                {/* 預覽上傳的影片 */}
                {videoSrc && (
                  <div className="video-preview">
                    <video src="" controls className="w-100"></video>
                    <button type="button" className="delete-icon">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                )}
              </div>
              <div className="bg-brand-05 rounded-4 mt-8 mt-lg-10 p-6 p-lg-8">
                <h2 className="fs-5 fs-lg-4 text-brand-03">影片上傳注意事項</h2>
                <ul className="py-4">
                  <li>
                    <p className="fs-6 mt-2">
                      1. 課程影片應以高畫質（HD）錄製並輸出，建議至少達到 720p
                      或 1080p 的解析度。
                    </p>
                  </li>
                  <li className="mt-4 mt-lg-5">
                    <p className="fs-6 mt-2">
                      2. 音訊需為立體聲（左右聲道），並與影片畫面完全同步。
                    </p>
                  </li>
                  <li className="mt-4 mt-lg-5">
                    <p className="fs-6 mt-2">
                      3.
                      音訊應保持清晰，避免回音和背景雜音，以確保學生能專注於學習內容。
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-xxl-6">
            <div className="course-content-wrap card-column pe-lg-10">
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
                    上傳影片縮圖
                  </label>

                  {/* 上傳圖片後的樣子 */}
                  <button
                    type="button"
                    className="img-wrapper border-0 p-0 d-none"
                  >
                    <img
                      src="images/course/course-4.png"
                      alt="course-thumbnail"
                      className="w-100 object-fit"
                    />
                    <span className="material-symbols-outlined delete-icon">
                      delete
                    </span>
                  </button>
                </div>

                <div className="mt-6 mt-lg-8">
                  <label htmlFor="title" className="form-label">
                    影片標題
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    placeholder="ex. React 進階開發技巧"
                  />
                </div>

                {type === "topicSeries" ? (
                  ""
                ) : (
                  <>
                    <div className="mt-6 mt-lg-8">
                      <div className="row">
                        <div className="col">
                          <label className="form-label">瀏覽權限</label>
                          <div className="dropdown">
                            <button
                              type="button"
                              className="btn btn-outline-gray-03 border-1 dropdown-toggle d-block w-100 text-start px-4"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              請選擇瀏覽權限
                              <span className="material-symbols-outlined position-absolute end-0 pe-3">
                                keyboard_arrow_down
                              </span>
                            </button>
                            <ul className="dropdown-menu w-100 mt-1">
                              <li>
                                <button type="button" className="dropdown-item">
                                  公開
                                </button>
                              </li>
                              <li>
                                <button type="button" className="dropdown-item">
                                  不公開
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
                  </>
                )}

                <div className="pb-8 mt-6 mt-lg-8">
                  <label htmlFor="content" className="form-label">
                    影片描述
                  </label>
                  <ReactQuill
                    value={value}
                    onChange={setValue}
                    placeholder="請描述影片教學內容，幫助學習者快速了解。"
                    modules={modules}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>

        {/*web button wrap */}
        <div className="btn-container text-end mt-auto">
          <button
            type="submit"
            className="btn btn-outline-brand-03 rounded-2 border-3"
            style={{ padding: "9px 24px" }}
            onClick={toPrevPage}
          >
            取消
          </button>
          <button type="submit" className="btn btn-brand-03 rounded-2 ms-4">
            確認新增
          </button>
        </div>
      </main>
    </>
  );
}
