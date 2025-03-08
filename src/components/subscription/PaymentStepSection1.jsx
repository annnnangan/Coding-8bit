import { NavLink } from "react-router-dom";

import PropTypes from "prop-types";

export default function PaymentStepSection1({
  prices,
  duration,
  subscriptionPlan,
  toNextStep,
}) {
  return (
    <>
      <main className="subscription-info-section wrap">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <NavLink to="/" className="underline-hover">
                  首頁
                </NavLink>
              </li>
              <li className="breadcrumb-item">
                <NavLink to="/subscription-list" className="underline-hover">
                  訂閱方案
                </NavLink>
              </li>
              <li
                className="breadcrumb-item active fw-semibold"
                aria-current="page"
              >
                {subscriptionPlan === "basic" && "升級方案 - 基本會員"}
                {subscriptionPlan === "premium" && "升級方案 - 高級會員"}
              </li>
            </ol>
          </nav>
          <h1 className="fs-2 fs-lg-1 text-brand-03 mt-8">
            {subscriptionPlan === "basic" && "升級方案 - 基本會員"}
            {subscriptionPlan === "premium" && "升級方案 - 高級會員"}
          </h1>
          <div className="subscription-info-wrap">
            <ul className="fs-6 fs-md-5 mt-8 mt-lg-12">
              <li className="f-align-center mt-4 mt-lg-4">
                <span className="material-symbols-outlined icon-fill text-brand-03">
                  check_circle
                </span>
                <p className="fw-medium lh-sm ms-4">
                  可參與影片討論區，與其他使用者交流
                </p>
              </li>
              <li className="f-align-center mt-4 mt-lg-4">
                <span className="material-symbols-outlined icon-fill text-brand-03">
                  check_circle
                </span>
                <p className="fw-medium lh-sm ms-4">
                  不限次數、不限時長，觀看所有教學影片
                </p>
              </li>
              <li className="f-align-center mt-4 mt-lg-4">
                <span className="material-symbols-outlined icon-fill text-brand-03">
                  check_circle
                </span>
                <p className="fw-medium lh-sm ms-4">
                  可預約一對一教學、程式碼檢視
                </p>
              </li>
              <li className="f-align-center mt-4 mt-lg-4">
                <span className="material-symbols-outlined icon-fill text-brand-03 flex-shrink-1">
                  check_circle
                </span>
                <p className="fw-medium lh-sm ms-4 flex-grow-1">
                  可成為老師，上傳教學影片，接受學生預約與客製化需求
                </p>
              </li>
              {subscriptionPlan === "premium" && (
                <li className="f-align-center mt-4 mt-lg-4">
                  <span className="material-symbols-outlined icon-fill text-brand-03">
                    check_circle
                  </span>
                  <p className="fw-medium lh-sm ms-4">可發佈學習客製化需求</p>
                </li>
              )}
            </ul>
            <div className="d-flex justify-content-end mt-12">
              <h2 className="fs-4 fs-lg-3 fw-medium fw-lg-bold f-align-center">
                NT$
                <span className="fs-1 fw-bold ms-2">
                  {prices[subscriptionPlan]?.[duration] || ""}
                </span>
                <span className="fs-4 fs-lg-3 fw-basic ms-2">
                  {duration === "price_monthly" && "/ 月"}
                  {duration === "price_annually" && "/ 年"}
                </span>
              </h2>
            </div>
            <div className="f-end-center mt-6 mt-lg-8">
              <NavLink
                to="/subscription-list"
                className="btn btn-outline-brand-03 border-1 rounded-2 f-align-center px-md-13"
              >
                查看其它方案
              </NavLink>
              <button
                className="btn btn-brand-03 rounded-2 slide-right-hover f-align-center ms-4 px-md-13"
                onClick={toNextStep}
              >
                前往付款
                <span className="material-symbols-outlined icon-fill fs-4 ms-1">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
PaymentStepSection1.propTypes = {
  prices: PropTypes.object.isRequired,
  duration: PropTypes.oneOf(["price_monthly", "price_annually"]).isRequired,
  subscriptionPlan: PropTypes.string.isRequired,
  toNextStep: PropTypes.func.isRequired,
};
