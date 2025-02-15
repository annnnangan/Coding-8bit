import { createHashRouter } from "react-router-dom";

// Layout
import UserLayout from "../router/UserLayout";
import TutorLayout from "../router/TutorLayout";
import NotFound from "../pages/NotFound";

// 使用者前台
import Home from "../pages/user/Home";

import Login from "../pages/user/auth/login";
import Signup from "../pages/user/auth/signup";
import ActivateSuccess from "../pages/user/auth/activate-success";
import ForgotPassword from "../pages/user/auth/forgot-password";
import ResetPassword from "../pages/user/auth/reset-password";

import CourseList from "../pages/user/course/course-list";
import CourseListPage from "../pages/user/course/course-list-page";
import CourseVideoPage from "../pages/user/course/course-video-page";

import CustomCourseList from "../pages/user/custom-course/custom-course-list";
import AddLearningNeedPage from "../pages/user/custom-course/add-learning-need-page";

import SubscriptionList from "../pages/user/subscription/subscription-list";
import SubscriptionPayment from "../pages/user/subscription/subscription-payment";

import TutorList from "../pages/user/tutor/tutor-list";
import TutorBooking from "../pages/user/tutor/tutor-booking";
import TutorBookingPaymentStep1 from "../pages/user/tutor/booking-payment/step1";
import TutorBookingPaymentStep2 from "../pages/user/tutor/booking-payment/step2";
import TutorBookingSuccess from "../pages/user/tutor/booking-payment/booking-success";
import TutorInfo from "../pages/user/tutor/tutor-info";

import HelpCenter from "../pages/user/help-center";

// 使用者後台 - 講師
import TutorPanel from "../pages/tutor/tutor-panel";

import TutorManageBooking from "../pages/tutor/bookings/tutor-manage-bookings";

import TutorManageCourses from "../pages/tutor/courses/tutor-manage-courses";
import TutorManageAddTopicSeries from "../pages/tutor/courses/tutor-addCourses-topicSeries";
import TutorManageEditTopicSeries from "../pages/tutor/courses/tutor-editCourses-topicSeries ";
import TutorManageTopicSeriesChapter from "../pages/tutor/courses/tutor-chapter-topicSeries";
import TutorManageAddVideo from "../pages/tutor/courses/tutor-addVideo";

// 使用者後台 - 學生
import StudentLayout from "./StudentLayout";
import StudentPanel from "../pages/student/student-panel";
import StudentProfile from "../pages/student/student-profile";

export const router = createHashRouter([
  {
    // 前台
    path: "/",
    element: <UserLayout />,
    children: [
      { index: true, element: <Home /> },
      
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "activate-success", element: <ActivateSuccess /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password", element: <ResetPassword /> },

      { path: "course-list", element: <CourseList /> },
      { path: "course", element: <CourseListPage /> },
      { path: "course/:id", element: <CourseVideoPage /> },

      { path: "custom-course-list", element: <CustomCourseList /> },
      { path: "add-learning-need", element: <AddLearningNeedPage /> },

      { path: "subscription-list", element: <SubscriptionList /> },
      { path: "subscription/:subscriptionPlan/:duration", element: <SubscriptionPayment /> },

      { path: "tutor-list", element: <TutorList /> },
      { path: "tutor/:id", element: <TutorBooking /> },
      { path: "tutor/:id/booking-payment-step1/:type", element: <TutorBookingPaymentStep1 /> },
      { path: "tutor/:id/booking-payment-step2/:type", element: <TutorBookingPaymentStep2 /> },
      { path: "tutor/:id/booking-payment-success/:type", element: <TutorBookingSuccess /> },
      { path: "tutor-info/:id", element: <TutorInfo /> },

      { path: "help-center", element: <HelpCenter /> },
    ],
  },
  {
    // 使用者後台 - 講師
    path: "/tutor-panel",
    element: <TutorLayout />,
    children: [
      { index: true, element: <TutorPanel /> },

      { path: "booking", element: <TutorManageBooking /> },
      { path: "course", element: <TutorManageCourses /> },
      { path: "course/topicSeries/add", element: <TutorManageAddTopicSeries /> },
      { path: "course/topicSeries/:id/edit", element: <TutorManageEditTopicSeries /> },
      { path: "course/topicSeries/:id/chapter", element: <TutorManageTopicSeriesChapter /> },
      { path: "course/video/:type/add", element: <TutorManageAddVideo /> },
    ],
  },
  { // 使用者後台 - 學生
    path: "/student-panel",
    element: <StudentLayout />,
    children: [
      { index: true, element: <StudentPanel /> },

      { path: "profile", element: <StudentProfile /> },
    ]
  },
  { path: "*", element: <NotFound /> },
]);
