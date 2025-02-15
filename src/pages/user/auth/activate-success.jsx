import { useState, useEffect } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import Swal from "sweetalert2";
import axios from "axios";

import Loader from "../../../components/common/Loader";

export default function ActivateSuccess() {
  // loading
  const [loadingState, setLoadingState] = useState(false);

  // 從路由找出 token
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const navigate = useNavigate();

  // 啟用帳號函式
  const [isActive, setIsActive] = useState(false);
  const activateAccount = async () => {
    setLoadingState(true);
    try {
      axios.defaults.headers.common.Authorization = token;
      await axios.get(
        `https://service.coding-8bit.site/api/v1/auth/activate?token=${token}`
      );
      setIsActive(true);
      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "啟用失敗",
        text: error.response.data.message,
      });
      navigate("/");
    } finally {
      setLoadingState(false);
    }
  };

  // 初始化 - 確認有無 token
  useEffect(() => {
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "請重新啟用",
        text: "啟用帳號驗證碼錯誤，請重新啟用",
      });
      navigate(-1);
    } else {
      activateAccount();
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Coding∞bit ｜ 帳號啟用結果</title>
      </Helmet>
      {loadingState && <Loader />}

      <style>{`body { background-color: #c0c4df; }`}</style>
      <main className="forgot-password-section bg">
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
          <div className="row f-end-center my-9 my-lg-13">
            <div className="col-lg-6">
              <div className="user-auth-card card border-0 rounded-2">
                {isActive ? (
                  <div className="card-body px-6 py-10 p-lg-13">
                    <div className="f-center py-13">
                      <h1 className="fs-2 fs-lg-1 text-brand-03 f-align-center">
                        <span className="material-symbols-outlined icon-fill display-3 text-brand-03 me-5">
                          check_circle
                        </span>
                        帳號啟用成功
                      </h1>
                    </div>
                    <div className="f-end-center mt-6 mt-lg-8">
                      <NavLink
                        to="/"
                        className="btn btn-brand-03 rounded-2 slide-right-hover w-100 f-center mt-6 mt-lg-10"
                        id="sendResetPasswordBtn"
                      >
                        回到首頁
                        <span className="material-symbols-outlined icon-fill fs-6 fs-md-5 mt-1 ms-1">
                          arrow_forward
                        </span>
                      </NavLink>
                    </div>
                  </div>
                ) : (
                  <div className="card-body px-6 py-10 p-lg-13">
                    <div className="f-center py-13">
                      <h1 className="fs-2 fs-lg-1 text-brand-03 f-align-center">
                        <span className="material-symbols-outlined icon-fill display-3 text-brand-03 me-5">
                          warning
                        </span>
                        帳號啟用失敗
                      </h1>
                    </div>
                    <div className="f-end-center mt-6 mt-lg-8">
                      <NavLink
                        to="/"
                        className="btn btn-brand-03 rounded-2 slide-right-hover w-100 f-center mt-6 mt-lg-10"
                        id="sendResetPasswordBtn"
                      >
                        回到首頁
                        <span className="material-symbols-outlined icon-fill fs-6 fs-md-5 mt-1 ms-1">
                          arrow_forward
                        </span>
                      </NavLink>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
