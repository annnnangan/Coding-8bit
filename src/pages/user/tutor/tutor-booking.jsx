import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import axios from "axios";
import { Swiper } from "swiper";
import { Autoplay, Navigation } from "swiper/modules";
import * as bootstrap from "bootstrap";

import ShowMoreButton from "../../../components/common/ShowMoreButton";
import TutorBookingResume from "../../../components/tutor/TutorBookingResume";
import TutorsCard from "../../../components/tutor/TutorsCard";
import CourseCardList from "../../../components/course/CourseCardList";
import CommentsSection from "../../../components/tutor/CommentsSection";
import Loader from "../../../components/common/Loader";

import { recommendTutorData, tutorStats } from "../../../data/tutors";

const { VITE_API_BASE, VITE_API_BASE_2 } = import.meta.env;

export default function TutorBooking() {
  // loading
  const [loadingState, setLoadingState] = useState(true);

  // 抓取路由上的 id 來取得遠端特定 id 的資料
  const { id } = useParams();

  // modal
  const serviceSelectionModal = useRef(null);
  const serviceSelectionModalRef = useRef(null);

  useEffect(() => {
    serviceSelectionModal.current = new bootstrap.Modal(serviceSelectionModalRef.current);
  }, []);

  // 傳遞預約種類路由參數
  const navigate = useNavigate();
  const handleNavigate = (type) => {
    navigate(`/tutor/${id}/booking-payment-step1/${type}`);
  };
  // 跳轉自下一頁按紐
  const toPaymentPage = (type) => {
    serviceSelectionModal.current.hide();
    handleNavigate(type);
  };

  // 取得資料函式
  const [courses, setCourses] = useState([]);
  const [tutorList, setTutorList] = useState({
    skills: [],
    resume: { workExperience: [], education: [], certificates: [] },
    statistics: {},
  });
  const [comments, setComments] = useState([]);
  const [currentStartDate] = useState(20240801);
  const [availableTime, setAvailableTime] = useState([]);
  const getData = async () => {
    setLoadingState(true);
    try {
      const coursesResult = await axios.get(`${VITE_API_BASE}/api/v1/courses`);
      const tutorResult = await axios.get(`${VITE_API_BASE_2}/api/v1/tutors/${id}`);
      const commentResult = await axios.get(`${VITE_API_BASE_2}/api/v1/tutors/${id}/comments`);
      const availableTimeResult = await axios.get(`${VITE_API_BASE_2}/api/v1/tutors/${id}/schedule/availableTime/${currentStartDate}`);

      // 篩選出跟當前講師同名的課程
      const filteredCourses = coursesResult.data.filter((course) => {
        return course.tutor === tutorResult.data.name;
      });
      setCourses(filteredCourses);
      setTutorList(tutorResult.data);
      setComments(commentResult.data);
      setAvailableTime(availableTimeResult.data);
    } catch (error) {
      console.log("錯誤", error);
    } finally {
      setLoadingState(false);
    }
  };

  // 初始化 - swiper
  useEffect(() => {
    new Swiper(".tutor-card-swiper", {
      modules: [Navigation, Autoplay],
      slidesPerView: 1,
      spaceBetween: 40,
      loop: true,
      grabCursor: true,
      autoplay: {
        delay: 5000,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
      },
    });
    new Swiper(".freeTipShortsSwiper", {
      modules: [Navigation, Autoplay],
      slidesPerView: 1,
      spaceBetween: 40,
      loop: true,
      grabCursor: true,
      autoplay: {
        delay: 5000,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
      },
    });
  }, []);

  // 初始化 - 取得資料
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Helmet>
        <title>{tutorList?.name ? `${tutorList.name} ｜ 講師詳細` : "Coding∞bit ｜ 講師詳細"}</title>
      </Helmet>
      {loadingState && <Loader />}
      <div className="tutor-booking">
        {/*  Mobile Top Cover */}
        <div className="position-relative d-lg-none">
          <div className="img-wrapper img-hover-enlarge">
            <img src="images/course/course-2-high-res.jpg" className="w-100" alt="tutor cover" style={{ maxHeight: "300px" }} />
          </div>

          <span className="material-symbols-outlined icon-fill text-white position-absolute top-50 start-50 translate-middle" style={{ fontSize: "56px" }}>
            play_circle
          </span>

          <span className="favorite material-symbols-outlined icon-fill p-2 rounded-circle align-middle" role="button" style={{ backgroundColor: "#1e1e1e66" }} data-favorite="true">
            favorite
          </span>
        </div>
        {/*  Main Content */}
        <main className="container py-lg-13 py-7">
          <div className="row">
            {/*  tutor information */}
            <div className="col-lg-8">
              {/*  section 1 - overview */}
              <section className="section">
                {/*  tutor profile  */}
                <div className="tutor-profile section-component">
                  <div className="flex-shrink-0">
                    <img src={tutorList.avatar} alt="profile" className="object-fit-cover rounded-circle me-6" />
                  </div>
                  <div className="flex-grow-1">
                    <h2 className="mb-2 fs-lg-2 fs-4">{tutorList.name}</h2>
                    <p className="fs-lg-5 fs-6 text-gray-02">{tutorList.title}</p>
                  </div>
                </div>
                {/*  tag list  */}
                <div className="list-x-scroll py-2 section-component">
                  {tutorList.skills.map((skill, index) => (
                    <a href="#" className="tag tag-brand-02 fs-8 me-3" key={index}>
                      {skill}
                    </a>
                  ))}
                </div>
                {/*  tab  */}
                <div className="section-component">
                  <ul className="nav nav-tabs mb-6 list-x-scroll flex-nowrap" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="about-me-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#about-me-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="about-me-tab-pane"
                        aria-selected="true"
                      >
                        關於我
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="teaching-styles-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#teaching-styles-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="teaching-styles-tab-pane"
                        aria-selected="false"
                      >
                        我的教學風格
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="resume-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#resume-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="resume-tab-pane"
                        aria-selected="false"
                      >
                        我的履歷
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="about-me-tab-pane" role="tabpanel" aria-labelledby="about-me-tab" tabIndex="0">
                      <ShowMoreButton text={tutorList.aboutMe} />
                    </div>
                    <div className="tab-pane fade" id="teaching-styles-tab-pane" role="tabpanel" aria-labelledby="teaching-styles-tab" tabIndex="0">
                      <ShowMoreButton text={tutorList.teachingStyles} />
                    </div>
                    <div className="tab-pane fade" id="resume-tab-pane" role="tabpanel" aria-labelledby="resume-tab" tabIndex="0">
                      <TutorBookingResume resume={tutorList.resume} />
                    </div>
                  </div>
                  {/* statistics */}
                  <div className="row row-cols-2 row-cols-lg-5 g-3 mt-5">
                    {tutorStats.map((item, index) => (
                      <div className="col" key={index}>
                        <div className="stat-overview-card">
                          <h4 className="text-brand-03">{item.details}</h4>
                          <p className="fs-7">{item.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* section 2 - video list */}
              <section className="section">
                <div className="section-component f-between-center">
                  <h4>講師影片</h4>
                  <NavLink to={`/tutor-info/${id}`} className="text-brand-03 d-flex slide-right-hover" data-show="false">
                    <p>更多</p>
                    <span className="material-symbols-outlined icon-fill">arrow_forward</span>
                  </NavLink>
                </div>
                <div className="swiper freeTipShortsSwiper">
                  <div className="swiper-wrapper">
                    {courses.map((course) => (
                      <div className="swiper-slide" key={course.id}>
                        <CourseCardList courseList={course} cardsNum={1} />
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* section 3 - timetable  */}
              <section className="section schedule">
                <div className="section-component f-between-center">
                  <h4>時間表</h4>
                </div>
                <div className="f-between-center mb-5">
                  <span className="prev material-symbols-outlined icon-fill bg-brand-02 text-brand-01 rounded-circle p-2 align-middle">arrow_back</span>
                  <h5 className="text-brand-03 week fw-medium">
                    {availableTime[0]?.year}/{availableTime[0]?.date} - {availableTime[0]?.year}/{availableTime[availableTime.length - 1]?.date}
                  </h5>
                  <span className="next material-symbols-outlined icon-fill bg-brand-02 text-brand-01 rounded-circle p-2 align-middle">arrow_forward</span>
                </div>

                <div>
                  <div className="row row-cols-7 available-date-time g-0">
                    {availableTime.map((item) => (
                      <div className="col" key={item.date}>
                        <div className={`date f-center flex-column ${item.timeSlots.length === 0 && "disabled"}`}>
                          <h6>{item.day}</h6>
                          <p>{item.date}</p>
                        </div>

                        <div>
                          <ul className="times f-center flex-column">
                            {item.timeSlots.map((time, index) => (
                              <li className={`time ${time.status === "booked" && "disabled"}`} key={index}>
                                {time.startTime}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* section 4 - student comment */}
              <CommentsSection comments={comments} />

              {/* section 5 - tutor recommendation */}
              <section className="section mb-0">
                <div className="section-component f-between-center">
                  <h4>推薦講師</h4>
                  <NavLink to="/tutor-list" className="text-brand-03 d-flex slide-right-hover">
                    <p>更多</p>
                    <span className="material-symbols-outlined icon-fill">arrow_forward</span>
                  </NavLink>
                </div>

                {/* desktop */}
                <TutorsCard tutorList={recommendTutorData} cardsNum={2} />
                {/* mobile */}
                <div className="swiper tutor-card-swiper d-block d-lg-none">
                  <div className="swiper-wrapper mb-10 py-5">
                    {recommendTutorData.map((tutor) => (
                      <div className="swiper-slide" key={tutor.id}>
                        <TutorsCard tutorList={tutor} cardsNum={1} />
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            {/* Desktop right CTA card */}
            <div className="col-lg-4 d-lg-block d-none">
              <div className="desktop-cta-card card p-lg-6 p-4 sticky-top">
                <div className="position-relative mb-lg-5 mb-4">
                  <div className="img-wrapper img-hover-enlarge rounded-2">
                    <img src="images/course/course-2.png" className="card-img-top rounded-2 object-fit-cover" alt="course-2" />
                  </div>

                  <span className="favorite material-symbols-outlined icon-fill p-2 rounded-circle align-middle" role="button" style={{ backgroundColor: "#1e1e1e66" }} data-favorite="true">
                    favorite
                  </span>
                </div>
                <div className="card-body p-0">
                  <div className="mb-lg-6 mb-5">
                    <p className="text-gray-02 fs-7 fs-lg-6">每小時收費</p>
                    <h2 className="text-brand-03 fs-lg-2 fs-3">NT $250</h2>
                  </div>

                  <button className="btn slide-right-hover btn-brand-03 w-100" data-bs-toggle="modal" data-bs-target="#serviceSelectionModal">
                    <p className="f-center me-1">
                      立即預約
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal */}
      {/* Modal - Service Select Modal */}
      <div className="modal fade service-selection-modal" id="serviceSelectionModal" tabIndex="-1" aria-labelledby="serviceSelectionModalLabel" aria-hidden="true" ref={serviceSelectionModalRef}>
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header border-0 pb-0">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <h4 className="modal-title fs-md-2 fs-3 text-center mb-8" id="serviceSelectionModalLabel">
                請選擇想預約的項目
              </h4>
              <div className="row row-cols-lg-2 g-4 flex-column flex-lg-row">
                <div className="col service-card">
                  <button className="h-100 border-0" onClick={() => toPaymentPage("1on1")}>
                    <div className="f-center flex-column bg-gray-04 py-8 px-5 rounded-2 slide-up-hover h-100">
                      <h3 className="fs-4 fs-md-3">一對一教學</h3>
                      <img src="images/deco/Illustration-7.png" alt="one-on-one-illustration" />
                      <p className="text-center mb-auto">以線上Google meeting的形式， 將於預約時間前一天發送會議連結， 講師會於預約時間內進行一對一單獨指導。</p>
                    </div>
                  </button>
                </div>
                <div className="col service-card">
                  <button className="h-100 border-0" onClick={() => toPaymentPage("code-review")}>
                    <div className="f-center flex-column bg-gray-04 py-8 px-5 rounded-2 slide-up-hover h-100">
                      <h3 className="fs-4 fs-md-3">程式碼檢視</h3>
                      <img src="images/deco/Illustration-8.png" alt="code-review-illustration" />
                      <p className="text-center mb-auto">您需要於預約時繳交GitHub Repo， 提供想接受檢視的程式碼， 講師會於預約時間內進行程式碼檢視服務， 並且於時間結束時回覆檢視後的結果。</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal - Student Comment Modal */}
      <CommentsSection comments={comments} modal={true} />

      {/* Mobile sticky bottom CTA card */}
      <div className="mobile-bottom-cta d-lg-none sticky-bottom border border-2 border-brand-02 bg-white" style={{ borderRadius: "16px 16px 0px 0px" }}>
        <div className="pt-4 pb-6 px-4">
          <div className="f-between-center">
            <div>
              <p className="text-gray-02 fs-7 fs-lg-6">每小時收費</p>
              <h2 className="text-brand-03 fs-lg-2 fs-3">NT $250</h2>
            </div>

            <button className="btn slide-right-hover btn-brand-03" data-bs-toggle="modal" data-bs-target="#serviceSelectionModal">
              <p className="f-center me-1">
                立即預約
                <span className="material-symbols-outlined">arrow_forward</span>
              </p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
