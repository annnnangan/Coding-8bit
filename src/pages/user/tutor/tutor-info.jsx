import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import courseApi from "@/api/courseApi";
import tutorApi from "@/api/tutorApi";

import CourseCardList from "@/components/course/CourseCardList";
import ShowMoreButton from "@/components/common/ShowMoreButton";
import Loader from "@/components/common/Loader";
import Pagination from "@/components/layout/Pagination";

export default function TutorInfo() {
  // loading
  const [loadingState, setLoadingState] = useState(true);

  // 抓取路由上的 id 來取得遠端特定 id 的資料
  const { id } = useParams();

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

  // 取得課程資料
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
  const getCoursesData = async (category, page = 1) => {
    setLoadingState(true);
    try {
      let newData = {};

      if (category === "topicSeries") {
        const topicSeriesCourses = await courseApi.getTutorCourses(id, page);
        newData = {
          courses: topicSeriesCourses.courses,
          pagination: topicSeriesCourses.pagination,
        };
      } else if (category === "customLearning") {
        const customLearningCourses = await courseApi.getTutorVideos(
          id,
          "customLearning",
          page
        );
        newData = {
          courses: customLearningCourses.videos,
          pagination: customLearningCourses.pagination,
        };
      } else if (category === "freeTipShorts") {
        const freeTipShortsCourses = await courseApi.getTutorVideos(
          id,
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
      console.log("錯誤", error);
    } finally {
      setLoadingState(false);
    }
  };

  // 取得講師資料
  const [tutorData, setTutorData] = useState({ User: {} });
  const getTutorData = async () => {
    setLoadingState(true);
    try {
      const tutorResult = await tutorApi.getTutorDetail(id);
      setTutorData(tutorResult.data);
    } catch (error) {
      console.log("錯誤", error);
    } finally {
      setLoadingState(false);
    }
  };

  // 初始化 - 取得資料
  useEffect(() => {
    getTutorData();
    getCoursesData("topicSeries");
    getCoursesData("customLearning");
    getCoursesData("freeTipShorts");
  }, []);
  return (
    <>
      <Helmet>
        <title>
          {tutorData?.name
            ? `${tutorData.name} ｜ 講師資訊`
            : "Coding∞bit ｜ 可預約講師一覽"}
        </title>
      </Helmet>
      {loadingState && <Loader />}

      <header className="tutor-info-header-section bg"></header>
      <main>
        <div className="container-fluid px-lg-13">
          <div className="row">
            {tutorData.User.username && (
              <div className="col-xxl-3 f-column-align-center tutor-info-section">
                <div className="tutor-img-wrap">
                  <img
                    src={tutorData.User.avatar_url}
                    className="rounded-circle w-100"
                    alt="tutor-avatar"
                  />
                </div>
                <div className="tutor-content-info px-6 mt-6 mt-lg-8">
                  <div className="text-start">
                    <h1 className="fs-4 fs-lg-1">{tutorData.User.username}</h1>
                    <p className="fs-lg-5 fs-6 text-gray-02 mt-2">
                      {tutorData.slogan}
                    </p>
                    <div className="list-x-scroll py-2 mt-4">
                      {tutorData.expertise
                        .trim()
                        .split(",")
                        .slice(0, 3)
                        .map((skill, index) => (
                          <div className="d-inline-block me-1" key={index}>
                            <span className="tag tag-brand-02 fs-8">
                              {skill.trim()}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="tab-content mt-6" id="myTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="about-me-tab-pane"
                      role="tabpanel"
                      aria-labelledby="about-me-tab"
                      tabIndex="0"
                    >
                      <ShowMoreButton text={tutorData.about} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="col-xxl-9 pt-11 pb-13">
              <ul
                className="nav nav-tabs border-bottom border-gray-03"
                id="courseCategoryTab"
                role="tablist"
              >
                {courseCategory.map((item, index) => (
                  <li className="nav-item" role="presentation" key={index}>
                    <button
                      className={`nav-link fs-7 fs-lg-6 p-2 py-lg-6 px-lg-4 ${
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
                    <div className="row mt-6 mt-lg-8 g-6">
                      {item.category === "topicSeries" && (
                        <CourseCardList courseList={courses.topicSeries} />
                      )}
                      {item.category === "customLearning" && (
                        <CourseCardList courseList={courses.customLearning} />
                      )}
                      {item.category === "freeTipShorts" && (
                        <CourseCardList courseList={courses.freeTipShorts} />
                      )}
                    </div>
                    {/* 頁碼 */}
                    {item.category === "topicSeries" &&
                      courses.topicSeries.length > 0 && (
                        <div className="tutor-manage-course-pagination-wrap">
                          <Pagination
                            pageData={pageData?.topicSeries}
                            type="topicSeries"
                            getData={getCoursesData}
                          />
                        </div>
                      )}

                    {item.category === "customLearning" &&
                      courses.customLearning.length > 0 && (
                        <div className="tutor-manage-course-pagination-wrap">
                          <Pagination
                            pageData={pageData?.customLearning}
                            type="customLearning"
                            getData={getCoursesData}
                          />
                        </div>
                      )}

                    {item.category === "freeTipShorts" &&
                      courses.freeTipShorts.length > 0 && (
                        <div className="tutor-manage-course-pagination-wrap">
                          <Pagination
                            pageData={pageData?.freeTipShorts}
                            type="freeTipShorts"
                            getData={getCoursesData}
                          />
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
