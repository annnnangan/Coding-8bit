// React 相關方法
import { useState, useEffect, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";

// 第三方套件
import { Swiper } from "swiper";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import AOS from "aos";

// Api 
import courseApi from "../../api/courseApi";

// 元件
import MainTitle from "../../components/MainTitle";
import CourseCard from "../../components/course/CourseCard";
import SubscriptionCard from "../../components/subscription/SubscriptionCard";
import Loader from "../../components/common/Loader";

// 內建資料引入
import { bannerData, featureData, stepsData } from "../../data/home";

export default function Home() {
  // loading
  const [loadingState, setLoadingState] = useState(false);

  // 取得課程資料函式
  const [courseList, setCourseList] = useState([]);
  const getCoursesData = async () => {
    setLoadingState(true);
    try {
      const result = await courseApi.getCourses("topicSeries");
      setCourseList(result);
    } catch (error) {
      console.log("錯誤", error);
    } finally {
      setLoadingState(false);
    }
  };

  // 初始化 - AOS
  useEffect(() => {
    AOS.init();
  }, []);

  // 初始化 - swiper
  useEffect(() => {
    new Swiper(".banner-swiper", {
      modules: [Navigation, Pagination, Autoplay],
      slidesPerView: 1,
      spaceBetween: 240,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
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
        <title>Coding∞bit ｜ 首頁</title>
      </Helmet>
      {loadingState && <Loader />}

      {/* Header */}
      <header className="index-banner-section wrap bg">
        <div className="swiper banner-swiper position-relative pb-11 pb-xl-6">
          <div className="swiper-wrapper">
            {bannerData.map((banner) => (
              <div key={banner.id} className="swiper-slide">
                <div className="container-lg">
                  <div className="row f-center flex-column-reverse flex-xl-row py-xl-10">
                    <div className="col-xl-8 f-column-align-center d-xl-block">
                      <h1 className="title">
                        {banner.title.split("\n").map((line, idx) => (
                          <Fragment key={idx}>
                            {line}
                            <br />
                          </Fragment>
                        ))}
                      </h1>
                      <p className="fs-4 fs-xl-3 mt-4 mt-xl-6">
                        {banner.description}
                      </p>
                      <NavLink
                        to={banner.btnLink}
                        className="btn btn-brand-03 slide-right-hover d-inline-flex f-align-center mt-6 mt-xl-10"
                      >
                        {banner.btnText}
                        <span className="material-symbols-outlined icon-fill fs-5 ms-1">
                          arrow_forward
                        </span>
                      </NavLink>
                    </div>
                    <div className="col-xl-4">
                      <img
                        src={banner.imgSrc}
                        alt={banner.imgAlt}
                        className="banner-illustration"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="swiper-pagination swiper-pagination-brand-01"></div>
        </div>
      </header>

      {/* 精選課程 */}
      <main className="index-course-section wrap">
        <div className="container">
          <MainTitle longTitle={false} beforeTitle="精選課程" afterTitle="" />
          <div className="row course-card-wrap mt-6 mt-lg-8 g-6">
            <CourseCard courseList={courseList} />
          </div>
          <div className="f-center">
            <NavLink
              to="/course-list"
              className="btn btn-outline-brand-03 slide-right-hover d-inline-flex f-align-center mt-6 mt-lg-8"
            >
              了解更多
              <span className="material-symbols-outlined icon-fill fs-5 ms-1">
                arrow_forward
              </span>
            </NavLink>
          </div>
        </div>
      </main>

      {/* 選擇我們的理由 */}
      <section className="index-feature-section wrap">
        <div
          className="container"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          <MainTitle
            longTitle={false}
            beforeTitle="選擇我們的理由"
            afterTitle=""
          />
          <div className="row mt-6 mt-lg-8">
            {featureData.map((feature) => (
              <div key={feature.id} className="col-lg-4">
                <div className="text-center p-6">
                  {feature.type === "icon" ? (
                    <span
                      className="material-symbols-outlined text-brand-01"
                      style={{ fontSize: feature.content.fontSize }}
                    >
                      {feature.content.icon}
                    </span>
                  ) : (
                    <img
                      src={feature.content.imgSrc}
                      alt={feature.content.alt}
                      className="img-fluid"
                    />
                  )}
                  <div className="mt-4">
                    <h5 className="text-gray-01 fw-medium">{feature.title}</h5>
                    <p className="mt-2">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 簡單四步驟 */}
      <section className="index-booking-steps-section wrap bg-gray-04">
        <div
          className="container"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          <MainTitle
            longTitle={true}
            beforeTitle="簡單四步驟，"
            afterTitle="預約一對一教學"
          />
          <div className="step-wrap mt-6 mt-lg-8">
            {stepsData.map((step, index) => (
              <Fragment key={step.id}>
                <div className="text-center position-relative">
                  <h4 className="step-num text-brand-01">{step.id}</h4>
                  <div className="step-item py-6">
                    <div className="step-img-wrap">
                      <img
                        src={step.imgSrc}
                        alt={`Illustration for step ${step.id}`}
                        className="step-img"
                      />
                    </div>
                    <div className="mt-4">
                      <h5 className="text-gray-01 fw-medium">{step.title}</h5>
                      <p className="mt-2">{step.description}</p>
                    </div>
                  </div>
                </div>
                {index !== stepsData.length - 1 && (
                  <>
                    <span className="material-symbols-outlined icon-fill text-gray-01 px-6 d-none d-xxl-block">
                      arrow_forward
                    </span>
                    <span className="material-symbols-outlined icon-fill text-gray-01 px-6 d-xxl-none">
                      arrow_downward
                    </span>
                  </>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* 影片客製化服務 */}
      <section className="index-customized-info-section wrap">
        <div
          className="container"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          <MainTitle
            longTitle={true}
            beforeTitle="會員限定，"
            afterTitle="學習影片客製化服務"
          />
          <div className="info-wrap p-4 p-lg-10 mt-6 mt-lg-8">
            <div>
              <h3 className="fs-4 fs-lg-2">滿足您的學習需求</h3>
              <p className="mt-4 mt-lg-6">
                我們提供教學影片客製化服務，根據您提出的需求，錄製專屬的教學內容。只要您成為高級會員，即可享有服務。
              </p>
              <ul className="mt-4 mt-lg-6">
                <li className="f-align-center">
                  <span className="material-symbols-outlined icon-fill text-brand-03">
                    check_circle
                  </span>
                  <p className="fw-medium lh-sm ms-4">
                    專業講師額外錄製教學內容
                  </p>
                </li>
                <li className="f-align-center mt-3 mt-lg-4">
                  <span className="material-symbols-outlined icon-fill text-brand-03">
                    check_circle
                  </span>
                  <p className="fw-medium lh-sm ms-4">
                    成果導向教學影片，每支影片都能學會一個知識點
                  </p>
                </li>
              </ul>
              <div className="btn-wrap f-lg-align-center mt-6 mt-lg-10">
                <NavLink
                  to="/subscription-list"
                  className="btn btn-brand-03 slide-right-hover d-inline-flex f-align-center"
                >
                  立即訂閱
                  <span className="material-symbols-outlined icon-fill fs-6 fs-md-5 ms-1">
                    arrow_forward
                  </span>
                </NavLink>
                <div>
                  <NavLink
                    to="/custom-course-list"
                    className="link-brand-03 fs-6 fw-medium underline-hover pb-3 pb-md-0 mt-5 mt-md-0 ms-md-10"
                  >
                    已有帳號？點此提出需求
                  </NavLink>
                </div>
              </div>
            </div>
            <a href="#">
              <div className="video-wrap rounded-2 position-relative">
                <img
                  src="images/course/course-lg-1.png"
                  alt="video-image"
                  className="rounded-2"
                />
                <span className="play-icon material-symbols-outlined icon-fill display-3 text-white">
                  play_circle
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* 訂閱方案 */}
      <section className="index-subscription-section bg wrap">
        <div
          className="container"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          <MainTitle longTitle={false} beforeTitle="訂閱方案" afterTitle="" />
          <div className="row mt-6 mt-lg-8">
            <SubscriptionCard duration="monthly" />
            <div className="f-center">
              <NavLink
                to="/subscription-list"
                className="btn btn-outline-brand-03 slide-right-hover d-inline-flex f-align-center mt-6 mt-lg-8"
              >
                查看更多方案
                <span className="material-symbols-outlined icon-fill fs-5 ms-1">
                  arrow_forward
                </span>
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
