import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate, NavLink, Link } from "react-router-dom";

import ReactQuill from "react-quill-new";

import courseApi from "../../../api/courseApi";

import TutorPanelMenu from "../../../components/layout/TutorPanelMenu";
import Loader from "../../../components/common/Loader";

export default function TutorManageEditTopicSeries() {
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
    toolbar: [[{ font: [] }], ["bold", "italic", "underline"], ["link", "image", "video"], [{ list: "ordered" }, { list: "bullet" }], [{ align: [] }], ["blockquote", "code-block"], ["clean"]],
  };

  const { id } = useParams();

  // 取得課程資料函式
  const [courseList, setCourseList] = useState({
    tags: [],
    tutor: {},
    descriptionList: [],
  });
  const [chapterVideos, setChapterVideos] = useState([]);
  const getCoursesData = async () => {
    setLoadingState(true);
    try {
      const videoDetailResult = await courseApi.getCourseDetail(id);
      const chapterVideosResult = await courseApi.getCourseChapters(id);
      setCourseList(videoDetailResult);
      setChapterVideos(chapterVideosResult);
    } catch (error) {
      console.log("錯誤", error);
    } finally {
      setLoadingState(false);
    }
  };

  // 初始化 - 取得資料
  useEffect(() => {
    getCoursesData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Coding∞bit ｜ 編輯課程影片</title>
      </Helmet>
      {loadingState && <Loader />}

      <TutorPanelMenu>
        <main className="tutor-edit-TopicSeriesCourses-wrap container-fluid">
          <h1 className="fs-4 fs-lg-2">編輯課程影片 - 課程基本資料</h1>

          <div className="row">
            <div className="col-lg-6">
              <div className="course-content-wrap card-column pe-10">
                <form className="mt-6 mt-lg-8">
                  <h4 className="fs-7 fw-normal text-gray-01 lh-base">圖片</h4>
                  <div className="image-upload-wrapper mt-1">
                    {!courseList.thumbnail && <input type="file" accept=".jpg,.jpeg,.png" className="form-control p-0" id="image" />}
                    <label htmlFor="image" className="form-label image-upload-label mb-0">
                      <span className="material-symbols-outlined mb-2">imagesmode</span>
                      上傳課程封面圖片
                    </label>

                    {/* 上傳圖片後的樣子 */}
                    {courseList.thumbnail && (
                      <button type="button" className="img-wrapper border-0 p-0">
                        <img src={courseList.thumbnail} alt="course-thumbnail" className="w-100 object-fit" />
                        <span className="material-symbols-outlined delete-icon">delete</span>
                      </button>
                    )}
                  </div>

                  <div className="mt-6 mt-lg-8">
                    <label htmlFor="title" className="form-label">
                      系列課程標題
                    </label>
                    <input type="text" className="form-control" id="title" placeholder="ex. React 進階開發技巧" />
                  </div>

                  <div className="mt-6 mt-lg-8">
                    <div className="row">
                      <div className="col">
                        <label className="form-label">瀏覽權限</label>
                        <div className="dropdown">
                          <button type="button" className="btn btn-outline-gray-03 border-1 dropdown-toggle d-block w-100 text-start px-4" data-bs-toggle="dropdown" aria-expanded="false">
                            {courseList.isPublic ? "公開" : "不公開"}
                            <span className="material-symbols-outlined position-absolute end-0 pe-3">keyboard_arrow_down</span>
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
                            {courseList.tech_stack}
                            <span className="material-symbols-outlined position-absolute end-0 pe-3">keyboard_arrow_down</span>
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
                    <input type="text" className="form-control" id="searchKeywords" placeholder="ex. React, 前端開發, 效能優化, Hooks" />
                  </div>

                  <div className="pb-8 mt-6 mt-lg-8">
                    <label htmlFor="content" className="form-label">
                      課程描述
                    </label>
                    <ReactQuill value={value} onChange={setValue} placeholder="請描述課程目標、課程大綱等內容，幫助學習者快速了解。" modules={modules} />
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
                      <NavLink to="" className="btn link-brand-03 border-0 d-inline-flex f-align-center p-0">
                        <span className="material-symbols-outlined me-1">edit</span>
                        編輯
                      </NavLink>
                      <button type="button" className="btn link-danger border-0 f-align-center p-0 mt-1">
                        <span className="material-symbols-outlined me-1">delete</span>
                        刪除
                      </button>
                    </div>
                  </li>
                  <li className="f-align-center dashed-border p-4 mt-2">
                    <p>第一章</p>
                    <Link to="/tutor-panel/course/video/topicSeries/add" className="btn btn-brand-03 f-align-center rounded-2 border-2 px-3 py-2 ms-auto">
                      <span className="material-symbols-outlined me-1">add</span>
                      新增章節影片
                    </Link>
                  </li>
                </ul>
                <button type="button" className="btn btn-outline-brand-03 f-align-center rounded-2 border-2 px-3 py-2 mt-4">
                  <span className="material-symbols-outlined me-1">add</span>
                  增加新章節
                </button>
              </div>
            </div>
          </div>

          {/*web button wrap */}
          <div className="btn-container text-end mt-auto">
            <button type="submit" className="btn btn-outline-brand-03 rounded-2 border-3" style={{ padding: "9px 24px" }} onClick={toPrevPage}>
              取消
            </button>
            <button type="submit" className="btn btn-brand-03 rounded-2 ms-4">
              確認修改
            </button>
          </div>
        </main>
      </TutorPanelMenu>
    </>
  );
}
