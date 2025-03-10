import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import DOMPurify from "dompurify";

import { Swiper } from "swiper";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import courseApi from "@/api/courseApi";

import CourseCardList from "@/components/course/CourseCardList";
import MainTitle from "@/components/MainTitle";
import Loader from "@/components/common/Loader";

import { categoryData, hotCoursesData } from "@/data/courses";
import { convertSecondsToTime } from "@/utils/timeFormatted-utils";

export default function CourseList() {
  // loading
  const [loadingState, setLoadingState] = useState(true);

  // 客製化課程區塊 Tab 切換邏輯
  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (event, index) => {
    event.preventDefault();
    setActiveTab(index);
  };

  // 傳遞類別路由參數
  const navigate = useNavigate();

  const handleNavigate = (video_type) => {
    navigate(`/course?video_type=${video_type}`);
  };

  // 取得課程資料函式
  const [topicSeriesCourseList, setTopicSeriesCourseList] = useState([]);
  const [customLearningCourseList, setCustomLearningCourseList] = useState([]);
  const [freeTipShortsCourseList, setFreeTipShortsCourseList] = useState([]);
  const getCoursesData = async () => {
    setLoadingState(true);
    try {
      const topicSeries = await courseApi.getAllCourses();
      const customLearning = await courseApi.getAllVideos(
        "customLearning",
        1,
        6
      );
      const freeTipShorts = await courseApi.getAllVideos("freeTipShorts", 1, 6);
      setTopicSeriesCourseList(topicSeries.courses);
      setCustomLearningCourseList(customLearning.videos);
      setFreeTipShortsCourseList(freeTipShorts.videos);
    } catch (error) {
      console.log("錯誤", error);
    } finally {
      setLoadingState(false);
    }
  };

  // 初始化 - swiper
  useEffect(() => {
    new Swiper(".hotCourses-swiper", {
      modules: [Navigation, Pagination, Autoplay],
      slidesPerView: 3,
      spaceBetween: 24,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        type: "fraction",
      },
      breakpoints: {
        1200: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        0: {
          slidesPerView: 1,
          spaceBetween: 24,
        },
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
    new Swiper(".freeTipShortsSwiper", {
      modules: [Navigation, Pagination, Autoplay],
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        type: "fraction",
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        0: {
          slidesPerView: 1,
          spaceBetween: 24,
        },
      },
      navigation: {
        nextEl: ".swiper-freeTipShorts-button-next",
        prevEl: ".swiper-freeTipShorts-button-prev",
      },
    });
  }, []);

  // 初始化 - 取得資料
  useEffect(() => {
    getCoursesData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Coding∞bit ｜ 課程一覽</title>
      </Helmet>
      {loadingState && <Loader />}

      {/* header */}
      <header className="course-list-banner-section bg">
        <div className="container-lg">
          <div className="row">
            <div className="col title-wrap f-column-align-center d-lg-block">
              <h1 className="title">教學影片一覽</h1>
              <p className="title-info play-write-font">
                <span className="d-inline-block d-xl-block">
                  Your Journey to Coding Excellence
                </span>
                <span className="d-inline-block d-xl-block mt-2 mt-lg-0">
                  Starts Here
                </span>
              </p>
            </div>
            <div className="col text-center">
              <img
                src="images/deco/Illustration-10.png"
                alt="banner-illustration"
                className="banner-illustration"
              />
            </div>
          </div>
        </div>
      </header>

      {/* 三大類別 */}
      <section className="course-list-category-section wrap">
        <div className="container">
          <MainTitle
            longTitle={false}
            beforeTitle="三大類別，豐富多元"
            afterTitle=""
          />
          <div className="row f-center mt-6 mt-lg-13">
            {categoryData.map((item) => (
              <div className="col-11 col-lg-4 mt-10 mt-lg-0" key={item.id}>
                <div className="category-card">
                  <h4>{item.title}</h4>
                  <div className="card-img-wrap">
                    <img
                      src={item.image}
                      alt="banner-illustration"
                      className="card-img w-100"
                    />
                  </div>
                  <div className="card-info text-center bg-white">
                    <p className="fs-7 fs-lg-6 fw-medium text-brand-03">
                      {item.firstDescription}
                      <br />
                      {item.secDescription}
                    </p>
                    <button
                      onClick={() => handleNavigate(item.video_type)}
                      className="btn btn-brand-03 fs-7 rounded-3 w-100 mt-2"
                    >
                      查看所有影片
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 實用技術短影片 */}
      <section className="course-list-freeTipShorts-section">
        <div className="container">
          <div className="row position-relative">
            <div className="position-absolute">
              <div className="f-center justify-content-lg-start">
                <picture>
                  <source
                    srcSet="images/icon/icon-infinite-sm.svg"
                    media="(max-width: 575.98px)"
                  />
                  <img
                    src="images/icon/icon-infinite.svg"
                    alt="icon-infinite"
                  />
                </picture>
                <h2 className="title ms-3 ms-lg-4">實用技術短影片</h2>
                <picture>
                  <source
                    srcSet="images/icon/icon-infinite-sm.svg"
                    media="(max-width: 575.98px)"
                  />
                  <img
                    src="images/icon/icon-infinite.svg"
                    alt="icon-infinite"
                    className="ms-3 ms-lg-4"
                  />
                </picture>
              </div>
              <div className="swiper-switch-btn f-align-center gap-5 mt-6">
                <button
                  className="swiper-freeTipShorts-button-prev swiper-circle-btn-prev f-center rounded-circle border-0"
                  style={{ width: "44px", height: "44px" }}
                ></button>
                <button
                  className="swiper-freeTipShorts-button-next swiper-circle-btn-next f-center rounded-circle border-0"
                  style={{ width: "44px", height: "44px" }}
                ></button>
              </div>
            </div>
            <div className="col-lg-8 swiper freeTipShortsSwiper me-0">
              <div className="swiper-wrapper">
                {freeTipShortsCourseList.map((course) => (
                  <div className="swiper-slide" key={course.id}>
                    <NavLink
                      to={`/video/${course.id}`}
                      className="course-card card-column"
                    >
                      <div className="card gradient-border img-hover-enlarge p-lg-6 p-4 h-100">
                        <div className="overflow-hidden img-wrapper rounded position-relative">
                          <img
                            src={course.cover_image}
                            className="card-img-top cover-img rounded"
                            style={{ height: "204px" }}
                            alt="course-image"
                          />
                        </div>
                        <span className="course-category-tag bg-brand-02 text-brand-03 position-absolute start-0">
                          實用技術短影片
                        </span>
                        <div className="card-body p-0 mt-3 mt-lg-4 f-column-between">
                          <div>
                            <h3 className="card-title fs-6 fs-lg-5">
                              {course.title}
                            </h3>
                            <p className="card-text fs-7 fs-lg-6 mt-1 mt-lg-2">
                              {course.Tutor.User.username}
                            </p>
                          </div>
                          <div className="f-between-center">
                            <div className="f-align-center mt-1 mt-lg-2">
                              <div className="f-center">
                                <span className="material-symbols-outlined fs-5 me-1">
                                  schedule
                                </span>
                                <p className="fs-7 fs-lg-6">
                                  {convertSecondsToTime(course.duration)}
                                </p>
                              </div>
                              <div className="f-center ms-2">
                                <span className="material-symbols-outlined fs-5 me-1">
                                  group
                                </span>
                                <p className="fs-7 fs-lg-6">
                                  {Number(course.view_count).toLocaleString()}
                                </p>
                              </div>
                            </div>
                            <p className="f-center text-brand-03 fs-7 fs-lg-6">
                              <span className="material-symbols-outlined icon-fill text-brand-01 fs-6 fs-lg-5 me-1">
                                kid_star
                              </span>
                              {Number(course.rating).toFixed(1)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </NavLink>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 熱門課程 */}
      <section className="course-list-hot-section wrap">
        <div className="container">
          <MainTitle longTitle={false} beforeTitle="熱門課程" afterTitle="" />
          <div className="swiper hotCourses-swiper pb-10 mt-6 mt-lg-8">
            <div className="swiper-wrapper">
              {hotCoursesData.map((course) => (
                <div className="swiper-slide" key={course.id}>
                  <NavLink to={course.video_url}>
                    <div className="hot-course-card card img-hover-enlarge mt-10 mt-lg-12">
                      <div className="img-wrapper rounded">
                        <img
                          src={course.image}
                          className="cover-img w-100"
                          alt="course-image"
                        />
                      </div>
                      <div className="overlay rounded">
                        <div>
                          <h3 className="text-white fs-4 fw-medium">
                            {course.title}
                          </h3>
                          <p className="text-white mt-2">
                            {course.description}
                          </p>
                        </div>
                      </div>
                      <div className="hot-course-tag position-absolute">
                        <span className="material-symbols-outlined fs-3">
                          arrow_right
                        </span>
                        <span className="me-1">{course.tag}</span>
                      </div>
                    </div>
                  </NavLink>
                </div>
              ))}
            </div>
          </div>
          <div className="swiper-switch-btn f-end-center gap-5 mt-4">
            <div className="swiper-button-prev swiper-circle-btn-prev rounded-circle"></div>
            <div className="swiper-button-next swiper-circle-btn-next rounded-circle"></div>
          </div>
        </div>
      </section>

      {/* 主題式系列課程 */}
      <section className="course-list-topicSeries-section wrap bg-brand-05">
        <div className="container">
          <MainTitle
            longTitle={true}
            beforeTitle="講師自編"
            afterTitle="主題式系列課程"
          />
          <div className="row topicSeriesCourse-card-wrap mt-2 mt-lg-8 g-6">
            <CourseCardList courseList={topicSeriesCourseList.slice(0, 6)} />
          </div>
          <div className="f-center">
            <NavLink
              to="/course?video_type=topicSeries"
              className="btn btn-outline-brand-03 slide-right-hover d-inline-flex f-align-center mt-6 mt-lg-11"
            >
              查看所有主題式系列課程影片
              <span className="material-symbols-outlined icon-fill fs-5 ms-1">
                arrow_forward
              </span>
            </NavLink>
          </div>
        </div>
      </section>

      {/* 客製化學習需求影片 */}
      <section className="course-list-customLearning-section wrap">
        <div className="container">
          <MainTitle
            longTitle={false}
            beforeTitle="客製化學習需求影片"
            afterTitle=""
          />
          <div className="row mt-lg-12">
            <div className="col-lg-4 rounded-1 d-none d-lg-block">
              <ul
                className="customLearning-list-group list-group bg-white shadow h-100 px-6 py-8"
                id="customLearning"
                role="tablist"
              >
                {customLearningCourseList.map((course, index) => (
                  <li role="presentation" key={course.id}>
                    <a
                      href="#"
                      className={`list-group-item list-group-item-action border-0 fs-5 fw-bolder py-4 ${
                        index === activeTab && "active"
                      }`}
                      onClick={(event) => handleTabClick(event, index)}
                      aria-current={index === activeTab ? "true" : "false"}
                      id={`customLearning-${index}-tab`}
                      role="tab"
                      aria-controls={`customLearning-${index}`}
                      aria-selected={index === activeTab ? "true" : "false"}
                    >
                      {course.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-lg-8 mt-4 mt-lg-10">
              <div
                className="customLearning-card-wrap tab-content border-0 py-6"
                id="customLearningContent"
              >
                {customLearningCourseList.map((course, index) => (
                  <div
                    className={`tab-pane bg-white fade ${
                      index === activeTab ? "show active" : "mt-6 mt-lg-0"
                    }`}
                    id={`customLearning-${index}`}
                    role="tabpanel"
                    aria-labelledby={`customLearning-${index}-tab`}
                    key={course.id}
                  >
                    <NavLink
                      to={`/video/:id`}
                      className="course-card card-column"
                    >
                      <div className="card border-0 img-hover-enlarge h-100">
                        <div className="overflow-hidden img-wrapper rounded position-relative">
                          <img
                            src={course.cover_image}
                            className="card-img-top cover-img rounded"
                            alt="course-image"
                          />
                        </div>
                        <div className="card-body p-0 mt-4 mt-lg-6 f-column-between">
                          <div>
                            <h3 className="card-title fs-5 fs-lg-4">
                              {course.title}
                            </h3>
                            <p className="card-text fs-7 fs-lg-5 mt-1 mt-lg-2">
                              by {course.Tutor.User.username}
                            </p>
                            <p
                              className="card-text domPurify-wrap fs-6 fs-lg-5 mt-2 mt-lg-4"
                              dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(course.description),
                              }}
                            ></p>
                          </div>
                        </div>
                      </div>
                    </NavLink>
                  </div>
                ))}
              </div>
              <div className="f-center f-lg-end-center">
                <button
                  type="button"
                  className="btn btn-outline-brand-03 slide-right-hover d-inline-flex f-align-center mt-6 mt-lg-8"
                  onClick={() => handleNavigate("customLearning")}
                >
                  查看所有客製化需求影片
                  <span className="material-symbols-outlined icon-fill fs-5 ms-1">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
