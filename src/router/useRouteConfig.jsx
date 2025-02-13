import { useLocation } from "react-router-dom";

export const useRouteConfig = () => {
  const location = useLocation();

  // 不需要 Header 與 Footer 的頁面
  const noHeaderFooterRoutes = [
    "/login",
    "/signup",
    "/activate-success",
    "/forgot-password",
    "/reset-password",
    "/custom-course-list",
    "/add-learning-need",
    "/tutor-panel/booking",
    "/tutor-panel/course",
    "/tutor-panel/course/topicSeries/add",
    "/tutor-panel/course/topicSeries/:id/edit",
    "/tutor-panel/course/topicSeries/:id/chapter",
    "/tutor-panel/course/video/:type/add"
  ];

  // 不需要右下角往上跳轉按鈕的頁面
  const noToTopBtnRoutes = [
    "/login",
    "/signup",
    "/activate-success",
    "/forgot-password",
    "/reset-password",
    "/custom-course-list",
    "/add-learning-need",
    "/tutor-panel/booking",
    "/tutor-panel/course",
    "/tutor-panel/course/topicSeries/add",
    "/tutor-panel/course/topicSeries/:id/edit",
    "/tutor-panel/course/topicSeries/:id/chapter",
    "/tutor-panel/course/video/:type/add"
  ];

  // 替換動態參數（:id、:type）為通用正則 `[^/]+`
  const pathToRegex = (path) => 
    new RegExp(`^${path.replace(/:[^/]+/g, "[^/]+")}$`);

  // 判斷當前路由是否符合不顯示 Header/Footer 或 不顯示跳轉按鈕
  const shouldShowHeaderFooter = !noHeaderFooterRoutes.some((route) =>
    pathToRegex(route).test(location.pathname)
  );

  const shouldShowToTopBtn = !noToTopBtnRoutes.some((route) =>
    pathToRegex(route).test(location.pathname)
  );


  return { shouldShowHeaderFooter, shouldShowToTopBtn };
};
