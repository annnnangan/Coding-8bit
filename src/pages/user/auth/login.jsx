import { useState, useEffect } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import Swal from "sweetalert2";
import axios from "axios";

import Loader from "../../../components/common/Loader";

export default function Login() {
  const navigate = useNavigate();

  // loading
  const [loadingState, setLoadingState] = useState(false);

  // 登入邏輯
  const [formData, setFormData] = useState({});
  const loginFn = async () => {
    setLoadingState(true);
    try {
      const result = await axios.post(
        `https://service.coding-8bit.site/api/v1/auth/login`,
        formData
      );
      const { token } = result.data;
      document.cookie = `authToken=${token}; path=/`;
      axios.defaults.headers.common.Authorization = token;
      Swal.fire({
        title: "登入成功",
        icon: "success",
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "登入失敗",
        text: error.response.data.message,
      });
    } finally {
      setLoadingState(false);
    }
  };

  // 驗證身分
  const loginCheck = async (token) => {
    setLoadingState(true);
    try {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      await axios.get(`https://service.coding-8bit.site/api/v1/auth/check`);
      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "驗證錯誤",
        text: error?.response?.data?.message,
      });
    } finally {
      setLoadingState(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((state) => ({ ...state, [name]: value }));
  };

  // 隱碼按鈕邏輯
  const [showPasswordList, setShowPasswordList] = useState([false, false]);

  const handleShowPassword = (index) => {
    setShowPasswordList((prevState) =>
      prevState.map((show, i) => (i === index ? !show : show))
    );
  };

  // 初始化 - 確認是否有 token
  useEffect(() => {
    const token =
      document.cookie.replace(
        /(?:(?:^|.*;\s*)authToken\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      ) || null;
    if (token) {
      loginCheck(token);
    }
  }, []);

  // 初始化 - 第三方登入確認身分
  const [searchParams] = useSearchParams();
  const paramToken = searchParams.get("token");
  useEffect(() => {
    if (paramToken) {
      loginCheck(paramToken);
    }
  }, []);
  return (
    <>
      <Helmet>
        <title>Coding∞bit ｜ 登入</title>
      </Helmet>
      {loadingState && <Loader />}

      <style>{`body { background-color: #c0c4df; }`}</style>
      <main className="login-section bg">
        <div className="container">
          <NavLink to="/" className="navbar-brand">
            <picture>
              <source
                srcSet="images/logo-sm.svg"
                media="(max-width: 575.98px)"
              />
              <img src="images/logo.svg" alt="logo-image" />
            </picture>
          </NavLink>
          <div className="row f-end-center mt-9 mt-lg-12">
            <div className="col-lg-6">
              <div className="user-auth-card card border-0 rounded-2">
                <div className="card-body px-6 py-10 p-lg-13">
                  <h1 className="fs-4 fs-lg-3 text-brand-03">
                    Coding∞bit 會員登入
                  </h1>
                  <form className="mt-6 mt-lg-11">
                    <div className="position-relative">
                      <input
                        type="email"
                        className="form-control underline-input"
                        id="email"
                        name="email"
                        aria-describedby="emailHelp"
                        placeholder="請輸入電子信箱"
                        onChange={handleInputChange}
                      />
                      <span className="material-symbols-outlined position-absolute top-0 text-gray-03 ms-1 mt-1">
                        mail
                      </span>
                    </div>
                    <div className="position-relative mt-9">
                      <input
                        type={showPasswordList[0] ? "text" : "password"}
                        className="form-control underline-input"
                        id="password"
                        name="password"
                        placeholder="請輸入密碼"
                        onChange={handleInputChange}
                      />
                      <span className="material-symbols-outlined position-absolute top-0 text-gray-03 ms-1 mt-1">
                        lock
                      </span>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleShowPassword(0);
                        }}
                      >
                        <span className="material-symbols-outlined position-absolute top-0 end-0 text-gray-03 ms-1 mt-1">
                          {showPasswordList[0]
                            ? "visibility"
                            : "visibility_off"}
                        </span>
                      </a>
                    </div>
                    <div className="f-between-center mt-9">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          記住帳號
                        </label>
                      </div>
                      <NavLink
                        to="/forgot-password"
                        className="link-brand-03 fw-medium underline-hover link-hover"
                      >
                        忘記密碼
                      </NavLink>
                    </div>
                    <button
                      type="button"
                      className="btn btn-brand-03 rounded-2 slide-right-hover w-100 f-center mt-4 mt-lg-6"
                      id="loginBtn"
                      onClick={loginFn}
                    >
                      立即登入
                      <span className="material-symbols-outlined icon-fill fs-6 fs-md-5 mt-1 ms-1">
                        arrow_forward
                      </span>
                    </button>
                  </form>
                  <div className="divider-label d-flex align-items-center mt-6 mt-lg-8">
                    <hr />
                    <span>OR</span>
                    <hr />
                  </div>
                  <a
                    href="https://coding-bit-backend.onrender.com/api/v1/auth/google"
                    type="button"
                    className="btn btn-brand-02 border-1 rounded-1 w-100 f-center mt-6 mt-lg-8"
                  >
                    <img
                      src="images/icon/icons-google.svg"
                      alt="icon-google"
                      className="me-3"
                    />
                    使用 Google 登入
                  </a>
                  <div className="f-end-center mt-6 mt-lg-8">
                    <p className="text-center">還不是會員？</p>
                    <NavLink
                      to="/signup"
                      className="link-brand-03 fw-medium underline-hover ms-1"
                    >
                      點此註冊
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
