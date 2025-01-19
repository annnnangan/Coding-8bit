import { useParams, useNavigate } from "react-router-dom";

export default function TutorBookingPaymentStep2() {
  // 取得路由中的值 (id 及 1on1 or code-review)
  const { id } = useParams();
  const { type } = useParams();

  // 傳遞預約種類路由參數
  const navigate = useNavigate();
  const handleNavigate = (type) => {
    navigate(`/tutor/${id}/booking-payment-success/${type}`);
  };
  // 跳轉自下一頁按紐
  const toNextPage = () => {
    handleNavigate(type);
  };

  return (
    <>
      <main className="tutor-booking-section wrap-lg">
        <div className="container">
          {/* Step Tracking */}
          <div className="tracking container">
            <div className="row row-cols-lg-5 row-cols-3 g-5 justify-content-center">
              <div className="text-brand-02">
                <div className="d-flex border-bottom border-brand-02 border-5 ps-0 rounded-1 pb-1">
                  <div className="d-flex align-items-center">
                    <span className="material-symbols-outlined icon-fill fs-3 me-2 d-none d-sm-block">
                      {" "}
                      shopping_cart{" "}
                    </span>
                    <div>
                      <p className="fs-8">Step 1/3</p>
                      <p className="fw-semibold fs-8 fs-lg-6">確認預約資訊</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-brand-03">
                <div className="d-flex border-bottom border-brand-03 border-5 ps-0 rounded-1 pb-1 h-100">
                  <div className="d-flex align-items-center mb-auto">
                    <span className="material-symbols-outlined icon-fill fs-3 me-2 d-none d-sm-block">
                      {" "}
                      credit_card{" "}
                    </span>
                    <div>
                      <p className="fs-8">Step 2/3</p>
                      <p className="fw-semibold fs-8 fs-lg-6">確認付款</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-brand-02">
                <div className="d-flex border-bottom border-brand-02 border-5 ps-0 rounded-1 pb-1 h-100">
                  <div className="d-flex align-items-center mb-auto">
                    <span className="material-symbols-outlined icon-fill fs-3 me-2 d-none d-sm-block">
                      {" "}
                      check_circle{" "}
                    </span>
                    <div>
                      <p className="fs-8">Step 3/3</p>
                      <p className="fw-semibold fs-8 fs-lg-6">付款結果</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-8 mt-lg-12">
            <div className="col-lg-7">
              <div className="input-card card shadow rounded-2 p-6 p-lg-10">
                <h2 className="fs-5 fs-lg-3">預約人資訊</h2>
                <form className="mt-6">
                  <div>
                    <label htmlFor="buyerEmail" className="form-label">
                      <h3 className="fs-6 fw-medium">
                        電子信箱<span className="text-danger ms-1">*</span>
                      </h3>
                    </label>
                    <input
                      type="email"
                      className="form-control rounded-1 border-0 bg-light"
                      id="buyerEmail"
                      aria-describedby="emailHelp"
                      placeholder="請輸入電子信箱"
                    />
                  </div>
                  <div className="row mt-4">
                    <div className="col-lg-6">
                      <label htmlFor="buyerName" className="form-label">
                        <h3 className="fs-6 fw-medium">
                          姓名<span className="text-danger ms-1">*</span>
                        </h3>
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-1 border-0 bg-light mt-1"
                        id="buyerName"
                        placeholder="請輸入姓名"
                      />
                    </div>
                    <div className="col-lg-6">
                      <label
                        htmlFor="buyerPassword"
                        className="form-label mt-4 mt-lg-0"
                      >
                        <h3 className="fs-6 fw-medium">
                          密碼<span className="text-danger ms-1">*</span>
                        </h3>
                      </label>
                      <input
                        type="password"
                        className="form-control rounded-1 border-0 bg-light mt-1"
                        id="buyerPassword"
                        placeholder="請輸入密碼"
                      />
                    </div>
                  </div>
                  <div className="form-check mt-6">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="rememberMeCheckbox"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="rememberMeCheckbox"
                    >
                      {" "}
                      記住我的資訊{" "}
                    </label>
                  </div>
                </form>
              </div>
              <div className="input-card card shadow rounded-2 p-6 p-lg-10 mt-6">
                <h2 className="fs-5 fs-lg-3">付款方式</h2>
                <form className="mt-6">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="pay-with"
                      id="creditCard"
                      defaultChecked={true}
                    />
                    <label className="form-check-label" htmlFor="creditCard">
                      {" "}
                      信用卡{" "}
                    </label>
                  </div>
                  <div className="mt-6">
                    <label
                      htmlFor="userCreditCardNumber"
                      className="form-label"
                    >
                      <h3 className="fs-6 fw-medium">
                        信用卡號碼<span className="text-danger ms-1">*</span>
                      </h3>
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      className="form-control rounded-1 border-0 bg-light mt-1"
                      id="userCreditCardNumber"
                      placeholder="**** **** **** ****"
                      maxLength="19"
                    />
                  </div>
                  <div className="row mt-4">
                    <div className="col-6">
                      <label
                        htmlFor="credit-card-expiration"
                        className="form-label"
                      >
                        <h3 className="fs-6 fw-medium">
                          過期日<span className="text-danger ms-1">*</span>
                        </h3>
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        className="form-control rounded-1 border-0 bg-light mt-1"
                        id="credit-card-expiration"
                        name="credit-card-expiration"
                        placeholder="MM / YY"
                        maxLength="5"
                        required=""
                      />
                    </div>
                    <div className="col-6">
                      <label htmlFor="credit-card-cvc" className="form-label">
                        <h3 className="fs-6 fw-medium">
                          卡片背面後三碼
                          <span className="text-danger ms-1">*</span>
                        </h3>
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        className="form-control rounded-1 border-0 bg-light mt-1"
                        id="credit-card-cvc"
                        name="credit-card-cvc"
                        placeholder="CVC / CVV"
                        pattern="\d{3,4}/"
                        maxLength="3"
                        required=""
                      />
                    </div>
                  </div>
                  <div className="form-check mt-6">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="rememberCardCheckbox"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="rememberCardCheckbox"
                    >
                      {" "}
                      記住卡片資訊{" "}
                    </label>
                  </div>
                </form>
              </div>
            </div>

            {/* 電腦版明細卡片 */}
            <div className="col-lg-5 d-none d-lg-block">
              <div className="input-card card shadow rounded-2 p-6 p-lg-10">
                <h2 className="fs-5 fs-lg-3">預約明細</h2>
                <table className="table mt-8">
                  <tbody>
                    <tr className="f-between-center">
                      <th scope="row" className="border-0">
                        <h4 className="fs-6 fs-lg-5 fw-medium">小計</h4>
                      </th>
                      <td className="border-0 text-end">
                        <h4 className="fs-6 fs-lg-5 fw-medium">NT$ 250</h4>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table className="table mt-8">
                  <tbody>
                    <tr className="f-between-center pb-8">
                      <th scope="row" className="border-0">
                        <h4 className="fs-6 fs-lg-5 fw-medium">折扣</h4>
                      </th>
                      <td className="border-0 text-end">
                        <h4 className="fs-6 fs-lg-5 fw-medium">-NT$ 0</h4>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <table className="table border-top">
                  <tbody>
                    <tr className="f-between-center py-5">
                      <th scope="row" className="border-0">
                        <h4 className="fs-6 fs-lg-5">總計</h4>
                      </th>
                      <td className="border-0 text-end">
                        <h4 className="fs-2">NT$ 250</h4>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <button
                  className="btn btn-brand-03 slide-right-hover f-center rounded-2 w-100"
                  onClick={toNextPage}
                >
                  確定付款
                  <span className="material-symbols-outlined icon-fill fs-6 fs-md-5 mt-1 ms-1">
                    {" "}
                    arrow_forward{" "}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 手機版明細卡片 */}
      <div className="sticky-bottom bg-white border-top d-lg-none px-4 py-5">
        <div className="f-between-center">
          <div>
            <h4 className="fs-6 fs-lg-5 fw-medium">小計</h4>
            <h4 className="text-brand-03 fs-lg-2 fs-3 mt-1">NT$ 250</h4>
          </div>

          <button
            className="btn btn-brand-03 slide-right-hover f-center rounded-2"
            onClick={toNextPage}
          >
            前往付款
            <span className="material-symbols-outlined icon-fill fs-6 fs-md-5 mt-1 ms-1">
              {" "}
              arrow_forward{" "}
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
