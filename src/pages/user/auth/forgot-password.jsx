import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import Swal from "sweetalert2";
import axios from "axios";

import Loader from "../../../components/common/Loader";

export default function ForgotPassword() {
  // loading
  const [loadingState, setLoadingState] = useState(false);

  const [isClick, setIsClick] = useState(true);

  // 傳送忘記密碼郵件函式
  const [email, setEmail] = useState("");
  const sendEmail = async () => {
    try {
      setLoadingState(true);
      await axios.post(
        `https://service.coding-8bit.site/api/v1/docs/auth/forgot-password`,
        email
      );
      Swal.fire({
        icon: "success",
        title: "已傳送重設密碼的連結至您的電子信箱",
        text: "請至信箱確認信件",
      });

      // 防止用戶不斷點擊
      setIsClick(false);
      setTimeout(() => {
        setIsClick(true);
      }, 10000);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "傳送電子信件失敗",
        text: error.data.message,
      });
    } finally {
      setLoadingState(false);
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <Helmet>
        <title>Coding∞bit ｜ 忘記密碼</title>
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
                <div className="card-body px-6 py-10 p-lg-13">
                  <h1 className="fs-4 fs-lg-3 text-brand-03">忘記密碼</h1>
                  <p className="mt-6">將發送重設密碼的連結至您的電子信箱</p>
                  <form className="mt-6 mt-lg-8">
                    <div className="position-relative">
                      <input
                        type="email"
                        className="form-control underline-input"
                        id="addEmail"
                        aria-describedby="emailHelp"
                        placeholder="請輸入電子信箱"
                        onChange={handleEmail}
                      />
                      <span className="material-symbols-outlined position-absolute top-0 text-gray-03 ms-1 mt-1">
                        mail
                      </span>
                    </div>
                    <button
                      type="button"
                      className="btn btn-brand-03 rounded-2 slide-right-hover w-100 f-center mt-6 mt-lg-10"
                      id="sendResetPasswordBtn"
                      onClick={sendEmail}
                      disabled={!isClick}
                    >
                      發送驗證信
                      <span className="material-symbols-outlined icon-fill fs-6 fs-md-5 mt-1 ms-1">
                        arrow_forward
                      </span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
