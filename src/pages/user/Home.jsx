import { useState, useEffect } from "react";
import CourseCard from "../../components/course/CourseCard";
import SubscriptionCard from "../../components/subscription/SubscriptionCard";
import Swiper from "swiper";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import MainTitle from "../../components/MainTitle";
import axios from "axios";
import AOS from "aos";
import { NavLink } from "react-router-dom";

const { VITE_API_BASE } = import.meta.env;

export default function Home() {
  const [courseList, setCourseList] = useState([]);

  const getCoursesData = async () => {
    try {
      const result = await axios.get(
        `${VITE_API_BASE}/api/v1/courses?category=topicSeries`
      );
      setCourseList(result.data);
    } catch (error) {
      console.log("錯誤", error);
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
      <header className="index-banner-section wrap bg">
        <div className="swiper banner-swiper position-relative pb-11 pb-xl-6">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className="container-lg">
                <div className="row f-center flex-column-reverse flex-xl-row py-xl-10">
                  <div className="col-xl-8 f-column-align-center d-xl-block">
                    <h1 className="title">程式學習，量身訂做</h1>
                    <p className="fs-4 fs-xl-3 mt-4 mt-xl-6">
                      打破一成不變舊課綱，想學什麼？讓我們為您客製化
                    </p>
                    <a
                      href="custom-course.html"
                      className="btn btn-brand-03 slide-right-hover d-inline-flex f-align-center mt-6 mt-xl-10"
                    >
                      立即提需求
                      <span className="material-symbols-outlined icon-fill fs-5 ms-1">
                        arrow_forward
                      </span>
                    </a>
                  </div>
                  <div className="col-xl-4">
                    <img
                      src="images/deco/Illustration-1.svg"
                      alt="banner-illustration"
                      className="banner-illustration"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="container-lg">
                <div className="row f-center flex-column-reverse flex-xl-row">
                  <div className="col-xl-8 f-column-align-center d-xl-block">
                    <h1 className="title">
                      一對一教學，
                      <br />
                      專屬於您的上課時間
                    </h1>
                    <p className="fs-4 fs-xl-3 mt-4 mt-xl-6">
                      不怕問題在人海中埋沒，讓講師專為您一人解惑
                    </p>
                    <a
                      href="tutor-list.html"
                      className="btn btn-brand-03 slide-right-hover d-inline-flex f-align-center mt-6 mt-xl-10"
                    >
                      立即預約
                      <span className="material-symbols-outlined icon-fill fs-5 ms-1">
                        arrow_forward
                      </span>
                    </a>
                  </div>
                  <div className="col-xl-4">
                    <img
                      src="images/deco/Illustration-2.svg"
                      alt="banner-illustration-1"
                      className="banner-illustration"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="swiper-pagination swiper-pagination-brand-01"></div>
        </div>
      </header>
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
            <div className="col-lg-4">
              <div className="text-center p-6">
                <span
                  className="material-symbols-outlined text-brand-01"
                  style={{ fontSize: "80px" }}
                >
                  auto_stories
                </span>
                <div className="mt-4">
                  <h5 className="text-gray-01 fw-medium">
                    客製化方案解決學習需求
                  </h5>
                  <p className="mt-2">針對您的具體需求制定個人化學習課程</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="text-center p-6">
                <img
                  src="images/icon/teacher-fill-purple.svg"
                  alt="icon-teacher"
                />
                <div className="mt-4">
                  <h5 className="text-gray-01 fw-medium">頂尖講師一對一指導</h5>
                  <p className="mt-2">
                    可預約專業講師進行一對一課程、或是一對一程式碼檢視服務
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="text-center p-6">
                <span
                  className="material-symbols-outlined text-brand-01"
                  style={{ fontSize: "80px" }}
                >
                  calendar_clock
                </span>
                <div className="mt-4">
                  <h5 className="text-gray-01 fw-medium">靈活彈性的學習時間</h5>
                  <p className="mt-2">
                    許多專業課程，讓您方便於自由時間觀看學習
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
            <div className="text-center position-relative">
              <h4 className="step-num text-brand-01">1</h4>
              <div className="step-item py-6">
                <div className="step-img-wrap">
                  <img
                    src="images/deco/Illustration-5.svg"
                    alt="Illustration"
                    className="step-img"
                  />
                </div>
                <div className="mt-4">
                  <h5 className="text-gray-01 fw-medium">訂閱Coding∞bit</h5>
                  <p className="mt-2">成為Coding∞bit的基本會員，享有各項權利</p>
                </div>
              </div>
            </div>
            <span className="material-symbols-outlined icon-fill text-gray-01 px-6 d-none d-xxl-block">
              arrow_forward
            </span>
            <span className="material-symbols-outlined icon-fill text-gray-01 px-6 d-xxl-none">
              arrow_downward
            </span>
            <div className="text-center position-relative">
              <h4 className="step-num text-brand-01">2</h4>
              <div className="step-item py-6">
                <div className="step-img-wrap">
                  <img
                    src="images/deco/Illustration-3.svg"
                    alt="Illustration"
                    className="step-img"
                  />
                </div>
                <div className="mt-4">
                  <h5 className="text-gray-01 fw-medium">挑選喜歡的講師</h5>
                  <p className="mt-2">免費觀看教學影片，找到喜歡的教學風格</p>
                </div>
              </div>
            </div>
            <span className="material-symbols-outlined icon-fill text-gray-01 px-6 d-none d-xxl-block">
              arrow_forward
            </span>
            <span className="material-symbols-outlined icon-fill text-gray-01 px-6 d-xxl-none">
              arrow_downward
            </span>
            <div className="text-center position-relative">
              <h4 className="step-num text-brand-01">3</h4>
              <div className="step-item py-6">
                <div className="step-img-wrap">
                  <img
                    src="images/deco/Illustration-4.svg"
                    alt="Illustration"
                    className="step-img"
                  />
                </div>
                <div className="mt-4">
                  <h5 className="text-gray-01 fw-medium">挑選喜歡的時間</h5>
                  <p className="mt-2">
                    自由挑選預約時間，付費後即可預約一對一教學或是程式碼檢視服務
                  </p>
                </div>
              </div>
            </div>
            <span className="material-symbols-outlined icon-fill text-gray-01 px-6 d-none d-xxl-block">
              arrow_forward
            </span>
            <span className="material-symbols-outlined icon-fill text-gray-01 px-6 d-xxl-none">
              arrow_downward
            </span>
            <div className="text-center position-relative">
              <h4 className="step-num text-brand-01">4</h4>
              <div className="step-item py-6">
                <div className="step-img-wrap">
                  <img
                    src="images/deco/Illustration-6.svg"
                    alt="Illustration"
                    className="step-img"
                  />
                </div>
                <div className="mt-4">
                  <h5 className="text-gray-01 fw-medium">開始一對一教學！</h5>
                  <p className="mt-2">預約時間到，開始線上上課</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
                  <a
                    href="custom-course.html"
                    className="link-brand-03 fs-6 fw-medium underline-hover pb-3 pb-md-0 mt-5 mt-md-0 ms-md-10"
                  >
                    已有帳號？點此提出需求
                  </a>
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
