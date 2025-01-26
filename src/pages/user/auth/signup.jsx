import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import SignupForm from "../../../components/auth/SignupForm";

export default function Signup() {
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
          <div className="row f-end-center mt-9 mt-lg-0">
            <div className="col-lg-6">
              <div className="user-auth-card card border-0 rounded-2">
                <div className="card-body px-6 py-10 p-lg-13">
                  <h1 className="fs-4 fs-lg-3 text-brand-03">
                    立即加入 Coding∞bit
                  </h1>

                  <SignupForm />

                  <div className="divider-label d-flex align-items-center mt-6 mt-lg-8">
                    <hr />
                    <span>OR</span>
                    <hr />
                  </div>
                  <button
                    type="button"
                    className="btn btn-brand-02 border-1 rounded-1 w-100 f-center mt-6 mt--lg-8"
                  >
                    <img
                      src="images/icon/icons-google.svg"
                      alt="icon-google"
                      className="me-3"
                    />
                    使用 Google 註冊
                  </button>
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
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
