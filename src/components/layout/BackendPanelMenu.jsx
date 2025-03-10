import { useEffect, useState } from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSelector, useDispatch } from "react-redux";
import { loginCheck, getUserData } from "@/utils/slice/authSlice";

import PropTypes from "prop-types";
import styled from "styled-components";
import clsx from "clsx";
import Swal from "sweetalert2";

import Loader from "@/components/common/Loader";

// Styled components
const Container = styled.nav`
  padding: 24px;
  display: flex;
  flex-direction: column;
  width: 312px;
  height: 100vh;
  background-color: ${(props) =>
    props.type === "student" ? "#ffffff" : "var(--bs-gray-01)"};
`;

const ListItem = styled.li`
  padding: 12px 20px;
  cursor: pointer;

  &.active {
    background-color: ${(props) =>
      props.type === "student" ? "var(--bs-brand-02)" : "#645CAA33"};
    border-radius: 16px;
  }

  &.active a {
    color: ${(props) =>
      props.type === "student" ? "var(--bs-brand-03)" : "#ffffff"};
  }

  &:hover a {
    color: ${(props) =>
      props.type === "student" ? "var(--bs-brand-03)" : "var(--bs-brand-01)"};
  }
`;

const Link = styled(NavLink)`
  display: flex;
  text-decoration: none;
  color: ${(props) =>
    props.type === "student" ? "var(--bs-gray-03)" : "var(--bs-gray-03)"};

  .icon-fill {
    margin-right: 8px;
  }
`;

const MainContentWrapper = styled.div`
  flex-grow: 1;
  padding: 36px;
  overflow-y: auto;
  height: 100vh;

  @media (max-width: 992px) {
    padding: 0;
    margin-top: 24px;
    height: 100%;
  }
`;

export default function BackendPanelMenu({ children, type, menuItems }) {
  // loading
  const [loadingState, setLoadingState] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  // auth
  const { isAuth } = useSelector((state) => state.auth);
  const { userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)authToken\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );

  // 初始化 - 取得使用者資料
  useEffect(() => {
    if (isAuth) {
      dispatch(getUserData())
        .catch(() => {
          navigate("/login");
        })
        .finally(() => setLoadingState(false));
    }
  }, [isAuth]);

  // 初始化 - 驗證身分
  useEffect(() => {
    if (token) {
      dispatch(loginCheck())
        .unwrap()
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "登入驗證失敗",
            text: error.message || "請重新登入",
          }).then(() => {
            navigate("/login");
          });
        });
    } else {
      setLoadingState(false);
      Swal.fire({
        icon: "error",
        title: "請先確認是否登入或是否已經取得身分權限",
      })
      navigate("/login");
    }
  }, [token]);

  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 切換行動版 Menu 狀態
  const handleTogglerClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // 初始化 - 監聽路由變化，有切換路由則隱藏 Menu
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <>
      {loadingState && <Loader />}
      <div className={`${isMobile ? "" : "d-flex"}`}>
        {isMobile ? (
          // Mobile Menu
          <>
            {isMenuOpen && <style>{`body { overflow: hidden; }`}</style>}
            <nav
              className={`layout-nav-wrap navbar navbar-expand-lg ${
                type === "student" ? "bg-white" : "bg-gray-01"
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
                      type === "student" ? "text-gray-01" : "text-white"
                    } ${isMenuOpen && "d-none"}`}
                  >
                    menu
                  </span>
                  <span
                    id="close-icon"
                    className={`material-symbols-outlined icon-fill fs-4 ${
                      type === "student" ? "text-gray-01" : "text-white"
                    } ${isMenuOpen ? "" : "d-none"}`}
                  >
                    close
                  </span>
                </button>
                <div
                  id="navbarSupportedContent"
                  className={`collapse navbar-collapse justify-content-end ${
                    isMenuOpen && "show"
                  } ${type === "student" ? "bg-white" : "bg-gray-01"}`}
                >
                  <ul className="navbar-nav align-items-lg-center">
                    {menuItems.map((item) => (
                      <ListItem
                        key={item.name}
                        type={type}
                        className={
                          location.pathname === item.href ? "active" : ""
                        }
                      >
                        <Link to={item.href}>
                          <span className="material-symbols-outlined icon-fill">
                            {item.icon}
                          </span>
                          <span>{item.name}</span>
                        </Link>
                      </ListItem>
                    ))}
                    <li className="nav-item nav-bottom-btn">
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0">
                          <img
                            src={userData.avatar_url}
                            alt="profile"
                            className="object-fit-cover rounded-circle me-4"
                            style={{ height: "48px", width: "48px" }}
                          />
                        </div>
                        <div className="flex-grow-1">
                          <p
                            className={clsx("fs-6", {
                              "text-gray-01": type === "student",
                              "text-white": type === "tutor",
                            })}
                          >
                            {userData.username}
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </>
        ) : (
          // Desktop Menu
          <Container type={type}>
            <NavLink className="navbar-brand mb-8" to="/">
              <picture>
                <source
                  srcSet="images/logo-sm.svg"
                  media="(max-width: 575.98px)"
                />
                <img src="images/logo.svg" alt="logo-image" />
              </picture>
            </NavLink>
            <ul>
              {menuItems.map((item) => (
                <ListItem
                  key={item.name}
                  type={type}
                  className={location.pathname === item.href ? "active" : ""}
                >
                  <Link to={item.href}>
                    <span className="material-symbols-outlined icon-fill">
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </Link>
                </ListItem>
              ))}
            </ul>
            <div className="d-flex align-items-center mt-auto">
              <div className="flex-shrink-0">
                {!userData.avatar_url ? (
                  <img
                    src="images/icon/user.png"
                    alt="profile"
                    className="object-fit-cover rounded-circle me-4"
                    style={{ height: "48px", width: "48px" }}
                  />
                ) : (
                  <img
                    src={userData.avatar_url}
                    alt="profile"
                    className="object-fit-cover rounded-circle me-4"
                    style={{ height: "48px", width: "48px" }}
                  />
                )}
              </div>
              <div className="flex-grow-1">
                <p
                  className={clsx("fs-6", {
                    "text-gray-01": type === "student",
                    "text-white": type === "tutor",
                  })}
                >
                  {userData.username}
                </p>
              </div>
            </div>
          </Container>
        )}

        {/* Shared Main Content */}
        <MainContentWrapper>{children}</MainContentWrapper>
      </div>
    </>
  );
}

// Define the shape of a menu item
const menuItemShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
});

BackendPanelMenu.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(["tutor", "student"]).isRequired,
  menuItems: PropTypes.arrayOf(menuItemShape).isRequired,
};
