import { NavLink } from "react-router-dom";

import PropTypes from "prop-types";

export default function PaymentStepSection3({
  prices,
  duration,
  subscriptionPlan,
  formattedToday,
  formattedNextMonth,
  formattedNextYear,
}) {
  return (
    <>
      <main className="subscription-booking-success-section wrap">
        <div className="container">
          <div className="f-center">
            <h1 className="fs-2 fs-lg-1 text-brand-03 f-align-center">
              <span className="material-symbols-outlined icon-fill display-3 text-brand-03 me-5">
                check_circle
              </span>
              付款成功
            </h1>
          </div>
          <div className="row f-center">
            <div className="col-md-8 col-xxl-6 mt-10 mt-lg-11">
              <div className="card shadow rounded-2 p-6 p-lg-10">
                <h2 className="fs-5 fs-lg-4 w-bolder">訂閱方案詳細資訊</h2>
                <table className="table border-top border-bottom mt-6 mt-lg-10">
                  <tbody>
                    <tr>
                      <th scope="row" className="border-0">
                        <h3 className="fs-5 fs-lg-4 pt-6">
                          {subscriptionPlan === "basic" && "基本會員方案"}
                          {subscriptionPlan === "premium" && "高級會員方案"}
                          {duration === "price_monthly" ? " / 月" : " / 年"}
                        </h3>
                      </th>
                      <td className="border-0 text-end">
                        <h3 className="fs-5 fs-lg-4 pt-6">
                          NT$ {Number(prices[subscriptionPlan]?.[duration]).toLocaleString() || ""}
                        </h3>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" className="border-0">
                        <h4 className="fs-6 fw-medium mt-6 mt-lg-10">
                          開始日期
                        </h4>
                      </th>
                      <td className="border-0 text-end">
                        <p className="mt-6 mt-lg-10">
                          <time>{formattedToday}</time>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" className="border-0">
                        <h4 className="fs-6 fw-medium pb-6 mt-3">終止日期</h4>
                      </th>
                      <td className="border-0 text-end">
                        <p className="pb-6 mt-3">
                          <time>
                            {duration === "price_monthly"
                              ? formattedNextMonth
                              : formattedNextYear}
                          </time>
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <NavLink
                  to="/"
                  className="btn btn-brand-03 slide-right-hover f-center rounded-2 w-100"
                >
                  回到首頁
                  <span className="material-symbols-outlined icon-fill fs-6 fs-md-5 mt-1 ms-1">
                    arrow_forward
                  </span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

PaymentStepSection3.propTypes = {
  prices: PropTypes.object.isRequired,
  duration: PropTypes.oneOf(["price_monthly", "price_annually"]).isRequired,
  subscriptionPlan: PropTypes.string.isRequired,
  formattedToday: PropTypes.string.isRequired,
  formattedNextMonth: PropTypes.string.isRequired,
  formattedNextYear: PropTypes.string.isRequired,
};
