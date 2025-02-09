import Home from "../pages/user/Home";

import Login from "../pages/user/auth/login";
import Signup from "../pages/user/auth/signup";
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
import NotFound from "../pages/NotFound";
import TutorManageBooking from "../pages/tutor/tutor-manage-bookings";

export const routes = [
  { path: "/", element: <Home /> },

  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/reset-password", element: <ResetPassword /> },

  { path: "/course-list", element: <CourseList /> },
  { path: "/course", element: <CourseListPage /> },
  { path: "/course/:id", element: <CourseVideoPage /> },

  { path: "/custom-course-list", element: <CustomCourseList /> },
  { path: "/add-learning-need", element: <AddLearningNeedPage /> },

  { path: "/subscription-list", element: <SubscriptionList /> },
  { path: "/subscription/:subscriptionPlan/:duration", element: <SubscriptionPayment /> },

  { path: "/tutor-list", element: <TutorList /> },
  { path: "/tutor/:id", element: <TutorBooking /> },
  { path: "/tutor/:id/booking-payment-step1/:type", element: <TutorBookingPaymentStep1 /> },
  { path: "/tutor/:id/booking-payment-step2/:type", element: <TutorBookingPaymentStep2 /> },
  { path: "/tutor/:id/booking-payment-success/:type", element: <TutorBookingSuccess /> },
  { path: "/tutor-info/:id", element: <TutorInfo /> },

  { path: "/help-center", element: <HelpCenter /> },

  { path: "/tutor-panel/booking", element: <TutorManageBooking /> },

  { path: "*", element: <NotFound /> },
];
