// import Swal from 'sweetalert2'
import { NavLink } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <>
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
                      />
                      <span className="material-symbols-outlined position-absolute top-0 text-gray-03 ms-1 mt-1">
                        mail
                      </span>
                    </div>
                    <button
                      type="button"
                      className="btn btn-brand-03 rounded-2 slide-right-hover w-100 f-center mt-6 mt-lg-10"
                      id="sendResetPasswordBtn"
                    >
                      發送驗證信
                      <span className="material-symbols-outlined icon-fill fs-6 fs-md-5 mt-1 ms-1">
                        arrow_forward
                      </span>
                    </button>
                  </form>
                  <div className="f-end-center mt-6 mt-lg-8">
                    <p className="text-center">沒有收到嗎？</p>
                    <a
                      href="#"
                      className="link-brand-03 fw-medium underline-hover ms-1"
                    >
                      45秒後再發送一次
                    </a>
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
