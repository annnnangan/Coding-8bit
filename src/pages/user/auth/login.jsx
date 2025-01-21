// import Swal from 'sweetalert2'
import { NavLink } from "react-router-dom";

export default function Login() {
  return (
    <>
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
                        id="addEmail"
                        aria-describedby="emailHelp"
                        placeholder="請輸入電子信箱"
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
                        placeholder="請輸入密碼"
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
                  <button
                    type="button"
                    className="btn btn-brand-02 border-1 rounded-1 w-100 f-center mt-6 mt--lg-8"
                  >
                    <img
                      src="images/icon/icons-google.svg"
                      alt="icon-google"
                      className="me-3"
                    />
                    使用 Google 登入
                  </button>
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
