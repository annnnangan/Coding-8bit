import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";

import { Swiper } from "swiper";
import { Autoplay, Navigation } from "swiper/modules";
import * as bootstrap from "bootstrap";
import Swal from "sweetalert2";

import tutorApi from "@/api/tutorApi";
import courseApi from "@/api/courseApi";

import ShowMoreButton from "@/components/common/ShowMoreButton";
import TutorBookingResume from "@/components/tutor/TutorBookingResume";
import TutorsCard from "@/components/tutor/TutorsCard";
import TutorCard from "@/components/tutor/TutorCard";
import CourseCardList from "@/components/course/CourseCardList";
import CommentsSection from "@/components/tutor/CommentsSection";
import SectionFallback from "@/components/common/SectionFallback";
import Timetable from "@/components/tutor/Timetable";

import { updateFormData } from "../../../utils/slice/bookingSlice";
import { recommendTutorData, tutorStats } from "../../../data/tutors";
import { formatDateDash, formatHour } from "@/utils/timeFormatted-utils";

export default function TutorBooking() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 抓取路由上的tutor id
  const { id: tutor_id } = useParams();

  // 檢查用戶是否已登入
  const { isAuth } = useSelector((state) => state.auth);

  /* -------------------------------- useState -------------------------------- */
  // useState - Whole page loading
  const [loadingState, setLoadingState] = useState(true);
  // useState - 講師基本資料
  const [tutorBasicInfo, setTutorBasicInfo] = useState({
    User: {
      username: "",
      avatar_url: "images/icon/default-tutor-icon.png",
    },
    slogan: "",
    about: "",
    hourly_rate: 0,
    expertise: "",
    rating: "",
    resume: { work_experience: [], education: [], certificates: [] },
    statistics: {},
  });

  // useState - 講師的影片
  const [courses, setCourses] = useState([]);

  // useState - 可預約時間
  const [accumulateAvailableTime, setAccumulateAvailableTime] = useState([]); //儲存已fetch過的時間
  const [currentAvailableTime, setCurrentAvailableTime] = useState([]);
  const [weekOffset, setWeekOffset] = useState(0);
  const [isLoadingAvailableTime, setLoadingAvailableTime] = useState(false);

  // useState - 控制預約Modal的內容的useState - 第一頁: timetable / 第二頁: 選擇服務
  const [isBookingModalOpen, setBookingModalOpen] = useState(false);
  const [currentModalStep, setCurrentModalStep] = useState(1);
  const [selectedServiceType, setSelectedServiceType] = useState();
  const [selectedBookingTimeslots, setSelectedBookingTimeslots] = useState({ date: "", hours: [] });
  const [modalError, setModalError] = useState();

  /* -------------------------------- UI Initialization -------------------------------- */
  // modal
  const bookingModal = useRef(null);
  const bookingModalRef = useRef(null);

  useEffect(() => {
    if (bookingModalRef.current) {
      bookingModal.current = new bootstrap.Modal(bookingModalRef.current, { backdrop: "static" });
    }
  }, []);

  // swiper
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

  /* -------------------------------- Get Data From API -------------------------------- */
  const getTutorBasicData = async () => {
    setLoadingState(true);
    try {
      const [basicInfoResult, experienceResult, educationResult, certificateResult, videos] = await Promise.all([
        tutorApi.getTutorDetail(tutor_id),
        tutorApi.getExp(tutor_id),
        tutorApi.getEdu(tutor_id),
        tutorApi.getCertificate(tutor_id),
        courseApi.getTutorVideosInBooking(tutor_id),
      ]);

      setTutorBasicInfo((prev) => ({
        ...prev,
        ...basicInfoResult.data,
        hourly_rate: Number(basicInfoResult.data.hourly_rate),
        resume: {
          work_experience: experienceResult.data,
          education: educationResult.data,
          certificates: certificateResult.data,
        },
      }));

      setCourses(videos.videos);
    } catch (error) {
      console.log("錯誤", error);
    } finally {
      setLoadingState(false);
    }
  };

  const getAvailabilityData = async () => {
    setLoadingAvailableTime(true);
    try {
      // 計算baseDate
      const today = new Date();
      const dayOffset = weekOffset < 0 ? 0 : weekOffset * 7;
      const baseDate = formatDateDash(formatDateDash(today.setDate(today.getDate() + dayOffset)));

      // 檢查資料是否已經儲在useState裡面
      const existingData = accumulateAvailableTime.find((data) => data.baseDate === baseDate);

      // 如果資料已存在，我們直接拿，不用再fetch API
      if (existingData) {
        setCurrentAvailableTime(existingData.timeSlots);
      } else {
        // 如果不存在，就可以fetch API
        const result = await tutorApi.getAvailability(tutor_id, baseDate);

        // 把剛剛fetch的data存到useState裡面，避免過度fetch API
        const newData = { baseDate, timeSlots: result.data?.slice(7, 14) };
        setAccumulateAvailableTime((prev) => [...prev, newData]);
        setCurrentAvailableTime(result.data?.slice(7, 14));
      }
    } catch (error) {
      console.log("錯誤", error);
    } finally {
      setLoadingAvailableTime(false);
    }
  };

  useEffect(() => {
    //TODO 檢查這個老師是否存在，才可以繼續
    getTutorBasicData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getAvailabilityData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weekOffset]);

  /* -------------------------------- Click Function -------------------------------- */
  // 控制timetable的arrow
  const toNextWeek = async () => {
    setWeekOffset((prev) => prev + 1);
  };

  const toPrevWeek = () => {
    if (weekOffset > 0) {
      setWeekOffset((prev) => prev - 1);
    }
  };

  // 控制Booking Modal的開關
  const openBookingModal = () => {
    if (!isAuth) {
      Swal.fire({
        icon: "error",
        title: "請先登入",
      });
      navigate(`/login?redirect=/tutor/${tutor_id}`);
    } else {
      if (bookingModal.current) {
        bookingModal.current.show();
      }
      setBookingModalOpen(true);
    }
  };

  // 控制Booking Modal的Step
  const toNextModalStep = () => {
    setModalError("");
    // 從Timetable跳轉到選擇service type
    if (currentModalStep === 1) {
      if (selectedBookingTimeslots.date && selectedBookingTimeslots.hours.length > 0) {
        setCurrentModalStep((prev) => prev + 1);
      } else {
        setModalError("請選擇預約日期及時間。");
      }
    }

    // 從選擇service type跳轉到付款頁面
    if (currentModalStep === 2) {
      if (selectedServiceType && selectedBookingTimeslots.date && selectedBookingTimeslots.hours.length > 0) {
        dispatch(updateFormData({ tutor_id: tutor_id }));
        dispatch(updateFormData({ tutor_name: tutorBasicInfo.User.username }));
        dispatch(updateFormData({ booking_date: selectedBookingTimeslots.date }));
        dispatch(updateFormData({ timeslots: selectedBookingTimeslots.hours }));
        dispatch(updateFormData({ price: tutorBasicInfo.hourly_rate * selectedBookingTimeslots.hours.length }));
        dispatch(updateFormData({ service_type: selectedServiceType }));
        bookingModal.current.hide();
        navigate(`/tutor-booking-payment`);
      } else {
        setModalError("請選擇預約服務。");
      }
    }
  };

  // 控制Timetable上選擇時間
  const handleBookingTimeslotsSelect = (date, time) => {
    setSelectedBookingTimeslots((prev) => {
      if (prev.date === date) {
        const newHours = prev.hours.includes(time)
          ? prev.hours.filter((t) => t !== time) // Remove if already selected
          : [...prev.hours, time].sort((a, b) => a - b); // Add & sort

        if (newHours.length === 0) {
          return { date: "", hours: [] }; // Clear both date and hours
        }

        return { ...prev, hours: newHours };
      }

      return { date, hours: [time] }; // Reset hours when new date is selected
    });
  };

  /* -------------------------------- Login Validation -------------------------------- */

  return (
    <>
      <Helmet>
        <title>{tutorBasicInfo?.User.username ? `${tutorBasicInfo.User.username} ｜ 講師詳細` : "Coding∞bit ｜ 講師詳細"}</title>
      </Helmet>
      {/* {loadingState && <Loader />} */}

      <div className="tutor-booking">
        {/*  Main Content */}
        <main className="container py-lg-9 py-7">
          <div className="row">
            {/*  tutor information */}
            <div className="col-lg-8">
              {/*  section 1 - overview */}
              <section className="section position-relative">
                {/*  tutor profile  */}
                <div className="tutor-profile section-component">
                  <div className="flex-shrink-0">
                    <img src={tutorBasicInfo.User.avatar_url} alt="profile" className="object-fit-cover rounded-circle me-6" />
                  </div>
                  <div className="flex-grow-1">
                    {loadingState ? (
                      <>
                        <p className="placeholder-glow">
                          <span className="placeholder bg-brand-01 col-7 placeholder-lg"></span>
                        </p>
                        <p className="placeholder-glow">
                          <span className="placeholder bg-brand-01 col-4"></span>
                        </p>
                      </>
                    ) : (
                      <>
                        <h2 className="mb-2 fs-lg-2 fs-4">{tutorBasicInfo.User.username}</h2>
                        <p className="fs-lg-5 fs-6 text-gray-02">{tutorBasicInfo.slogan}</p>
                      </>
                    )}
                  </div>

                  <p>
                    <span
                      className={`position-absolute top-0 end-0 me-5 mt-3 material-symbols-outlined icon-fill p-2 mb-2 rounded-circle align-middle`}
                      role="button"
                      style={{ backgroundColor: "#1e1e1e66" }}
                    >
                      favorite
                    </span>
                  </p>
                </div>
                {/*  tag list  */}
                <div className="list-x-scroll py-2 section-component">
                  {loadingState ? (
                    <p className="placeholder-glow">
                      <span className="placeholder bg-brand-01 col-8"></span>
                    </p>
                  ) : (
                    tutorBasicInfo.expertise.split(",").map((item) => (
                      <p href="#" className="tag tag-brand-02 fs-8 me-3" key={item}>
                        {item}
                      </p>
                    ))
                  )}
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
                      {loadingState ? (
                        <p className="placeholder-glow">
                          <span className="placeholder bg-brand-01 col-12"></span>
                          <span className="placeholder bg-brand-01 col-12"></span>
                          <span className="placeholder bg-brand-01 col-12"></span>
                        </p>
                      ) : (
                        <ShowMoreButton text={tutorBasicInfo.about} />
                      )}
                    </div>
                    <div className="tab-pane fade" id="resume-tab-pane" role="tabpanel" aria-labelledby="resume-tab" tabIndex="0">
                      <TutorBookingResume resume={tutorBasicInfo.resume} />
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
                  <NavLink to={`/tutor-info/${tutor_id}`} className="text-brand-03 d-flex slide-right-hover" data-show="false">
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

                <div>{courses.length === 0 && <SectionFallback materialIconName="animated_images" fallbackText="講師暫無影片" />}</div>
              </section>

              {/* section 3 - timetable */}
              <section className="section schedule">
                <div className="section-component f-between-center">
                  <h4>時間表</h4>
                </div>
                {currentAvailableTime.length === 0 ? (
                  <SectionFallback materialIconName="event_busy" fallbackText="講師暫無可預約時間" />
                ) : (
                  <Timetable
                    availability={currentAvailableTime}
                    weekOffset={weekOffset}
                    toNextWeek={toNextWeek}
                    toPrevWeek={toPrevWeek}
                    isLoading={isLoadingAvailableTime}
                    isModal={false}
                    openBookingModal={openBookingModal}
                    handleBookingTimeslotsSelect={handleBookingTimeslotsSelect}
                  />
                )}
              </section>

              {/* section 4 - student comment */}

              <CommentsSection modal={false} tutorId={tutor_id} />

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
                        <TutorCard tutor={tutor} />
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            {/* Desktop right CTA card */}
            <div className="col-lg-4 d-lg-block d-none">
              <div className="desktop-cta-card card p-lg-6 p-4 sticky-top">
                <div className="card-body p-0">
                  <div className="mb-lg-6 mb-5">
                    <p className="text-gray-02 fs-7 fs-lg-6">每小時收費</p>
                    <h2 className="text-brand-03 fs-lg-2 fs-3">
                      NT ${" "}
                      {loadingState ? (
                        <span className="placeholder-glow">
                          <span className="placeholder bg-brand-01 col-2"></span>
                        </span>
                      ) : (
                        tutorBasicInfo.hourly_rate
                      )}
                    </h2>
                  </div>

                  <button className="btn slide-right-hover btn-brand-03 w-100" onClick={openBookingModal}>
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
      {/* Modal - Booking Modal */}
      <div className="modal fade booking-modal" id="bookingModal" tabIndex="-1" aria-labelledby="bookingModalLabel" ref={bookingModalRef}>
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
          <div className="modal-content px-3 py-2">
            <div className="modal-header border-0 pb-0">
              {currentModalStep === 2 && (
                <button
                  className="btn btn-link"
                  onClick={() => {
                    setCurrentModalStep(1);
                    setModalError();
                  }}
                >
                  <span className="material-symbols-outlined icon-fill fs-7">arrow_back_ios</span>返回
                </button>
              )}

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  bookingModal.current.hide();
                  setCurrentModalStep(1);
                  setModalError();
                }}
              ></button>
            </div>

            <div className="modal-body pt-0">
              {currentModalStep === 1 && (
                <>
                  <h4 className="modal-title fs-md-2 fs-3 text-center mb-3" id="bookingModalLabel">
                    請選擇預約日期和時間
                  </h4>
                  {selectedBookingTimeslots.date && (
                    <div className="mb-4">
                      <p className="mb-2"> 預約日期: {selectedBookingTimeslots.date} </p>
                      <div className="flex flex-wrap">
                        <p>
                          預約時間:{" "}
                          {selectedBookingTimeslots.hours.map((time) => (
                            <span key={time} className="booking-time me-2 pe-none">
                              {formatHour(time)}
                            </span>
                          ))}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="schedule">
                    {currentAvailableTime.length === 0 ? (
                      <SectionFallback materialIconName="event_busy" fallbackText="講師暫無可預約時間" />
                    ) : (
                      <Timetable
                        availability={currentAvailableTime}
                        weekOffset={weekOffset}
                        toNextWeek={toNextWeek}
                        toPrevWeek={toPrevWeek}
                        isLoading={isLoadingAvailableTime}
                        handleBookingTimeslotsSelect={handleBookingTimeslotsSelect}
                        selectedBookingTimeslots={selectedBookingTimeslots}
                      />
                    )}
                  </div>
                </>
              )}

              {currentModalStep === 2 && (
                <>
                  <h4 className="modal-title fs-md-2 fs-3 text-center mb-3" id="bookingModalLabel">
                    請選擇預約項目
                  </h4>
                  <div className="row row-cols-md-2 g-4 flex-column flex-md-row">
                    <div className="col service-card">
                      <div
                        className="h-100 border-0 cursor-pointer"
                        onClick={() => {
                          setSelectedServiceType("courseSession");
                        }}
                      >
                        <div className={`f-center flex-column bg-gray-04 py-8 px-5 rounded-2 slide-up-hover h-100${selectedServiceType === "courseSession" ? " selected" : ""}`}>
                          <h3 className="fs-4 fs-md-3">一對一教學</h3>
                          <img src="images/deco/Illustration-7.png" alt="one-on-one-illustration" />
                          <p className="text-center mb-auto">以線上Google meeting的形式， 將於預約時間前一天發送會議連結， 講師會於預約時間內進行一對一單獨指導。</p>
                        </div>
                      </div>
                    </div>
                    <div className="col service-card">
                      <div
                        className={`f-center flex-column bg-gray-04 py-8 px-5 rounded-2 slide-up-hover h-100${selectedServiceType === "codeReview" ? " selected" : ""}`}
                        onClick={() => {
                          setSelectedServiceType("codeReview");
                        }}
                      >
                        <div className="f-center flex-column bg-gray-04 py-8 px-5 rounded-2 slide-up-hover h-100">
                          <h3 className="fs-4 fs-md-3">程式碼檢視</h3>
                          <img src="images/deco/Illustration-8.png" alt="code-review-illustration" />
                          <p className="text-center mb-auto">您需要於預約時繳交GitHub Repo， 提供想接受檢視的程式碼， 講師會於預約時間內進行程式碼檢視服務， 並且於時間結束時回覆檢視後的結果。</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="modal-footer p-0 border-top-0">
              <div className="d-flex flex-column align-items-end">
                {modalError && <p className="text-danger mb-3">{modalError}</p>}
                <button type="button" className="btn btn-secondary fs-7 fs-md-6 py-2" onClick={toNextModalStep}>
                  下一步
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal - Student Comment Modal */}
      <CommentsSection modal={true} tutorId={tutor_id} />

      {/* Mobile sticky bottom CTA card */}
      <div className="mobile-bottom-cta d-lg-none sticky-bottom border border-2 border-brand-02 bg-white" style={{ borderRadius: "16px 16px 0px 0px" }}>
        <div className="pt-4 pb-6 px-4">
          <div className="f-between-center">
            <div>
              <p className="text-gray-02 fs-7 fs-lg-6">每小時收費</p>
              <h2 className="text-brand-03 fs-lg-2 fs-3">NT ${tutorBasicInfo.hourly_rate}</h2>
            </div>

            <button className="btn slide-right-hover btn-brand-03" onClick={openBookingModal}>
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
