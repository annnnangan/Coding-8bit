import { Routes, Route } from "react-router-dom";

import { routes } from "./router/routes"; // 用來存放所有路由的配置文件
import { useRouteConfig } from "./router/useRouteConfig"; // 自定義 Hook，用來處理路由的邏輯
import Layout from "./router/Layout"; // 主內容外框架的設定 (Header、Footer、ScrollToTop 和 ScrollToTopBtn 的顯示邏輯)

function App() {
  const { shouldShowHeaderFooter, shouldShowToTopBtn } = useRouteConfig();

  return (
    <Layout
      showHeaderFooter={shouldShowHeaderFooter}
      showToTopBtn={shouldShowToTopBtn}
    >
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </Layout>
  );
}

export default App;
