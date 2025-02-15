import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import axios from "axios";

import courseApi from "../../../api/courseApi";

import Loader from "../../../components/common/Loader";
import Pagination from "../../../components/layout/Pagination";

const { VITE_API_BASE_2 } = import.meta.env;

export default function TutorManageCourses() {
  // loading
  const [loadingState, setLoadingState] = useState(true);

  const courseCategory = [
    {
      title: "主題式課程影片",
      category: "topicSeries",
    },
    {
      title: "客製化需求影片",
      category: "customLearning",
    },
    {
      title: "實用技術短影片",
      category: "freeTipShorts",
    },
  ];

  // 客製化課程區塊 Tab 切換邏輯
  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (event, index) => {
    event.preventDefault();
    setActiveTab(index);
  };

  // 篩選出跟當前講師同名的課程函式
  const filteredCourses = (courses, tutorResult) =>
    courses.filter((course) => {
      return course.tutor === tutorResult.data.name;
    });

  // 取得資料函式
  const [courses, setCourses] = useState({
    topicSeries: [],
    customLearning: [],
    freeTipShorts: [],
  });
  const getData = async () => {
    setLoadingState(true);
    try {
      const tutorResult = await axios.get(`${VITE_API_BASE_2}/api/v1/tutors/1`);
      const topicSeriesCourses = await courseApi.getCourses("topicSeries");
      const customLearningCourses = await courseApi.getCourses(
        "customLearning"
      );
      const freeTipShortsCourses = await courseApi.getCourses("freeTipShorts");

      setCourses((prevCourses) => ({
        ...prevCourses,
        topicSeries: filteredCourses(topicSeriesCourses, tutorResult),
        customLearning: filteredCourses(customLearningCourses, tutorResult),
        freeTipShorts: filteredCourses(freeTipShortsCourses, tutorResult),
      }));
    } catch (error) {
      console.log("錯誤", error);
    } finally {
      setLoadingState(false);
    }
  };

  // 初始化 - 取得資料
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Coding∞bit ｜ 課程影片管理</title>
      </Helmet>
      {loadingState && <Loader />}

      <main className="tutor-manage-course-list-wrap container-fluid">
        <div className="f-between">
          <div className="title">
            <h1 className="fs-4 fs-lg-2">課程影片管理</h1>
          </div>
          <div className="dropdown">
            <button
              className="btn btn btn-brand-03 rounded-2 dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              建立新的影片
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end mt-2"
              aria-labelledby="dropdownMenuButton1"
            >
              <li>
                <Link
                  to="/tutor-panel/course/topicSeries/add"
                  className="dropdown-item"
                >
                  建立主題式課程影片
                </Link>
              </li>
              <li>
                <Link
                  to="/tutor-panel/course/video/customLearning/add"
                  className="dropdown-item"
                >
                  建立客製化需求影片
                </Link>
              </li>
              <li>
                <Link
                  to="/tutor-panel/course/video/freeTipShorts/add"
                  className="dropdown-item"
                >
                  建立實用技術短影片
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 篩選與搜尋 */}
        <div className="f-end-center mt-10">
          <div className="dropdown">
            <button
              type="button"
              className="btn btn-outline-gray-03 border-1 dropdown-toggle px-11"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              排序方式
              <span className="material-symbols-outlined position-absolute end-0 pe-3">
                keyboard_arrow_down
              </span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end mt-1">
              <li>
                <button type="button" className="dropdown-item">
                  名稱
                </button>
              </li>
              <li>
                <button type="button" className="dropdown-item">
                  新增日期
                </button>
              </li>
            </ul>
          </div>
          <div className="position-relative f-align-center ms-2">
            <input
              type="text"
              className="form-control ps-11"
              placeholder="搜尋課程"
            />
            <span
              className="material-symbols-outlined text-gray-03 position-absolute ps-4"
              style={{ width: "20px", height: "20px" }}
            >
              search
            </span>
          </div>
        </div>

        {/* 影片列表 */}
        <ul
          className="nav nav-tabs border-bottom border-gray-03 mt-4"
          id="courseCategoryTab"
          role="tablist"
        >
          {courseCategory.map((item, index) => (
            <li className="nav-item" role="presentation" key={index}>
              <button
                className={`nav-link fs-7 fs-lg-6 p-2 py-lg-3 px-lg-4 ${
                  index === activeTab && "active"
                }`}
                id={`${item.category}-tab`}
                data-bs-toggle="tab"
                data-bs-target={`#${item.category}`}
                type="button"
                role="tab"
                aria-controls={item.category}
                aria-selected="true"
                onClick={handleTabClick}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
        <div className="tab-content" id="courseCategoryTab">
          {courseCategory.map((item, index) => (
            <div
              className={`tab-pane ${
                index === activeTab ? "active show" : "fade"
              }`}
              id={item.category}
              role="tabpanel"
              aria-labelledby={`${item.category}-tab`}
              key={index}
            >
              <div className="mt-6 mt-lg-8">
                <table className="table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>
                        {item.category === "topicSeries"
                          ? "課程名稱"
                          : "影片名稱"}
                      </th>
                      <th>類別</th>
                      <th>瀏覽權限</th>
                      <th>上傳日期</th>
                      <th>觀看數</th>
                      <th>評價</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  {item.category === "topicSeries" &&
                    courses.topicSeries.map((course) => (
                      <tbody key={course.id}>
                        <tr className="align-middle">
                          <td>
                            <img src={course.thumbnail} alt="course-image" />
                          </td>
                          <td>{course.title}</td>
                          <td>{course.tag}</td>
                          <td>{course.isPublic ? "公開" : "未公開"}</td>
                          <td>2024年12月1日</td>
                          <td>{Number(course.view_count).toLocaleString()}</td>
                          <td>{course.rating}</td>
                          <td>
                            <div>
                              <NavLink
                                to={`/tutor-panel/course/topicSeries/${course.id}/chapter`}
                                className="btn link-brand-03 border-0 d-inline-flex f-align-center p-0"
                              >
                                <span className="material-symbols-outlined me-1">
                                  dataset
                                </span>
                                詳細
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
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  {item.category === "customLearning" &&
                    courses.customLearning.map((course) => (
                      <tbody key={course.id}>
                        <tr className="align-middle">
                          <td>
                            <img src={course.thumbnail} alt="course-image" />
                          </td>
                          <td>{course.title}</td>
                          <td>{course.tag}</td>
                          <td>{course.isPublic ? "公開" : "未公開"}</td>
                          <td>2024年12月1日</td>
                          <td>{Number(course.view_count).toLocaleString()}</td>
                          <td>{course.rating}</td>
                          <td>
                            <div>
                              <NavLink
                                to={`/tutor-panel/course/${course.id}/edit`}
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
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  {item.category === "freeTipShorts" &&
                    courses.freeTipShorts.map((course) => (
                      <tbody key={course.id}>
                        <tr className="align-middle">
                          <td>
                            <img src={course.thumbnail} alt="course-image" />
                          </td>
                          <td>{course.title}</td>
                          <td>{course.tag}</td>
                          <td>{course.isPublic ? "公開" : "未公開"}</td>
                          <td>2024年12月1日</td>
                          <td>{Number(course.view_count).toLocaleString()}</td>
                          <td>{course.rating}</td>
                          <td>
                            <div>
                              <NavLink
                                to={`/tutor-panel/course/${course.id}/edit`}
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
                          </td>
                        </tr>
                      </tbody>
                    ))}
                </table>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 頁碼 */}
      <div className="position-absolute end-0 bottom-0 pe-6 pb-6">
        <Pagination />
      </div>
    </>
  );
}
