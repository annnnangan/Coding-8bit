import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { PaymentForm } from "../../../../components/subscription/paymentForm";
import { BuyerForm } from "../../../../components/subscription/BuyerForm";

export default function TutorBookingPaymentStep2() {
  // 取得路由中的值 (id 及 1on1 or code-review)
  const { id } = useParams();
  const { type } = useParams();

  // 傳遞預約種類路由參數
  const navigate = useNavigate();
  const handleNavigate = (type) => {
    navigate(`/tutor/${id}/booking-payment-success/${type}`);
  };

  // 跳轉至下一頁
  const toNextPage = () => {
    handleNavigate(type);
  };

  // 表單資料來自兩個子元件表單
  const [formData, setFormData] = useState({
    buyerForm: null,
    creditCardForm: null,
  });

  // 使用 useRef 來操作子元件的表單提交
  const buyerFormRef = useRef(null);
  const creditCardFormRef = useRef(null);

  // 觸發兩個子元件表單的資料提交
  const handleSubmit = () => {
    buyerFormRef.current.submitForm();
    creditCardFormRef.current.submitForm();
    console.log(formData);
    toNextPage();
  };

  return (
    <>
      <Helmet>
        <title>Coding∞bit ｜ 確認付款</title>
      </Helmet>
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
                <BuyerForm ref={buyerFormRef} setFormData={setFormData} />
              </div>
              <div className="input-card card shadow rounded-2 p-6 p-lg-10 mt-6">
                <h2 className="fs-5 fs-lg-3">付款方式</h2>
                <PaymentForm
                  ref={creditCardFormRef}
                  setFormData={setFormData}
                />
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
                  onClick={handleSubmit}
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
            onClick={handleSubmit}
          >
            確定付款
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
