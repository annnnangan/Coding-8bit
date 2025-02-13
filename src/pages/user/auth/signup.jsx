import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import SignupForm from "../../../components/auth/SignupForm";

export default function Signup() {
  const [isVerifying, setIsVerifying] = useState(false);

  return (
    <>
      <Helmet>
        <title>Coding∞bit ｜ 註冊</title>
      </Helmet>
      
      <style>{`body { background-color: #c0c4df; }`}</style>
      <main className="sign-up-section bg">
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
          <div className="row f-end-center mt-9 mt-lg-11">
            <div className="col-lg-6">
              <div className="user-auth-card card border-0 rounded-2">
                {!isVerifying ? (
                  <div className="card-body px-6 py-10 p-lg-13">
                    <h1 className="fs-4 fs-lg-3 text-brand-03">
                      立即加入 Coding∞bit
                    </h1>

                    <SignupForm setIsVerifying={setIsVerifying} />

                    <div className="f-end-center mt-6 mt-lg-8">
                      <p className="text-center">已經是會員了？</p>
                      <NavLink
                        to="/login"
                        className="link-brand-03 fw-medium underline-hover ms-1"
                      >
                        點此登入
                      </NavLink>
                    </div>
                  </div>
                ) : (
                  <div className="user-auth-card card border-0 rounded-2">
                    <div className="card-body px-6 py-10 p-lg-13">
                      <h1 className="fs-4 fs-lg-3 text-brand-03 mt-10">驗證帳號</h1>
                      <p className="mt-10">已傳送確認帳號的連結至您的電子信箱</p>
                      <p>請至信件按下信中的連結啟動帳號</p>
                      <NavLink
                        to="/"
                        className="btn btn-outline-brand-03 slide-right-hover d-inline-flex f-align-center mt-6 mt-lg-11"
                      >
                        回到首頁
                        <span className="material-symbols-outlined icon-fill fs-5 ms-1">
                          arrow_forward
                        </span>
                      </NavLink>
                      <div className="f-end-center mt-6 mt-lg-11">
                        <p className="text-center">沒有收到嗎？</p>
                        <button
                          className="btn link-brand-03 fw-medium underline-hover px-0 ms-1"
                          onClick={() => setIsVerifying(false)}
                        >
                          返回註冊頁面
                        </button>
                      </div>
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
