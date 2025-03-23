import { useEffect, useRef, useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import * as bootstrap from "bootstrap";
import Swal from "sweetalert2";
import { Swiper } from "swiper";
import { Autoplay, Navigation } from "swiper/modules";

import courseApi from "@/api/courseApi";
import tutorApi from "@/api/tutorApi";

import SectionFallback from "@/components/common/SectionFallback";
import ShowMoreButton from "@/components/common/ShowMoreButton";
import CourseCardList from "@/components/course/CourseCardList";
import Timetable from "@/components/tutor/Timetable";
import TutorBookingResume from "@/components/tutor/TutorBookingResume";
import TutorCard from "@/components/tutor/TutorCard";
import TutorCardLoadingSkeleton from "@/components/tutor/TutorCardLoadingSkeleton";
import TutorsCard from "@/components/tutor/TutorsCard";
import CommentCard from "@/components/tutor/CommentCard";
import CommentRatingStat from "@/components/tutor/CommentRatingStat";

import { formatDateDash, formatHour } from "@/utils/timeFormatted-utils";
import CourseCardLoadingSkeleton from "@/components/course/CourseCardLoadingSkeleton";
import { updateFormData } from "@/utils/slice/bookingSlice";

export default function TutorBooking() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 抓取路由上的tutor id
  const { id: tutor_id } = useParams();

  // redux - 檢查用戶是否已登入
  const { isAuth } = useSelector((state) => state.auth);
  // redux - 拿取使用者資訊
  const userData = useSelector((state) => state.auth.userData);

  /* -------------------------------- useState -------------------------------- */
  // useState - Whole page loading
  const [loadingBasicInfoState, setLoadingBasicInfoState] = useState(true);

  // useState - 講師基本資料
  const [tutorBasicInfo, setTutorBasicInfo] = useState({
    User: {
      username: "",
      avatar_url: "images/icon/user.png",
    },
    slogan: "",
    about: "",
    hourly_rate: 0,
    expertise: "",
    rating: "",
    resume: { work_experience: [], education: [], certificates: [] },
    statistics: { student_count: 0, class_count: 0, video_count: 0 },
  });

  // useState - 講師的影片
  const [courses, setCourses] = useState([]);

  // useState - 推薦老師
  const [recommendTutor, setRecommendTutor] = useState([]);
  const [loadingRecommendTutorState, setLoadingRecommendTutorState] = useState(true);

  // useState - 可預約時間
  const [accumulateAvailableTime, setAccumulateAvailableTime] = useState({ tutorId: "", baseDateList: [] }); //儲存已fetch過的時間
  const [currentAvailableTime, setCurrentAvailableTime] = useState([]);
  const [weekOffset, setWeekOffset] = useState(0);
  const [isLoadingAvailableTime, setLoadingAvailableTime] = useState(false);

  // useState - 控制預約Modal的內容的useState - 第一頁: timetable / 第二頁: 選擇服務
  // eslint-disable-next-line no-unused-vars
  const [isBookingModalOpen, setBookingModalOpen] = useState(false);
  const [currentModalStep, setCurrentModalStep] = useState(1);
  const [selectedServiceType, setSelectedServiceType] = useState();
  const [selectedBookingTimeslots, setSelectedBookingTimeslots] = useState({ date: "", hours: [] });
  const [modalError, setModalError] = useState();

  // useState - Bookmark
  const [isBookmark, setBookmark] = useState(false);

  // useState - Comment
  const [isLoadingRatingStats, setLoadingRatingStatsState] = useState(false);
  const [isLoadingComment, setLoadingCommentState] = useState(false);
  const [comments, setComments] = useState([]);
  const [ratingStats, setRatingStats] = useState({
    average_rating: 0,
    total_comment_count: 0,
    rating_distribute: {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    },
  });

  const [modalPage, setModalPage] = useState(2);
  const [hasMoreComments, setHasMoreComments] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [modalComments, setModalComments] = useState([]);

  /* -------------------------------- UI Initialization -------------------------------- */
  // modal
  const bookingModal = useRef(null);
  const bookingModalRef = useRef(null);

  const commentModal = useRef(null);
  const commentModalRef = useRef(null);

  useEffect(() => {
    if (bookingModalRef.current) {
      bookingModal.current = new bootstrap.Modal(bookingModalRef.current, { backdrop: "static" });
    }

    if (commentModalRef.current) {
      commentModal.current = new bootstrap.Modal(commentModalRef.current, { backdrop: "static" });
    }
  }, [tutor_id]);

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
  }, [tutor_id, recommendTutor]);

  /* -------------------------------- Get Data From API -------------------------------- */
  const checkIsValidTutor = useCallback(async () => {
    setLoadingBasicInfoState(true);
    try {
      await Promise.all([tutorApi.getTutorDetail(tutor_id)]);
    } catch {
      Swal.fire({
        icon: "error",
        title: "此講師不存在",
      });
      navigate("/tutor-list");
    } finally {
      setLoadingBasicInfoState(false);
    }
  }, [tutor_id, navigate]);

  const getTutorBasicData = useCallback(async () => {
    setLoadingBasicInfoState(true);
    try {
      const [basicInfoResult, experienceResult, educationResult, certificateResult, courseVideos, singleVideos] = await Promise.all([
        tutorApi.getTutorDetail(tutor_id),
        tutorApi.getExp(tutor_id),
        tutorApi.getEdu(tutor_id),
        tutorApi.getCertificate(tutor_id),
        courseApi.getTutorCourses(tutor_id, 1),
        courseApi.getTutorVideos(tutor_id, "customLearning", 1),
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
        statistics: { student_count: basicInfoResult.data.studentCount, class_count: basicInfoResult.data.classCount, video_count: basicInfoResult.data.videoCount },
      }));

      setCourses([...courseVideos.courses, ...singleVideos.videos]);
    } catch (error) {
      console.log("錯誤", error);
    } finally {
      setLoadingBasicInfoState(false);
    }
  }, [tutor_id]);

  const getTutorBookmark = useCallback(async () => {
    try {
      const result = await tutorApi.getTutorBookmark(tutor_id);
      setBookmark(result);
    } catch (error) {
      console.log("錯誤", error);
    }
  }, [tutor_id]);

  const getAvailabilityData = useCallback(async () => {
    setLoadingAvailableTime(true);
    try {
      if (accumulateAvailableTime.tutorId !== tutor_id) {
        const today = new Date();
        const baseDate = formatDateDash(today);
        const result = await tutorApi.getAvailability(tutor_id, baseDate);
        setWeekOffset(0);
        setAccumulateAvailableTime({ tutorId: tutor_id, baseDateList: [{ baseDate, timeSlots: result.data?.slice(7, 14) }] });
        setCurrentAvailableTime(result.data?.slice(7, 14));
      } else {
        const today = new Date();
        const dayOffset = weekOffset < 0 ? 0 : weekOffset * 7;
        const baseDate = formatDateDash(formatDateDash(today.setDate(today.getDate() + dayOffset)));

        const existingData = accumulateAvailableTime.baseDateList.find((data) => data.baseDate === baseDate);

        if (existingData) {
          setCurrentAvailableTime(existingData.timeSlots);
        } else {
          const result = await tutorApi.getAvailability(tutor_id, baseDate);
          const newData = { baseDate, timeSlots: result.data?.slice(7, 14) };

          setAccumulateAvailableTime({ ...accumulateAvailableTime, baseDateList: [...accumulateAvailableTime.baseDateList, newData] });
          setCurrentAvailableTime(result.data?.slice(7, 14));
        }
      }
    } catch (error) {
      console.log("錯誤", error);
    } finally {
      setLoadingAvailableTime(false);
    }
  }, [tutor_id, weekOffset, accumulateAvailableTime]);

  const getRecommendTutor = useCallback(async () => {
    setLoadingRecommendTutorState(true);
    try {
      const result = (await tutorApi.getAllTutor(1, "rating", "DESC", "", 20)).tutors;
      const resultWithoutCurrentTutor = result.filter((tutor) => tutor.id !== tutor_id);

      setRecommendTutor(resultWithoutCurrentTutor.sort(() => Math.random() - 0.5).slice(0, 4));
    } catch (error) {
      console.log("錯誤", error);
    } finally {
      setLoadingRecommendTutorState(false);
    }
  }, [tutor_id]);

  const getRatingStats = useCallback(async () => {
    setLoadingRatingStatsState(true);
    try {
      const result = await tutorApi.getTutorRatingStats(tutor_id);
      setRatingStats(result);
    } catch (error) {
      console.log("錯誤", error);
    } finally {
      setLoadingRatingStatsState(false);
    }
  }, [tutor_id]);

  const getStudentComments = useCallback(
    async (page = 1, limit = 3) => {
      setLoadingCommentState(true);
      try {
        const result = await tutorApi.getTutorAllStudentComments({ tutorId: tutor_id, page, limit });
        setComments(result.data);
      } catch (error) {
        console.error("錯誤", error);
      } finally {
        setLoadingCommentState(false);
      }
    },
    [tutor_id]
  );

  const getModalStudentComments = useCallback(
    async (page, limit) => {
      if (isFetchingMore) return; // Prevent multiple calls
      setIsFetchingMore(true);
      try {
        const result = await tutorApi.getTutorAllStudentComments({ tutorId: tutor_id, page, limit });

        if (result.data.length > 0) {
          setModalComments((prevComments) => [...prevComments, ...result.data]); // Append new comments
          setModalPage(page + 1);
        } else {
          setHasMoreComments(false); // No more data to load
        }
      } catch (error) {
        console.error("錯誤", error);
      } finally {
        setIsFetchingMore(false);
      }
    },
    [isFetchingMore, tutor_id]
  );

  useEffect(() => {
    (async () => {
      if (tutor_id) {
        /* ------------------ Check if Tutor Exists ----------------- */
        await checkIsValidTutor();
        /* ------------------ Fetch Data ----------------- */
        getTutorBasicData();
        getRecommendTutor();
        getTutorBookmark();
        getRatingStats();
        getStudentComments();
      }
    })();
  }, [tutor_id, checkIsValidTutor, getTutorBasicData, getRecommendTutor, getTutorBookmark, getRatingStats, getStudentComments]);

  useEffect(() => {
    getAvailabilityData();
  }, [weekOffset, tutor_id, getAvailabilityData]);

  /* -------------------------------- Click Function -------------------------------- */

  // Bookmark Tutor
  const handleTutorBookmark = async () => {
    try {
      if (!isAuth) {
        Swal.fire({
          icon: "error",
          title: `請先登入`,
        });
        return;
      }
      if (isBookmark) {
        await tutorApi.removeBookmarkTutor(tutor_id);
      } else {
        await tutorApi.bookmarkTutor(tutor_id);
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: `${!isBookmark ? "收藏導師失敗" : "取消收藏導師失敗"}`,
      });
    } finally {
      getTutorBookmark();
    }
  };

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
    // 檢查用戶是否登入
    if (!isAuth) {
      Swal.fire({
        icon: "error",
        title: "請先登入",
      });
      navigate(`/login?redirect=/tutor/${tutor_id}`);
    } else if (userData?.subscriptions.length === 0 || !userData.subscriptions) {
      // 檢查用戶是否為基本會員或高級會員
      Swal.fire({
        title: "一對一教學預約服務僅限基本會員或高級會員唷",
        showCancelButton: true,
        confirmButtonText: "前往訂閱頁面",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/subscription-list");
        }
      });
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

  const openCommentModal = () => {
    if (commentModal.current) {
      setModalComments([]);
      getModalStudentComments(1, 10); // Fetch comments for the current tutor
      commentModal.current.show();
    }
  };

  /* -------------------------------- Comment Modal Infinite Scroll -------------------------------- */
  const commentModalBodyRef = useRef(null);

  const handleScroll = useCallback(() => {
    if (!commentModalBodyRef.current || !hasMoreComments || isFetchingMore) return;

    const { scrollTop, scrollHeight, clientHeight } = commentModalBodyRef.current;

    if (scrollTop + clientHeight >= scrollHeight) {
      getModalStudentComments(modalPage, 10);
    }
  }, [modalPage, hasMoreComments, isFetchingMore, getModalStudentComments]);

  useEffect(() => {
    const modalBody = commentModalBodyRef.current; // Store the ref value in a variable

    if (modalBody) {
      modalBody.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (modalBody) {
        modalBody.removeEventListener("scroll", handleScroll);
      }
    };
  }, [modalPage, hasMoreComments, handleScroll]);

  return (
    <>
      <Helmet>
        <title>{tutorBasicInfo?.User.username ? `${tutorBasicInfo.User.username} ｜ 講師詳細` : "Coding∞bit ｜ 講師詳細"}</title>
      </Helmet>
      <div className="tutor-booking">
        {/*  Main Content */}
        <main className="container py-7 py-lg-9">
          <div className="row">
            {/*  tutor information */}
            <div className="col-lg-8">
              {/*  section 1 - overview */}
              <section className="position-relative section">
                {/*  tutor profile  */}
                <div className="section-component tutor-profile">
                  <div className="flex-shrink-0">
                    {loadingBasicInfoState ? (
                      <p className="placeholder-glow">
                        <span className="bg-brand-02 rounded-circle me-4 placeholder" style={{ width: "64px", height: "64px" }}></span>
                      </p>
                    ) : (
                      <img src={tutorBasicInfo.User.avatar_url || "images/icon/user.png"} alt="profile" className="rounded-circle me-6 object-fit-cover" />
                    )}
                  </div>
                  <div className="flex-grow-1">
                    {loadingBasicInfoState ? (
                      <>
                        <p className="placeholder-glow">
                          <span className="col-7 bg-brand-02 placeholder placeholder-lg"></span>
                        </p>
                        <p className="placeholder-glow">
                          <span className="col-4 bg-brand-02 placeholder"></span>
                        </p>
                      </>
                    ) : (
                      <>
                        <h2 className="fs-4 fs-lg-2 mb-2">{tutorBasicInfo.User.username}</h2>
                        <p className="text-gray-02 fs-6 fs-lg-5">{tutorBasicInfo.slogan}</p>
                      </>
                    )}
                  </div>

                  <p>
                    <span
                      className={`position-absolute top-0 end-0 me-5 mt-5 material-symbols-outlined icon-fill p-2 mb-2 rounded-circle align-middle ${isBookmark ? "text-brand-01" : "text-gray-03"}`}
                      role="button"
                      style={{ backgroundColor: "#1e1e1e66" }}
                      onClick={handleTutorBookmark}
                    >
                      favorite
                    </span>
                  </p>
                </div>
                {/*  tag list  */}
                <div className="list-x-scroll py-2 section-component">
                  {loadingBasicInfoState ? (
                    <p className="placeholder-glow">
                      <span className="col-8 bg-brand-02 placeholder"></span>
                    </p>
                  ) : (
                    tutorBasicInfo.expertise.split(",").map((item) => (
                      <p href="#" className="fs-8 me-3 tag tag-brand-02" key={item}>
                        {item}
                      </p>
                    ))
                  )}
                </div>
                {/*  tab  */}
                <div className="section-component">
                  <ul className="flex-nowrap list-x-scroll nav nav-tabs mb-6" id="myTab" role="tablist">
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
                    <div className="active fade show tab-pane" id="about-me-tab-pane" role="tabpanel" aria-labelledby="about-me-tab" tabIndex="0">
                      {loadingBasicInfoState ? (
                        <p className="placeholder-glow">
                          <span className="col-12 bg-brand-02 placeholder"></span>
                          <span className="col-12 bg-brand-02 placeholder"></span>
                          <span className="col-12 bg-brand-02 placeholder"></span>
                        </p>
                      ) : (
                        <ShowMoreButton text={tutorBasicInfo.about} />
                      )}
                    </div>
                    <div className="fade tab-pane" id="resume-tab-pane" role="tabpanel" aria-labelledby="resume-tab" tabIndex="0">
                      <TutorBookingResume resume={tutorBasicInfo.resume} />
                    </div>
                  </div>
                  {/* statistics */}
                  <div className="g-3 row row-cols-3 mt-5">
                    <div className="col">
                      <div className="stat-overview-card">
                        {loadingBasicInfoState ? (
                          <p className="placeholder-glow" style={{ width: "50%" }}>
                            <span className="col-12 bg-brand-02 placeholder placeholder-lg"></span>
                          </p>
                        ) : (
                          <h4 className="text-brand-03">{tutorBasicInfo.statistics.student_count}</h4>
                        )}

                        <p className="fs-7">學生</p>
                      </div>
                    </div>
                    <div className="col">
                      <div className="stat-overview-card">
                        {loadingBasicInfoState ? (
                          <p className="placeholder-glow" style={{ width: "50%" }}>
                            <span className="col-12 bg-brand-02 placeholder placeholder-lg"></span>
                          </p>
                        ) : (
                          <h4 className="text-brand-03">{tutorBasicInfo.statistics.class_count}</h4>
                        )}
                        <p className="fs-7">課堂</p>
                      </div>
                    </div>
                    <div className="col">
                      <div className="stat-overview-card">
                        {loadingBasicInfoState ? (
                          <p className="placeholder-glow" style={{ width: "50%" }}>
                            <span className="col-12 bg-brand-02 placeholder placeholder-lg"></span>
                          </p>
                        ) : (
                          <h4 className="text-brand-03">{tutorBasicInfo.statistics.video_count}</h4>
                        )}
                        <p className="fs-7">影片</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* section 2 - video list */}
              <section className="section">
                <div className="f-between-center section-component">
                  <h4>講師影片</h4>

                  {!loadingBasicInfoState && courses.length > 0 && (
                    <NavLink to={`/tutor-info/${tutor_id}`} className="d-flex text-brand-03 slide-right-hover" data-show="false">
                      <p>更多</p>
                      <span className="icon-fill material-symbols-outlined">arrow_forward</span>
                    </NavLink>
                  )}
                </div>

                <div className="freeTipShortsSwiper swiper">
                  <div className="swiper-wrapper">
                    {loadingBasicInfoState &&
                      Array.from({ length: 2 }, (_, i) => (
                        <div className="swiper-slide" key={i}>
                          <CourseCardLoadingSkeleton />
                        </div>
                      ))}

                    {!loadingBasicInfoState &&
                      courses.map((course) => (
                        <div className="swiper-slide" key={course.id}>
                          {course.video_type === "topicSeries" ? <CourseCardList courseList={course} cardsNum={1} /> : <CourseCardList courseList={course} cardsNum={1} type="singleVideo" />}
                        </div>
                      ))}
                  </div>
                </div>

                <div>{!loadingBasicInfoState && courses.length === 0 && <SectionFallback materialIconName="animated_images" fallbackText="講師暫無影片" />}</div>
              </section>

              {/* section 3 - timetable */}
              <section className="schedule section">
                <div className="f-between-center section-component">
                  <h4>時間表</h4>
                </div>

                {currentAvailableTime.length > 0 && (
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
                {!isLoadingAvailableTime && currentAvailableTime.length === 0 && <SectionFallback materialIconName="event_busy" fallbackText="講師暫無可預約時間" />}
              </section>

              {/* section 4 - student comment */}

              <section className="section student-comment">
                <div className="f-between-center section-component">
                  <h4>學生評價</h4>

                  {!isLoadingComment && comments.length > 0 && (
                    <p className="d-flex text-brand-03 cursor-pointer slide-right-hover" onClick={openCommentModal}>
                      更多
                      <span className="icon-fill material-symbols-outlined">arrow_forward</span>
                    </p>
                  )}
                </div>

                <div className="g-2 g-lg-4 row row-cols-1 row-cols-lg-2">
                  <div className="col">{isLoadingRatingStats ? <CommentRatingStat isLoading={true} /> : ratingStats.total_comment_count > 0 && <CommentRatingStat ratingStats={ratingStats} />}</div>

                  {isLoadingComment && Array.from({ length: 3 }, (_, i) => <CommentCard key={i} isLoading={isLoadingComment} />)}
                  {!isLoadingComment && comments.length > 0 && comments.map((comment) => <CommentCard comment={comment} key={comment.commentId} />)}
                </div>
                {!isLoadingComment && comments.length === 0 && <SectionFallback materialIconName="reviews" fallbackText={`講師暫無學生評價`} />}
              </section>

              {/* section 5 - tutor recommendation */}
              <section className="mb-0 section">
                <div className="f-between-center section-component">
                  <h4>推薦講師</h4>
                  <NavLink to="/tutor-list" className="d-flex text-brand-03 slide-right-hover">
                    <p>更多</p>
                    <span className="icon-fill material-symbols-outlined">arrow_forward</span>
                  </NavLink>
                </div>

                {/* desktop */}
                {loadingRecommendTutorState ? (
                  <div className="d-lg-flex d-none g-lg-4 row row-cols-lg-2">
                    {Array.from({ length: 4 }, (_, i) => (
                      <TutorCardLoadingSkeleton key={i} />
                    ))}
                  </div>
                ) : (
                  <TutorsCard tutorList={recommendTutor} cardsNum={2} />
                )}

                {/* mobile */}
                <div className="d-block d-lg-none swiper tutor-card-swiper">
                  <div className="mb-10 py-5 swiper-wrapper">
                    {loadingRecommendTutorState &&
                      Array.from({ length: 4 }, (_, i) => (
                        <div className="swiper-slide" key={i}>
                          <TutorCardLoadingSkeleton />
                        </div>
                      ))}
                    {!loadingRecommendTutorState &&
                      recommendTutor.map((tutor) => (
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
              <div className="card p-4 p-lg-6 desktop-cta-card sticky-top">
                <div className="card-body p-0">
                  <div className="mb-5 mb-lg-6">
                    <p className="text-gray-02 fs-7 fs-lg-6">每小時收費</p>
                    <h2 className="text-brand-03 fs-3 fs-lg-2">
                      NT ${" "}
                      {loadingBasicInfoState ? (
                        <span className="placeholder-glow">
                          <span className="col-2 bg-brand-02 placeholder"></span>
                        </span>
                      ) : (
                        tutorBasicInfo.hourly_rate
                      )}
                    </h2>
                  </div>

                  <button className="btn btn-brand-03 w-100 slide-right-hover" onClick={openBookingModal}>
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
      <div className="modal booking-modal fade" id="bookingModal" tabIndex="-1" aria-labelledby="bookingModalLabel" ref={bookingModalRef}>
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
                  <span className="fs-7 icon-fill material-symbols-outlined">arrow_back_ios</span>返回
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
                  <h4 className="modal-title text-center fs-3 fs-md-2 mb-3" id="bookingModalLabel">
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
                  <h4 className="modal-title text-center fs-3 fs-md-2 mb-3" id="bookingModalLabel">
                    請選擇預約項目
                  </h4>
                  <div className="flex-column flex-md-row g-4 row row-cols-md-2">
                    <div className="col service-card">
                      <div
                        className="border-0 h-100 cursor-pointer"
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
                        <div className="flex-column bg-gray-04 h-100 rounded-2 f-center px-5 py-8 slide-up-hover">
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

            <div className="modal-footer border-top-0 p-0">
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
      <div className="modal fade student-comment-modal" id="commentModal" tabIndex="-1" ref={commentModalRef}>
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
          <div className="modal-content">
            <div className="modal-header border-0 pb-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  commentModal.current.hide();
                }}
              ></button>
            </div>
            <div className="modal-body overflow-y-scroll" ref={commentModalBodyRef}>
              <h4 className="modal-title text-center fs-3 fs-md-2 mb-8">學生評價</h4>
              <div className="flex-column row mb-6">
                <div className="col mb-2">
                  <CommentRatingStat ratingStats={ratingStats} />
                </div>

                <div className="flex-column g-2 row mb-2">
                  {modalComments?.map((comment) => (
                    <CommentCard comment={comment} key={comment.commentId} />
                  ))}
                </div>

                {isFetchingMore && (
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="text-primary spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky bottom CTA card */}
      <div className="d-lg-none bg-white border border-2 border-brand-02 mobile-bottom-cta sticky-bottom" style={{ borderRadius: "16px 16px 0px 0px" }}>
        <div className="pb-6 pt-4 px-4">
          <div className="f-between-center">
            <div>
              <p className="text-gray-02 fs-7 fs-lg-6">每小時收費</p>
              <h2 className="text-brand-03 fs-3 fs-lg-2">NT ${tutorBasicInfo.hourly_rate}</h2>
            </div>

            <button className="btn btn-brand-03 slide-right-hover" onClick={openBookingModal}>
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
