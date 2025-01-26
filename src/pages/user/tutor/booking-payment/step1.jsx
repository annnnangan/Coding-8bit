import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function TutorBookingPaymentStep1() {
  // 取得路由中的值 (id 及 1on1 or code-review)
  const { id } = useParams();
  const { type } = useParams();

  // 傳遞預約種類路由參數
  const navigate = useNavigate();
  const handleNavigate = (type) => {
    navigate(`/tutor/${id}/booking-payment-step2/${type}`);
  };
  // 跳轉至下一頁
  const toNextPage = () => {
    handleNavigate(type);
  };

  return (
    <>
      <Helmet>
        <title>Coding∞bit ｜ 確認預約資訊</title>
      </Helmet>
      <main className="tutor-booking-section wrap-lg">
        <div className="container">
          {/* Step Tracking */}
          <div className="tracking">
            <div className="row row-cols-lg-5 row-cols-3 g-5 justify-content-center">
              <div className="text-brand-03">
                <div className="d-flex border-bottom border-brand-03 border-5 ps-0 rounded-1 pb-1">
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
              <div className="text-brand-02">
                <div className="d-flex border-bottom border-brand-02 border-5 ps-0 rounded-1 pb-1 h-100">
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
                <h2 className="fs-5 fs-lg-3">預約資訊</h2>
                <form className="mt-6">
                  <div className="row row-cols-md-2">
                    <div className="mb-md-12 mb-6">
                      <label htmlFor="tutor" className="form-label">
                        <h3 className="fs-6 fw-medium">預約老師</h3>
                      </label>
                      <input
                        type="text"
                        className="form-control border-0 bg-white p-0 rounded-0 text-gray-02"
                        id="tutor"
                        value="卡斯伯 Casper"
                        disabled
                      />
                    </div>
                    <div className="mb-md-12 mb-6">
                      <label htmlFor="bookingType" className="form-label">
                        <h3 className="fs-6 fw-medium">預約類型</h3>
                      </label>
                      <input
                        type="text"
                        className="form-control border-0 bg-white p-0 rounded-0 text-gray-02"
                        id="bookingType"
                        value={type === "1on1" ? "一對一教學" : "程式碼檢視"}
                        disabled
                      />
                    </div>
                    <div className="mb-md-5 mb-6">
                      <label htmlFor="date" className="form-label">
                        <h3 className="fs-6 fw-medium">預約日期</h3>
                      </label>
                      <input
                        type="text"
                        className="form-control border-0 bg-white p-0 rounded-0 text-gray-02"
                        id="date"
                        value="2024/08/11"
                        disabled
                      />
                    </div>
                    <div className="mb-md-5 mb-6">
                      <label htmlFor="timeSlot" className="form-label">
                        <h3 className="fs-6 fw-medium">預約時段</h3>
                      </label>
                      <input
                        type="text"
                        className="form-control border-0 bg-white p-0 rounded-0 text-gray-02"
                        id="timeSlot"
                        value="10:00-11:00"
                        disabled
                      />
                    </div>
                  </div>
                  <hr />

                  <div className="mt-10">
                    {type === "code-review" ? (
                      <div className="mb-8">
                        <label htmlFor="sourceCodeURL" className="form-label">
                          希望接受檢視的程式碼儲存庫
                          <span className="text-danger ms-1">*</span>
                        </label>
                        <input
                          className="form-control rounded-1"
                          id="sourceCodeURL"
                          placeholder="https://github.com/testUser/todolist"
                        />
                      </div>
                    ) : (
                      ""
                    )}
                    <div>
                      <label htmlFor="userInput" className="form-label">
                        希望接受指導的項目
                        <span className="text-danger ms-1">*</span>
                      </label>
                      <textarea
                        className="form-control rounded-1"
                        id="userInput"
                        rows="15"
                        style={{ resize: "none" }}
                        placeholder="請輸入希望接受指導的項目"
                      ></textarea>
                    </div>
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

                <div className="d-flex justify-content-end">
                  <input
                    type="text"
                    className="form-control border-0 border-bottom rounded-0"
                    id="discountCode"
                    placeholder="輸入折扣碼"
                    style={{ width: "30%" }}
                  />
                  <button className="btn border-0 p-0 text-gray-03 border-bottom rounded-0">
                    <span className="material-symbols-outlined"> near_me </span>
                  </button>
                </div>

                <table className="table border-top mt-8">
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
                  className="btn btn-brand-03 slide-right-hover f-center rounded-2 w-100 mt-8"
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
