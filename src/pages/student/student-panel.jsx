import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";

import { Swiper } from "swiper";

import CourseCard from "../../components/course/CourseCard";
import DashboardSection from "../../components/common/DashboardSection";
import NavLinkButton from "../../components/common/NavLinkButton";

import { dashboardContinueToWatchCourseList, dashboardRecommendCourseList } from "../../data/courses";
import { userBookedTutor } from "../../data/tutors";
import { userBookingData } from "../../data/bookings";
import AvatarWithFallback from "../../components/common/AvatarWithFallback";
import { NavLink } from "react-router-dom";
import BookingCard from "../../components/common/booking-record/BookingCard";

export default function StudentPanel() {
  const [wish, setWish] = useState("");

  const handleWishChange = (event) => {
    setWish(event.target.value);
  };

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
        <title>Coding∞bit ｜ 學生儀表板</title>
      </Helmet>

      <main className="container-fluid">
        <div className="row">
          {/* Left */}
          <div className="col-xxl-8">
            <DashboardSection title="2025年02月的預約" withNavLink={true} navLinkText={"所有預約"} navLinkHref={"/student-panel/booking"} className="mb-2 mb-xxl-8">
              <div className="row flex-wrap g-2">
                {userBookingData.map((booking) => (
                  <div key={booking.id} className="col-12 col-md-6">
                    <BookingCard booking={booking} />
                  </div>
                ))}
              </div>
            </DashboardSection>
            <DashboardSection title="繼續觀看" withNavLink={true} navLinkText={"所有課程"} navLinkHref={"/student-panel/learning"} className="mb-2 mb-xxl-8">
              <div className="swiper">
                <div className="swiper-wrapper">
                  {dashboardContinueToWatchCourseList.map((course) => (
                    <div className="swiper-slide" key={course.id}>
                      <CourseCard course={course} />
                    </div>
                  ))}
                </div>
              </div>
            </DashboardSection>

            <DashboardSection title="為你推薦課程" withNavLink={true} navLinkText={"所有課程"} navLinkHref={"/student-panel/learning"} className="mb-2 mb-xxl-0">
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
            <DashboardSection title="已完成" withNavLink={false} className="mb-2 mb-xxl-8">
              <div className="f-center gap-5">
                <div className="rounded-4 bg-white f-center flex-column" style={{ height: "180px", width: "180px" }}>
                  <p className="fs-2 fw-bold text-brand-03 d-flex">
                    50 <span className="fs-7 fw-medium align-self-center ms-1">小時</span>
                  </p>
                  <p>教學影片</p>
                </div>
                <div className="rounded-4 bg-white f-center flex-column" style={{ height: "180px", width: "180px" }}>
                  <p className="fs-2 fw-bold text-brand-03 d-flex">
                    10 <span className="fs-7 fw-medium align-self-center ms-1">小時</span>
                  </p>
                  <p>預約影片</p>
                </div>
              </div>
            </DashboardSection>

            <DashboardSection title="我的許願" description="我希望可以有人解答我這個問題..." withNavLink={false} className="mb-2 mb-xxl-8">
              <input type="text" name="wish" className="form-control mb-4" placeholder="ex. CSS 毛玻璃製作效果" value={wish} onChange={handleWishChange} />
              <NavLinkButton type="button" text={"馬上許願"} href={`/add-learning-need?title=${wish}`} />
            </DashboardSection>

            <DashboardSection title="曾預約老師" withNavLink={false}>
              <div className="d-flex flex-column gap-3">
                {userBookedTutor.map((tutor) => (
                  <div className="card gradient-border p-6" key={tutor.id}>
                    <div className="d-flex justify-content-between">
                      <AvatarWithFallback image={tutor.avatar} name={tutor.name}>
                        <p className="fs-7 text-gray-02">NT ${tutor.pricePerHour} / 小時</p>
                      </AvatarWithFallback>
                      <div>
                        <NavLink to={`/tutor/${tutor.id}`} className="d-flex align-items-center">
                          <div className="rounded-circle bg-brand-02 d-flex align-items-center justify-content-center cursor-pointer" style={{ height: "44px", width: "44px" }}>
                            <span className="material-symbols-outlined icon-fill text-brand-03">calendar_clock</span>
                          </div>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </DashboardSection>
          </div>
        </div>
      </main>
    </>
  );
}
