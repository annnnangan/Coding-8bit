import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";

import { Swiper } from "swiper";

import DashboardSection from "@/components/common/DashboardSection";
import SectionFallback from "@/components/common/SectionFallback";
import CourseCard from "@/components/course/CourseCard";
import BookingCard from "../../components/common/booking-record/BookingCard";
import BookingCardLoadingSkeleton from "../../components/common/booking-record/BookingCardLoadingSkeleton";

import bookingApi from "@/api/bookingApi";
import { dashboardRecommendCourseList } from "../../data/courses";

export default function TutorPanel() {
  const tutorId = useSelector((state) => state.auth?.userData?.tutor_id);
  const [recentBookings, setRecentBookings] = useState([]);
  const [loadingRecentBookings, setLoadingRecentBookings] = useState(false);

  const getBookingListData = async () => {
    setLoadingRecentBookings(true);
    try {
      const result = (await bookingApi.getTutorBookings({ tutorId, status: "in_progress", limit: 2 })).bookings;

      const formattedResult = result.map((item) => {
        const timeslots = Object.keys(item.hourly_availability)
          .filter((hour) => item.hourly_availability[hour])
          .map(Number);

        return { ...item, timeslots }; // convert hourly_availability to array and keep only true value
      });

      setRecentBookings(formattedResult);
    } catch (error) {
      console.log("錯誤", error);
    } finally {
      setLoadingRecentBookings(false);
    }
  };

  useEffect(() => {
    if (tutorId) {
      getBookingListData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tutorId]);

  // 初始化 - swiper
  useEffect(() => {
    new Swiper(".swiper", {
      slidesPerView: 3,
      spaceBetween: 24,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },

      breakpoints: {
        1700: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        1000: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        0: {
          slidesPerView: 1,
          spaceBetween: 24,
        },
      },
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Coding∞bit ｜ 講師儀表板</title>
      </Helmet>

      <main className="container-fluid">
        <div className="row">
          {/* Left */}
          <div className="col-xxl-8">
            <DashboardSection title="即將到來的預約" withNavLink={true} navLinkText={"所有預約"} navLinkHref={"/tutor-panel/booking"} className="mb-2 mb-xxl-8">
              <div className="row flex-wrap g-2">
                {loadingRecentBookings &&
                  Array.from({ length: 2 }, (_, i) => (
                    <div className="col-12 col-md-6" key={i}>
                      <BookingCardLoadingSkeleton />
                    </div>
                  ))}

                {!loadingRecentBookings &&
                  recentBookings.length > 0 &&
                  recentBookings.map((booking) => (
                    <div key={booking.id} className="col-12 col-md-6">
                      <BookingCard role={"tutor"} booking={booking} type="dashboard" />
                    </div>
                  ))}

                {!loadingRecentBookings && recentBookings.length === 0 && <SectionFallback materialIconName="calendar_clock" fallbackText={`暫無預約`} />}
              </div>
            </DashboardSection>

            <DashboardSection title="以下課程有新留言" withNavLink={true} navLinkText={"所有課程"} navLinkHref={"/student-panel/learning"} className="mb-2 mb-xxl-0">
              <div className="swiper">
                <div className="swiper-wrapper">
                  {dashboardRecommendCourseList.map((course) => (
                    <div className="swiper-slide" key={course.id}>
                      <CourseCard course={course} />
                    </div>
                  ))}
                </div>
              </div>
            </DashboardSection>
          </div>

          {/* Right */}
          <div className="col-xxl-4">
            <DashboardSection title="目前擁有" withNavLink={false} className="mb-2 mb-xxl-8">
              <div className="f-center gap-5">
                <div className="rounded-4 bg-white f-center flex-column" style={{ height: "180px", width: "180px" }}>
                  <p className="fs-2 fw-bold text-brand-03 d-flex">
                    3 <span className="fs-7 fw-medium align-self-center ms-1">個</span>
                  </p>
                  <p>主題式系列課程</p>
                </div>
                <div className="rounded-4 bg-white f-center flex-column" style={{ height: "180px", width: "180px" }}>
                  <p className="fs-2 fw-bold text-brand-03 d-flex">
                    30 <span className="fs-7 fw-medium align-self-center ms-1">小時</span>
                  </p>
                  <p>教學影片</p>
                </div>
              </div>
            </DashboardSection>

            <DashboardSection title="講師資料" withNavLink={false}>
              <div className="f-center gap-5">
                <div className="rounded-4 bg-white f-center flex-column" style={{ height: "180px", width: "180px" }}>
                  <p className="fs-2 fw-bold text-brand-03 d-flex"> 4.0 </p>
                  <p>評分</p>
                </div>
                <div className="rounded-4 bg-white f-center flex-column" style={{ height: "180px", width: "180px" }}>
                  <p className="fs-2 fw-bold text-brand-03 d-flex"> 26 </p>
                  <p>評價數</p>
                </div>
              </div>
            </DashboardSection>
          </div>
        </div>
      </main>
    </>
  );
}
