import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, NavLink } from "react-router-dom";

import ReactQuill from "react-quill-new";

import BackendPanelMenu from "../../../components/layout/BackendPanelMenu";
import Loader from "../../../components/common/Loader";

export default function TutorAddTopicSeriesCourses() {
  // loading
  const [loadingState, setLoadingState] = useState(false);

  const menuItems = [
    {
      icon: "video_settings",
      name: "課程影片管理",
      href: "/tutor-panel/course",
    },
    {
      icon: "event",
      name: "預約管理",
      href: "/tutor-panel/booking",
    },
    {
      icon: "auto_stories",
      name: "學習需求管理",
      href: "/tutor-panel/learning",
    },
    {
      icon: "equalizer",
      name: "數據與趨勢",
      href: "/tutor-panel/statistics",
    },
    {
      icon: "notifications_active",
      name: "個人化通知",
      href: "/tutor-panel/notification",
    },
    {
      icon: "person",
      name: "個人資料管理",
      href: "/tutor-panel/profile",
    },
    {
      icon: "paid",
      name: "財務管理",
      href: "/tutor-panel/finance",
    },
  ];

  const user = {
    avatar:
      "https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "卡斯伯Casper",
  };

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

  return (
    <>
      <Helmet>
        <title>Coding∞bit ｜ 新增課程影片</title>
      </Helmet>
      {loadingState && <Loader />}

      <div className="d-flex">
        <BackendPanelMenu menuItems={menuItems} type="tutor" user={user}>
          {""}
        </BackendPanelMenu>

        <main className="tutor-add-TopicSeriesCourses-wrap container-fluid p-9">
          <h1 className="fs-4 fs-lg-2">新增課程影片 - 課程基本資料</h1>

          <div className="row">
            <div className="col-lg-6">
              <div className="course-content-wrap card-column pe-10">
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
                      上傳課程封面圖片
                    </label>

                    {/* 上傳圖片後的樣子 */}
                    <button
                      type="button"
                      className="img-wrapper border-0 p-0 d-none"
                    >
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
                      系列課程標題
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      placeholder="ex. React 進階開發技巧"
                    />
                  </div>

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

                  <div className="pb-8 mt-6 mt-lg-8">
                    <label htmlFor="content" className="form-label">
                      課程描述
                    </label>
                    <ReactQuill
                      value={value}
                      onChange={setValue}
                      placeholder="請描述課程目標、課程大綱等內容，幫助學習者快速了解。"
                      modules={modules}
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="mt-6 mt-lg-8 px-6">
                <label htmlFor="chapter" className="form-label">
                  課程章節
                </label>
                <ul className="chapter-wrap">
                  <li className="f-between-center bg-brand-02 p-4">
                    <p>課程介紹</p>
                    <div className="f-align-center">
                      <img src="images/course/course-4.png" alt="course-image" />
                      <p className="ms-4">React Hooks 深入解析</p>
                    </div>
                    <div className="pe-3 ps-10">
                      <NavLink
                        to=""
                        className="btn link-brand-03 border-0 d-inline-flex f-align-center p-0"
                      >
                        <span className="material-symbols-outlined me-1">
                          edit
                        </span>
                        編輯
                      </NavLink>
                      <button
                        type="button"
                        className="btn link-danger border-0 f-align-center p-0 mt-1"
                      >
                        <span className="material-symbols-outlined me-1">
                          delete
                        </span>
                        刪除
                      </button>
                    </div>
                  </li>
                  <li className="f-align-center dashed-border p-4 mt-2">
                    <p>第一章</p>
                    <button
                      type="button"
                      className="btn btn-brand-03 f-align-center rounded-2 border-2 px-3 py-2 ms-auto"
                    >
                      <span className="material-symbols-outlined me-1">
                        add
                      </span>
                      新增章節影片
                    </button>
                  </li>
                </ul>
                <button
                  type="button"
                  className="btn btn-outline-brand-03 f-align-center rounded-2 border-2 px-3 py-2 mt-4"
                >
                  <span className="material-symbols-outlined me-1">add</span>
                  增加新章節
                </button>
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
      </div>
    </>
  );
}
