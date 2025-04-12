import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";

import Swal from "sweetalert2";

import userApi from "@/api/userApi";
import courseApi from "@/api/courseApi";

import TopicSeriesList from "@/components/tutor-panel/course/course-list/TopicSeriesList";
import CustomLearningList from "@/components/tutor-panel/course/course-list/CustomLearningList";
import FreeTipShortsList from "@/components/tutor-panel/course/course-list/FreeTipShortsList";
import Pagination from "@/components/layout/Pagination";
import Loader from "@/components/common/Loader";

export default function TutorManageCourses() {
  // loading
  const [loadingState, setLoadingState] = useState(true);

  // auth
  const { isAuth } = useSelector((state) => state.auth);

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

  // 取得資料函式
  const [courses, setCourses] = useState({
    topicSeries: [],
    customLearning: [],
    freeTipShorts: [],
  });
  const [pageData, setPageData] = useState({
    topicSeries: {},
    customLearning: {},
    freeTipShorts: {},
  });
  const getData = async (category, page = 1) => {
    setLoadingState(true);
    try {
      const { tutor_id } = await userApi.getUserData();
      let newData = {};

      if (category === "topicSeries") {
        const topicSeriesCourses = await courseApi.getTutorCourses(
          tutor_id,
          page
        );
        newData = {
          courses: topicSeriesCourses.courses,
          pagination: topicSeriesCourses.pagination,
        };
      } else if (category === "customLearning") {
        const customLearningCourses = await courseApi.getTutorVideos(
          tutor_id,
          "customLearning",
          page
        );
        newData = {
          courses: customLearningCourses.videos,
          pagination: customLearningCourses.pagination,
        };
      } else if (category === "freeTipShorts") {
        const freeTipShortsCourses = await courseApi.getTutorVideos(
          tutor_id,
          "freeTipShorts",
          page
        );
        newData = {
          courses: freeTipShortsCourses.videos,
          pagination: freeTipShortsCourses.pagination,
        };
      }

      setCourses((prevCourses) => ({
        ...prevCourses,
        [category]: newData.courses,
      }));

      setPageData((prevPageData) => ({
        ...prevPageData,
        [category]: newData.pagination,
      }));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "取得資料失敗",
        text: error.response?.data?.message || "發生錯誤，請稍後再試",
      });
    } finally {
      setLoadingState(false);
    }
  };

  // 刪除課程
  const deleteCourse = async (course_id, type) => {
    Swal.fire({
      title: "確定要刪除嗎？",
      showCancelButton: true,
      confirmButtonText: "刪除",
      denyButtonText: "不要刪除",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoadingState(true);
        try {
          if (type === "topicSeries") {
            await courseApi.deleteCourse(course_id);
          } else {
            await courseApi.deleteVideo(course_id);
          }
          Swal.fire({
            icon: "success",
            title: "刪除成功",
          });
          if (type === "topicSeries") {
            getData("topicSeries");
          } else if (type === "customLearning") {
            getData("customLearning");
          } else {
            getData("freeTipShorts");
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: error.response?.data?.message,
          });
        } finally {
          setLoadingState(false);
        }
      }
    });
  };

  // 初始化 - 取得資料
  useEffect(() => {
    if (isAuth) {
      getData("topicSeries");
      getData("customLearning");
      getData("freeTipShorts");
    }
  }, [isAuth]);

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
                  to="/tutor-panel/video/customLearning/add"
                  className="dropdown-item"
                >
                  建立客製化需求影片
                </Link>
              </li>
              <li>
                <Link
                  to="/tutor-panel/video/freeTipShorts/add"
                  className="dropdown-item"
                >
                  建立實用技術短影片
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 篩選與搜尋 */}
        {/* <div className="f-end-center mt-4 mt-lg-6">
          <div className="dropdown">
            <button
              type="button"
              className="btn btn-outline-gray-03 border-1 dropdown-toggle ps-9 pe-11"
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
        </div> */}

        {/* 影片列表 */}
        <ul
          className="nav nav-tabs border-bottom border-gray-03 mt-4 mt-lg-6"
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
        <div className="table-list tab-content" id="courseCategoryTab">
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
              <div className="table-wrap mt-6 mt-lg-8">
                {/* 主題系列課程 */}
                {item.category === "topicSeries" ? (
                  courses.topicSeries.length > 0 ? (
                    <>
                      <table className="table">
                        <thead>
                          <tr>
                            <th></th>
                            <th>課程名稱</th>
                            <th>類別</th>
                            <th>瀏覽權限</th>
                            <th>上傳日期</th>
                            <th>觀看數</th>
                            <th>評價</th>
                            <th>操作</th>
                          </tr>
                        </thead>
                        {courses.topicSeries.map((course) => (
                          <TopicSeriesList
                            course={course}
                            key={course.id}
                            deleteCourse={deleteCourse}
                          />
                        ))}
                      </table>
                    </>
                  ) : (
                    <p className="f-center flex-column text-center text-gray-03 pt-4">
                      <span className="material-symbols-outlined mb-2">
                        animated_images
                      </span>
                      <span>- 暫無影片 -</span>
                    </p>
                  )
                ) : null}

                {/* 客製化學習需求 */}
                {item.category === "customLearning" ? (
                  courses.customLearning.length > 0 ? (
                    <>
                      <table className="table">
                        <thead>
                          <tr>
                            <th></th>
                            <th>影片名稱</th>
                            <th>類別</th>
                            <th>瀏覽權限</th>
                            <th>上傳日期</th>
                            <th>觀看數</th>
                            <th>評價</th>
                            <th>操作</th>
                          </tr>
                        </thead>
                        {courses.customLearning.map((course) => (
                          <CustomLearningList
                            course={course}
                            key={course.id}
                            deleteCourse={deleteCourse}
                          />
                        ))}
                      </table>
                    </>
                  ) : (
                    <p className="f-center flex-column text-center text-gray-03 pt-4">
                      <span className="material-symbols-outlined mb-2">
                        animated_images
                      </span>
                      <span>- 暫無影片 -</span>
                    </p>
                  )
                ) : null}

                {/* 免費技術短片 */}
                {item.category === "freeTipShorts" ? (
                  courses.freeTipShorts.length > 0 ? (
                    <>
                      <table className="table">
                        <thead>
                          <tr>
                            <th></th>
                            <th>影片名稱</th>
                            <th>類別</th>
                            <th>瀏覽權限</th>
                            <th>上傳日期</th>
                            <th>觀看數</th>
                            <th>評價</th>
                            <th>操作</th>
                          </tr>
                        </thead>
                        {courses.freeTipShorts.map((course) => (
                          <FreeTipShortsList
                            course={course}
                            key={course.id}
                            deleteCourse={deleteCourse}
                          />
                        ))}
                      </table>
                    </>
                  ) : (
                    <p className="f-center flex-column text-center text-gray-03 pt-4">
                      <span className="material-symbols-outlined mb-2">
                        animated_images
                      </span>
                      <span>- 暫無影片 -</span>
                    </p>
                  )
                ) : null}

                {/* 頁碼 */}
                {item.category === "topicSeries" &&
                  courses.topicSeries.length > 0 && (
                    <div className="tutor-manage-course-pagination-wrap">
                      <Pagination
                        pageData={pageData?.topicSeries}
                        type="topicSeries"
                        getData={getData}
                      />
                    </div>
                  )}

                {item.category === "customLearning" &&
                  courses.customLearning.length > 0 && (
                    <div className="tutor-manage-course-pagination-wrap">
                      <Pagination
                        pageData={pageData?.customLearning}
                        type="customLearning"
                        getData={getData}
                      />
                    </div>
                  )}

                {item.category === "freeTipShorts" &&
                  courses.freeTipShorts.length > 0 && (
                    <div className="tutor-manage-course-pagination-wrap">
                      <Pagination
                        pageData={pageData?.freeTipShorts}
                        type="freeTipShorts"
                        getData={getData}
                      />
                    </div>
                  )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
