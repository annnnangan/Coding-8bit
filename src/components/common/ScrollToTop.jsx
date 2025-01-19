import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// 每次跳轉頁面時都能滾動到最上面的元件
export default function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}
