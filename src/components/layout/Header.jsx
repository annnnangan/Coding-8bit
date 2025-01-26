import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const handleTogglerClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // 監聽路由變化，有切換路由則隱藏 Menu
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <>
      {isMenuOpen && <style>{`body { overflow: hidden; }`}</style>}
      <nav
        className={`layout-nav-wrap navbar navbar-expand-lg navbar-light ${
          isMenuOpen ? "bg-white" : "bg-transparent"
        }`}
      >
        <div className="container-lg">
          <div className="d-flex">
            <NavLink to="/" className="navbar-brand me-10">
              <picture>
                <source
                  srcSet="images/logo-sm.svg"
                  media="(max-width: 575.98px)"
                />
                <img src="images/logo.svg" alt="logo-image" />
              </picture>
            </NavLink>
            <div className="position-relative f-align-center d-none d-xl-flex">
              <input
                type="search"
                className="form-control nav-search-desktop"
                placeholder="搜尋感興趣的課程"
              />
              <span
                className="material-symbols-outlined text-gray-03 position-absolute ps-4"
                style={{ width: "20px", height: "20px" }}
              >
                search
              </span>
            </div>
          </div>
          <button
            id="layout-navbar-toggler"
            className="navbar-toggler border-0 p-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={handleTogglerClick}
          >
            <span
              id="menu-icon"
              className={`material-symbols-outlined icon-fill fs-4 ${
                isMenuOpen && "d-none"
              }`}
            >
              menu
            </span>
            <span
              id="close-icon"
              className={`material-symbols-outlined icon-fill fs-4 ${
                isMenuOpen ? "" : "d-none"
              }`}
            >
              close
            </span>
          </button>
          <div
            id="navbarSupportedContent"
            className={`collapse navbar-collapse justify-content-end ${
              isMenuOpen && "show"
            }`}
          >
            <ul className="navbar-nav align-items-lg-center">
              <li className="position-relative f-align-center d-lg-none">
                <input
                  type="search"
                  className="form-control nav-search-mobile"
                  placeholder="搜尋感興趣的課程"
                />
                <span
                  className="material-symbols-outlined text-gray-03 position-absolute ps-4"
                  style={{ width: "20px", height: "20px" }}
                >
                  search
                </span>
              </li>
              <li className="nav-item mt-4 mt-lg-0">
                <NavLink
                  className="nav-link underline-hover d-inline-flex link-gray-02"
                  aria-current="page"
                  to="/course-list"
                >
                  精選課程
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link underline-hover d-inline-flex link-gray-02"
                  to="/tutor-list"
                >
                  一對一教學
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link underline-hover d-inline-flex link-gray-02"
                  to="/custom-course-list"
                >
                  課程客製化
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link underline-hover d-inline-flex link-gray-02"
                  to="/help-center"
                >
                  幫助中心
                </NavLink>
              </li>
              <li className="nav-item nav-bottom-btn ms-lg-10">
                <NavLink to="/login">
                  <button className="btn btn-outline-brand-03 w-100">
                    登入 / 註冊
                  </button>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
