// import Swal from 'sweetalert2'
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";

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
                  <form className="mt-6 mt-lg-11">
                    <div className="position-relative">
                      <input
                        type="text"
                        className="form-control underline-input"
                        id="addUsername"
                        placeholder="請輸入您的暱稱"
                      />
                      <span className="material-symbols-outlined position-absolute top-0 text-gray-03 ms-1 mt-1">
                        person
                      </span>
                    </div>
                    <div className="position-relative mt-9">
                      <input
                        type="email"
                        className="form-control underline-input"
                        id="addEmail"
                        aria-describedby="emailHelp"
                        placeholder="請輸入您的電子信箱"
                      />
                      <span className="material-symbols-outlined position-absolute top-0 text-gray-03 ms-1 mt-1">
                        mail
                      </span>
                    </div>
                    <div className="position-relative mt-9">
                      <input
                        type="password"
                        className="form-control underline-input"
                        id="addPassword"
                        placeholder="請輸入您的密碼"
                      />
                      <span className="material-symbols-outlined position-absolute top-0 text-gray-03 ms-1 mt-1">
                        lock
                      </span>
                      <a href="#">
                        <span className="material-symbols-outlined position-absolute top-0 end-0 text-gray-03 ms-1 mt-1">
                          visibility_off
                        </span>
                      </a>
                    </div>
                    <div className="position-relative mt-9">
                      <input
                        type="password"
                        className="form-control underline-input"
                        id="addPasswordAgain"
                        placeholder="請再次輸入您的密碼"
                      />
                      <span className="material-symbols-outlined position-absolute top-0 text-gray-03 ms-1 mt-1">
                        lock
                      </span>
                      <a href="#">
                        <span className="material-symbols-outlined position-absolute top-0 end-0 text-gray-03 ms-1 mt-1">
                          visibility_off
                        </span>
                      </a>
                    </div>
                    <button
                      type="button"
                      className="btn btn-brand-03 rounded-2 slide-right-hover w-100 f-center mt-6 mt-lg-10"
                      id="signUpBtn"
                    >
                      註冊帳號
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
