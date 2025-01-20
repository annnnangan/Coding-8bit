import { Routes, Route, useLocation } from "react-router-dom";

import ScrollToTop from "./components/common/ScrollToTop";
import ScrollToTopBtn from "./components/common/ScrollToTopBtn";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/user/Home";

import Login from "./pages/user/auth/login";
import Signup from "./pages/user/auth/signup";
import ForgotPassword from "./pages/user/auth/forgot-password";
import ResetPassword from "./pages/user/auth/reset-password";

import CourseList from "./pages/user/course/course-list";
import CourseListPage from "./pages/user/course/course-list-page";
import CourseVideoPage from "./pages/user/course/course-video-page";

import SubscriptionList from "./pages/user/subscription/subscription-list";
import SubscriptionPayment from "./pages/user/subscription/subscription-payment";

import TutorList from "./pages/user/tutor/tutor-list";
import TutorBooking from "./pages/user/tutor/tutor-booking";
import TutorBookingPaymentStep1 from "./pages/user/tutor/booking-payment/step1";
import TutorBookingPaymentStep2 from "./pages/user/tutor/booking-payment/step2";
import TutorBookingSuccess from "./pages/user/tutor/booking-payment/booking-success";

import HelpCenter from "./pages/user/help-center";
import NotFound from "./pages/NotFound";

function App() {
  const location = useLocation();

  // 不需要 Header 和 Footer 的路徑列表
  const noHeaderFooterRoutes = [
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
  ];
  // 不需要往上按紐的路徑列表
  const noToTopBtnRoutes = [
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
  ];

  // 判斷當前路徑是否在 noHeaderFooterRoutes 中
  const shouldShowHeaderFooter = !noHeaderFooterRoutes.includes(
    location.pathname
  );
  // 判斷當前路徑是否在 noToTopBtnRoutes 中
  const shouldShowToTopBtn = !noToTopBtnRoutes.includes(location.pathname);

  return (
    <>
      <ScrollToTop />
      {shouldShowHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/course-list" element={<CourseList />} />
        <Route path="/course" element={<CourseListPage />} />
        <Route path="/course/:id" element={<CourseVideoPage />} />

        <Route path="/subscription-list" element={<SubscriptionList />} />
        <Route path="/subscription/:subscriptionPlan/:duration" element={<SubscriptionPayment />} />

        <Route path="/tutor" element={<TutorList />} />
        <Route path="/tutor/:id" element={<TutorBooking />} />
        <Route
          path="/tutor/:id/booking-payment-step1/:type"
          element={<TutorBookingPaymentStep1 />}
        />
        <Route
          path="/tutor/:id/booking-payment-step2/:type"
          element={<TutorBookingPaymentStep2 />}
        />
        <Route
          path="/tutor/:id/booking-payment-success/:type"
          element={<TutorBookingSuccess />}
        />

        <Route path="/help-center" element={<HelpCenter />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      {shouldShowToTopBtn && <ScrollToTopBtn />}
      {shouldShowHeaderFooter && <Footer />}
    </>
  );
}

export default App;
