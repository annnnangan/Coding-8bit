import { Outlet, useMatch } from "react-router-dom";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import ScrollToTopBtn from "../components/layout/ScrollToTopBtn";
import ScrollToTop from "../components/layout/ScrollToTop";

export default function UserLayout() {
  // 判斷當前路由是否在排除頁面清單中
  const isLoginPage = useMatch("/login");
  const isSignupPage = useMatch("/signup");
  const isForgotPasswordPage = useMatch("/forgot-password");
  const isActivateSuccessPage = useMatch("/activate-success");
  const isResetPasswordPage = useMatch("/reset-password");
  
  const isCustomCourseListPage = useMatch("/custom-requests-list");
  const isAddLearningNeedPage = useMatch("/add-learning-need");

  // 根據判斷結果來顯示 Header/Footer 或 返回頂部按鈕
  const showHeaderFooter =
    !isLoginPage &&
    !isSignupPage &&
    !isForgotPasswordPage &&
    !isActivateSuccessPage &&
    !isResetPasswordPage &&
    !isCustomCourseListPage &&
    !isAddLearningNeedPage;
  const showToTopBtn =
    !isLoginPage &&
    !isSignupPage &&
    !isForgotPasswordPage &&
    !isActivateSuccessPage &&
    !isResetPasswordPage &&
    !isCustomCourseListPage &&
    !isAddLearningNeedPage;

  return (
    <>
      <ScrollToTop />
      {showHeaderFooter && <Header />}
      <Outlet />
      {showToTopBtn && <ScrollToTopBtn />}
      {showHeaderFooter && <Footer />}
    </>
  );
}
