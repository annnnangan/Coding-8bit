import { useState, useEffect } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";

import axios from "axios";
import Swal from "sweetalert2";

import Loader from "../../components/common/Loader";

export default function Header() {
  // loading
  const [loadingState, setLoadingState] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleTogglerClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // 取得使用者資料
  const [userData, setUserData] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const getUserData = async (token) => {
    setLoadingState(true);
    try {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      const res = await axios.get(
        `https://service.coding-8bit.site/api/v1/user/users/me`
      );
      setUserData(res.data);
      if (res.status === 200) {
        setIsAuth(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingState(false);
    }
  };

  // 切換身分
  const roleToggle = async () => {
    setLoadingState(true);
    try {
      const role =
        userData.last_active_role === "student"
          ? { role: "tutor" }
          : { role: "student" };
      const res = await axios.put(
        `https://service.coding-8bit.site/api/v1/user/users/me/role`,
        role
      );
      navigate(0);
      if (res.status === 200) {
        setIsAuth(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingState(false);
    }
  };

  // 登出
  const signOut = () => {
    document.cookie = "authToken=;expires=;";
    Swal.fire({
      title: "已登出",
      icon: "success",
    });
    navigate(0);
  };

  // 初始化 - 確認是否已登入
  useEffect(() => {
    const token =
      document.cookie.replace(
        /(?:(?:^|.*;\s*)authToken\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      ) || null;
    if (token) {
      getUserData(token);
    }
  }, []);

  // 初始化 - 監聽路由變化，有切換路由則隱藏 Menu
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <>
      {loadingState && <Loader />}

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
                  className="nav-link underline-hover w-100 d-inline-flex link-gray-02"
                  aria-current="page"
                  to="/course-list"
                >
                  精選課程
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link underline-hover w-100 d-inline-flex link-gray-02"
                  to="/tutor-list"
                >
                  一對一教學
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link underline-hover w-100 d-inline-flex link-gray-02"
                  to="/custom-course-list"
                >
                  課程客製化
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link underline-hover w-100 d-inline-flex link-gray-02"
                  to="/help-center"
                >
                  幫助中心
                </NavLink>
              </li>

              {isAuth && (
                <div className="d-lg-none">
                  <div className="f-align-center ps-4 mt-2">
                    <div className="flex-shrink-0">
                      {!userData.name ? (
                        <img
                          src="images/icon/user.png"
                          alt="profile"
                          className="object-fit-cover rounded-circle me-4"
                          style={{ height: "32px", width: "32px" }}
                        />
                      ) : (
                        <img
                          src={userData.avatar}
                          alt="profile"
                          className="object-fit-cover rounded-circle me-4"
                          style={{ height: "32px", width: "32px" }}
                        />
                      )}
                    </div>
                    <div className="flex-grow-1">
                      <p className="text-gray-01">{userData.username}</p>
                    </div>
                  </div>
                  <li className="nav-item mt-2">
                    <button
                      className="nav-link underline-hover w-100 d-inline-flex link-gray-02"
                      aria-current="page"
                      type="button"
                      onClick={roleToggle}
                    >
                      {userData.last_active_role === "student"
                        ? "切換成老師身分"
                        : "切換成學生身分"}
                    </button>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link underline-hover w-100 d-inline-flex link-gray-02"
                      to={
                        userData.last_active_role === "student"
                          ? "/student-panel"
                          : "/tutor-panel"
                      }
                    >
                      後台儀表板
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link underline-hover w-100 d-inline-flex link-gray-02"
                      to="/"
                    >
                      個人資料
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <button
                      type="button"
                      className="nav-link underline-hover w-100 d-inline-flex link-gray-02"
                      onClick={signOut}
                    >
                      登出
                    </button>
                  </li>
                </div>
              )}

              <li className="nav-item nav-bottom-btn ms-lg-10 dropdown">
                {!isAuth ? (
                  <NavLink
                    to="/login"
                    className="btn btn-outline-brand-03 w-100"
                  >
                    登入 / 註冊
                  </NavLink>
                ) : (
                  <>
                    <NavLink
                      to="/tutor-panel"
                      className="btn btn-brand-02 py-2 d-none d-lg-flex align-items-center"
                      role="button"
                      id="dropdownMenuLink"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <div className="flex-shrink-0">
                        {!userData.name ? (
                          <img
                            src="images/icon/user.png"
                            alt="profile"
                            className="object-fit-cover rounded-circle me-4"
                            style={{ height: "32px", width: "32px" }}
                          />
                        ) : (
                          <img
                            src={userData.avatar}
                            alt="profile"
                            className="object-fit-cover rounded-circle me-4"
                            style={{ height: "32px", width: "32px" }}
                          />
                        )}
                      </div>
                      <div className="flex-grow-1">
                        <p className="text-gray-01">{userData.username}</p>
                      </div>
                    </NavLink>
                    <ul
                      className="dropdown-menu dropdown-menu-end rounded-1 mt-4"
                      aria-labelledby="dropdownMenuLink"
                    >
                      <li>
                        <button
                          type="button"
                          className="dropdown-item"
                          onClick={roleToggle}
                        >
                          {userData.last_active_role === "student"
                            ? "切換成老師身分"
                            : "切換成學生身分"}
                        </button>
                      </li>
                      <li>
                        <Link
                          to={
                            userData.last_active_role === "student"
                              ? "/student-panel"
                              : "/tutor-panel"
                          }
                          className="dropdown-item"
                        >
                          後台儀表板
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item">個人資料</Link>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="dropdown-item"
                          onClick={signOut}
                        >
                          登出
                        </button>
                      </li>
                    </ul>
                  </>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
