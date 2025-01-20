import { useReducer } from "react";
import { NavLink, useParams } from "react-router-dom";

export default function SubscriptionPayment() {
  // reducer - payment step
  const initialState = {
    step: 1,
    formData: {},
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "next":
        return {
          ...state,
          step: state.step + 1,
        };
      case "prev":
        return {
          ...state,
          step: state.step - 1,
        };
      case "update":
        return {
          ...state,
          formData: { ...state.formData, ...action.payload },
        };
      default:
        throw new Error();
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const toPrevStep = () => dispatch({ type: "prev" });
  const toNextStep = () => dispatch({ type: "next" });
  // const handleUpdate = (key, value) => dispatch({ type: 'update', payload: { [key]: value } });

  // 訂閱方案及各方案價格
  const prices = {
    normal: {
      monthly: "299",
      annually: "2,399",
    },
    premium: {
      monthly: "499",
      annually: "5,799",
    },
  };

  // 取得路由中的值
  const { subscriptionPlan, duration } = useParams();

  return (
    <>
      {state.step === 1 && (
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
                  {subscriptionPlan === "normal" && "升級方案 - 基本會員"}
                  {subscriptionPlan === "premium" && "升級方案 - 高級會員"}
                </li>
              </ol>
            </nav>
            <h1 className="fs-2 fs-lg-1 text-brand-03 mt-8">
              {subscriptionPlan === "normal" && "升級方案 - 基本會員"}
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
                  <span className="fs-4 fs-lg-3 fw-normal ms-2">
                    {duration === "monthly" && "/ 月"}
                    {duration === "annually" && "/ 年"}
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
                  onClick={() => toNextStep()}
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
      )}
      {state.step === 2 && (
        <>
          <main className="subscription-booking-section wrap-lg">
            <div className="container">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <NavLink to="/" className="underline-hover">
                      首頁
                    </NavLink>
                  </li>
                  <li className="breadcrumb-item">
                    <NavLink
                      to="/subscription-list"
                      className="underline-hover"
                    >
                      訂閱方案
                    </NavLink>
                  </li>
                  <li className="breadcrumb-item d-none d-sm-block">
                    {subscriptionPlan === "normal" && (
                      <button
                        type="button"
                        className="nav-link underline-hover"
                        onClick={() => toPrevStep()}
                      >
                        升級方案 - 基本會員
                      </button>
                    )}
                    {subscriptionPlan === "premium" && (
                      <button
                        type="button"
                        className="nav-link underline-hover"
                        onClick={() => toPrevStep()}
                      >
                        升級方案 - 高級會員
                      </button>
                    )}
                  </li>
                  <li className="breadcrumb-item d-sm-none">...</li>
                  <li
                    className="breadcrumb-item active fw-semibold"
                    aria-current="page"
                  >
                    確認付款
                  </li>
                </ol>
              </nav>
              <h1 className="fs-2 fs-lg-1 text-brand-03 mt-8">確認付款</h1>
              <div className="row mt-8 mt-lg-12">
                <div className="col-lg-7">
                  <div className="input-card card shadow rounded-2 p-6 p-lg-10 ">
                    <h2 className="fs-5 fs-lg-3">購買人資訊</h2>
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
                          記住我的資訊
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
                          defaultChecked
                        />
                        <label
                          className="form-check-label"
                          htmlFor="creditCard"
                        >
                          信用卡
                        </label>
                      </div>
                      <div className="mt-6">
                        <label
                          htmlFor="userCreditCardNumber"
                          className="form-label"
                        >
                          <h3 className="fs-6 fw-medium">
                            信用卡號碼
                            <span className="text-danger ms-1">*</span>
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
                          <label
                            htmlFor="credit-card-cvc"
                            className="form-label"
                          >
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
                          記住卡片資訊
                        </label>
                      </div>
                    </form>
                  </div>
                </div>

                {/* 電腦版明細卡片 */}
                <div className="col-lg-5 d-none d-lg-block">
                  <div className="input-card card shadow rounded-2 p-6 p-lg-10">
                    <h2 className="fs-5 fs-lg-3">訂閱方案明細</h2>
                    <table className="table mt-8">
                      <tbody>
                        <tr className="border-top border-bottom f-between-center">
                          <th scope="row" className="border-0">
                            <h4 className="fs-6 fs-lg-5 fw-medium py-10">
                              {subscriptionPlan === "normal" && "基本會員方案"}
                              {subscriptionPlan === "premium" && "高級會員方案"}
                              {duration === "monthly" ? " / 月" : " / 年"}
                            </h4>
                          </th>
                          <td className="border-0 text-end">
                            <h4 className="fs-6 fs-lg-5 fw-medium py-10">
                              NT$ {prices[subscriptionPlan]?.[duration] || ""}
                            </h4>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table className="table border-0 mt-8">
                      <tbody>
                        <tr className="f-between-center">
                          <th scope="row" className="border-0">
                            <h4 className="fs-6 fs-lg-5">總計</h4>
                          </th>
                          <td className="border-0 text-end">
                            <h4 className="fs-2">
                              NT$ {prices[subscriptionPlan]?.[duration] || ""}
                            </h4>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <button
                      className="btn btn-brand-03 slide-right-hover f-center rounded-2 w-100 mt-8"
                      onClick={() => toNextStep()}
                    >
                      立即付款
                      <span className="material-symbols-outlined icon-fill fs-6 fs-md-5 mt-1 ms-1">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* 手機版明細卡片 */}
          <div className="media-subscription-price-card sticky-bottom bg-white border-top d-lg-none px-4 py-5">
            <div className="f-between-center">
              <div>
                <h4 className="fs-6 fs-lg-5 fw-medium">
                  {subscriptionPlan === "normal" && "基本會員方案"}
                  {subscriptionPlan === "premium" && "高級會員方案"}
                  {duration === "monthly" ? " / 月" : " / 年"}
                </h4>
                <h4 className="text-brand-03 fs-lg-2 fs-3 mt-1">
                  NT$ {prices[subscriptionPlan]?.[duration] || ""}
                </h4>
              </div>
              <button
                className="btn btn-brand-03 slide-right-hover f-center rounded-2"
                onClick={() => toNextStep()}
              >
                立即付款
                <span className="material-symbols-outlined icon-fill fs-6 fs-md-5 mt-1 ms-1">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </>
      )}
      {state.step === 3 && (
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
                            {subscriptionPlan === "normal" && "基本會員方案"}
                            {subscriptionPlan === "premium" && "高級會員方案"}
                            {duration === "monthly" ? " / 月" : " / 年"}
                          </h3>
                        </th>
                        <td className="border-0 text-end">
                          <h3 className="fs-5 fs-lg-4 pt-6">
                            NT$ {prices[subscriptionPlan]?.[duration] || ""}
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
                            <time>2024 / 9 / 22</time>
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" className="border-0">
                          <h4 className="fs-6 fw-medium pb-6 mt-3">終止日期</h4>
                        </th>
                        <td className="border-0 text-end">
                          <p className="pb-6 mt-3">
                            <time>2024 / 10 / 21</time>
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
      )}
    </>
  );
}
