import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import axios from "axios";

import Card from "../../../components/custom-course/Card";
import Timeline from "../../../components/custom-course/Timeline";
import ScrollBtn from "../../../components/custom-course/ScrollBtn";

const { VITE_API_BASE_3 } = import.meta.env;

export default function CustomCourseList() {
  const isMobile = window.innerWidth <= 576;

  const containerRef = useRef(null);

  // 返回上一頁
  const navigate = useNavigate();
  const toPrevPage = () => {
    navigate(-1);
  };

  // 前往新增需求頁面按鈕
  const toAddLearningNeedPage = () => {
    navigate("/add-learning-need");
  };

  // 取得課程資料函式
  const [customCourseList, setCustomCourseList] = useState([]);
  const getData = async () => {
    try {
      const result = await axios.get(`${VITE_API_BASE_3}/api/v1/custom-course`);

      setCustomCourseList(result.data);
    } catch (error) {
      console.log("錯誤", error);
    }
  };

  // 初始化 - 取得資料
  useEffect(() => {
    getData();
  }, []);

  // 初始化 - 背景圖片
  useEffect(() => {
    document.body.classList.add("bg-custom-course");

    return () => {
      document.body.classList.remove("bg-custom-course");
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Coding∞bit ｜ 客製化需求一覽</title>
      </Helmet>
      {/* header */}
      <header className="header-custom-course bg-white shadow-sm">
        <div className="container">
          <nav className="py-3">
            <div className="d-flex flex-column flex-lg-row align-items-lg-center flex-wrap position-relative pe-lg-10 row-gap-4">
              {/* 導覽 & 搜尋框 */}
              <div className="d-flex align-items-center">
                <ScrollBtn containerRef={containerRef} />
                <div className="searchInput pe-10">
                  <input
                    type="search"
                    name="courseSearch"
                    className="form-control search-course border-1 border-gray-03"
                    placeholder="搜尋課程需求"
                  />
                </div>
              </div>
              {/* 篩選器 */}
              <div className="d-flex column-gap-4 pe-6 order-lg-1 order-2 ms-lg-auto">
                <button className="btn status-btn text-brand-03 f-align-center">
                  <span className="material-symbols-outlined icon">
                    radio_button_unchecked
                  </span>
                  <span>已完成</span>
                </button>
                <button className="btn status-btn text-brand-03 f-align-center">
                  <span className="material-symbols-outlined icon icon-fill">
                    check_circle
                  </span>
                  <span>已回應</span>
                </button>
              </div>
              {/* 下拉霸 */}
              <div className="d-flex column-gap-4 pe-lg-6 order-lg-2 order-1">
                <div className="dropdown">
                  <button
                    className="btn btn-outline-brand-03 dropdown-toggle"
                    type="button"
                    id="sortDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    排序方式
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="sortDropdown">
                    <li>
                      <a className="dropdown-item" href="#">
                        遞減
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        遞增
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="dropdown">
                  <button
                    className="btn btn-outline-brand-03 dropdown-toggle"
                    type="button"
                    id="formatDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    選擇類別
                  </button>
                  <div
                    className="dropdown-menu p-0"
                    aria-labelledby="formatDropdown"
                    style={{ width: "250px" }}
                  >
                    <div className="px-3 py-2">
                      <input
                        type="text"
                        className="form-control form-control-sm mt-1"
                        id="tagSearch"
                        placeholder="搜尋標籤..."
                      />
                    </div>
                    <div className="tag-list-container">
                      <ul className="list-unstyled mb-0" id="tagList">
                        {/* 標籤項將由 JavaScript 動態生成 */}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* 回上一頁 */}
              <button
                className="position-absolute border-0 end-0 top-0 btn p-2"
                onClick={toPrevPage}
              >
                <span
                  className="material-symbols-outlined icon-fill"
                  style={{ width: "28px", height: "28px" }}
                >
                  {" "}
                  close{" "}
                </span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      <main className="main-content">
        {/* wish-pool*/}
        <section className="custom-course-wishPool">
          <div className="wishPool-container" ref={containerRef}>
            <div className="cards-container">
              {/* 客製化需求卡片動態生成 */}
              {isMobile ? (
                customCourseList.map((customCourse) => (
                  <Card key={customCourse.id} customCourse={customCourse} />
                ))
              ) : (
                <>
                  <div className="card_row">
                    {customCourseList
                      .filter((_, index) => index % 2 === 0)
                      .map((customCourse) => (
                        <Card
                          key={customCourse.id}
                          customCourse={customCourse}
                        />
                      ))}
                  </div>
                  <div className="card_row">
                    {customCourseList
                      .filter((_, index) => index % 2 !== 0)
                      .map((customCourse) => (
                        <Card key={customCourse.id} card={customCourse} />
                      ))}
                  </div>
                </>
              )}
            </div>
            <div className="timeline-container">
              {/* 時間點動態生成 */}
              <Timeline customCourseList={customCourseList} />
            </div>
          </div>
        </section>

        <section className="time-line mt-auto">
          <div className="bg-brand-01" style={{ height: "8px" }}></div>
        </section>
      </main>

      {/* footer-learning-needs */}
      <footer className="footer-learning-needs">
        <button className="footer-toggle" aria-label="切換顯示 Footer">
          <span className="material-symbols-outlined">expand_less</span>
        </button>
        <div className="container">
          <div className="banner">
            <div className="banner-text">
              <h1 className="title display-1">
                學習，
                <br />
                不再受侷限。
              </h1>
              <p className="subtitle text-brand-03">大膽提出你的學習需求</p>
            </div>
            <div className="d-flex flex-column align-items-center">
              <button
                className="add-button"
                aria-label="提出學習需求"
                onClick={toAddLearningNeedPage}
              >
                <span className="add-icon material-symbols-outlined icon-fill">
                  {" "}
                  add{" "}
                </span>
              </button>
              <span className="fs-md-5 fs-6 text-gray-02 d-block mt-2">
                提出學習需求
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* 學習需求卡片 Modal */}
      <div
        className="modal fade custom-modal"
        id="cardModal"
        tabIndex="-1"
        aria-labelledby="cardModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-fullscreen-sm-down">
          <div className="modal-content">
            <div className="modal-header px-4">
              <h5 className="modal-title" id="cardModalLabel"></h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="content-wrapper">
                {/* 左側欄：原需求、作者信息、標籤、照片 */}
                <div className="left-column col-md-6">
                  <div className="scrollable-content p-5">
                    <div className="d-flex align-items-center mb-3">
                      <img
                        id="modalAuthorAvatar"
                        src=""
                        alt="作者頭像"
                        className="rounded-circle me-2"
                        width="40"
                        height="40"
                      />
                      <h6 id="modalAuthorName" className="mb-0"></h6>
                    </div>
                    <p id="modalContent" className=""></p>
                    <div id="modalTags" className="mb-3"></div>
                    <small
                      id="modalDate"
                      className="text-muted d-block mb-3"
                    ></small>
                    <img
                      id="modalPhoto"
                      src=""
                      alt="相關照片"
                      className="img-fluid mb-3"
                    />
                  </div>

                  <div className="fixed-bottom-form">
                    <h6 className="mb-3">新增回應：</h6>
                    <form id="newResponseForm">
                      <div className="mb-3">
                        <textarea
                          className="form-control rounded-2"
                          rows="3"
                          placeholder="請輸入您的回應..."
                        ></textarea>
                      </div>
                      <div className="form-actions">
                        <button
                          type="submit"
                          className="btn btn-brand-03 rounded-2"
                        >
                          提交回應
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* 右側欄：回覆意見 */}
                <div className="right-column col-md-6">
                  <div className="scrollable-content p-5">
                    <h6 className="mb-3">回覆意見：</h6>
                    <div id="modalResponses" className="comments-container">
                      {/* 回覆將在這裡動態插入 */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 新增學習需求 Modal */}
      <div
        className="modal fade addLearning-modal"
        id="addLearningNeedModal"
        tabIndex="-1"
        aria-labelledby="addLearningNeedModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-fullscreen-sm-down modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header px-4">
              <h5 className="modal-title" id="addLearningNeedModalLabel">
                提出學習需求
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-4">
              <div className="row g-4">
                {/* 左側欄：表單 */}
                <div className="col-lg-7">
                  <form id="addLearningNeedForm">
                    <div className="mb-3">
                      <label htmlFor="learningNeedTitle" className="form-label">
                        標題
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-2"
                        id="learningNeedTitle"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="learningNeedCategory"
                        className="form-label"
                      >
                        類別
                      </label>
                      <select
                        className="form-select rounded-2"
                        id="learningNeedCategory"
                        required
                      >
                        <option value="">選擇類別</option>
                        <option value="HTML">HTML</option>
                        <option value="CSS">CSS</option>
                        <option value="JavaScript">JavaScript</option>
                        <option value="React">React</option>
                        <option value="Vue">Vue</option>
                        <option value="Angular">Angular</option>
                        <option value="其他">其他</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="learningNeedContent"
                        className="form-label"
                      >
                        內容
                      </label>
                      <textarea
                        className="form-control rounded-2"
                        id="learningNeedContent"
                        rows="5"
                        required
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="learningNeedTags" className="form-label">
                        標籤（用逗號分隔）
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-2"
                        id="learningNeedTags"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="learningNeedPhotoLinks"
                        className="form-label"
                      >
                        照片連結（每行一個連結）
                      </label>
                      <textarea
                        className="form-control rounded-2"
                        id="learningNeedPhotoLinks"
                        rows="4"
                        placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                      ></textarea>
                    </div>
                  </form>
                </div>
                {/* 右側欄：照片預覽 */}
                <div className="col-lg-5">
                  <div className="bg-light p-3 rounded">
                    <h6 className="mb-3">照片預覽：</h6>
                    <div
                      id="photoPreview"
                      className="d-flex flex-wrap gap-3 justify-content-center"
                    >
                      {/* 照片預覽將在這裡動態插入 */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary rounded-2"
                data-bs-dismiss="modal"
              >
                取消
              </button>
              <button
                type="button"
                className="btn btn-brand-03 rounded-2"
                id="submitLearningNeed"
              >
                提交學習需求
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
