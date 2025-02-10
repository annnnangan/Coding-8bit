import { useLocation } from "react-router-dom";

export const useRouteConfig = () => {
  const location = useLocation();

  // 不需要 Header 與 Footer 的頁面
  const noHeaderFooterRoutes = ["/login", "/signup", "/forgot-password", "/reset-password", "/custom-course-list", "/add-learning-need", "/tutor-panel/booking"];

  // 不需要右下角往上跳轉按鈕的頁面
  const noToTopBtnRoutes = ["/login", "/signup", "/forgot-password", "/reset-password", "/custom-course-list", "/add-learning-need", "/tutor-panel/booking"];

  const shouldShowHeaderFooter = !noHeaderFooterRoutes.includes(location.pathname);
  const shouldShowToTopBtn = !noToTopBtnRoutes.includes(location.pathname);

  return { shouldShowHeaderFooter, shouldShowToTopBtn };
};
