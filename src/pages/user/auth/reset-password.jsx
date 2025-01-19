// import Swal from 'sweetalert2'
import { NavLink } from "react-router-dom";

export default function ResetPassword() {
  return (
    <>
      <style>{`body { background-color: #c0c4df; }`}</style>
      <main className="forgot-password-section bg">
        <div className="container">
          <NavLink to="/" className="navbar-brand">
            <picture>
              <source
                srcSet="../assets/images/logo-sm.svg"
                media="(max-width: 575.98px)"
              />
              <img src="../assets/images/logo.svg" alt="logo-image" />
            </picture>
          </NavLink>
          <div className="row f-end-center my-9 my-lg-13">
            <div className="col-lg-6">
              <div className="user-auth-card card border-0 rounded-2">
                <div className="card-body px-6 py-10 p-lg-13">
                  <h1 className="fs-4 fs-lg-3 text-brand-03">重設密碼</h1>
                  <form className="mt-6 mt-lg-8">
                    <div className="position-relative">
                      <input
                        type="password"
                        className="form-control underline-input"
                        id="newPassword"
                        placeholder="請輸入新的密碼"
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
                        id="newPasswordAgain"
                        placeholder="請再次輸入新的密碼"
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
                      id="resetPasswordBtn"
                    >
                      確認修改
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
