import { NavLink, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function TutorBookingSuccess() {
  // 取得路由中的值 (id 及 1on1 or code-review)
  const { type } = useParams();

  return (
    <>
      <Helmet>
        <title>Coding∞bit ｜ 付款成功</title>
      </Helmet>
      <main className="tutor-booking-success-section wrap">
        <div className="container">
          <div className="f-center">
            <h1 className="fs-2 fs-lg-1 text-brand-03 f-align-center">
              <span className="material-symbols-outlined icon-fill display-3 text-brand-03 me-5">
                {" "}
                check_circle{" "}
              </span>
              付款成功
            </h1>
          </div>
          <div className="row f-center">
            <div className="col-md-8 col-xxl-6 mt-10 mt-lg-11">
              <div className="card shadow rounded-2 p-6 p-lg-10">
                <h2 className="fs-5 fs-lg-4 w-bolder">預約詳細資訊</h2>

                {/* 詳細預約內容 */}
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
                        defaultValue="卡斯伯 Casper"
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
                        defaultValue={
                          type === "1on1" ? "一對一教學" : "程式碼檢視"
                        }
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
                        defaultValue="2024/08/11"
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
                        defaultValue="10:00-11:00"
                        disabled
                      />
                    </div>
                  </div>
                  <hr />

                  <div className="mt-10">
                    {type === "code-review" ? (
                      <>
                        <div className="mb-8">
                          <label htmlFor="sourceCodeURL" className="form-label">
                            希望接受檢視的程式碼儲存庫
                          </label>
                          <input
                            className="form-control border-0 bg-white p-0 rounded-0 text-gray-02 h-100"
                            id="sourceCodeURL"
                            defaultValue="https://github.com/masterchan/next-todo-list.git"
                            disabled
                          />
                        </div>
                        <div>
                          <label htmlFor="userInput" className="form-label">
                            希望接受指導的項目
                          </label>
                          <textarea
                            className="form-control border-0 bg-white p-0 rounded-0 text-gray-02"
                            id="userInput"
                            style={{ resize: "none" }}
                            rows="5"
                            defaultValue="第一次寫NextJs的框架。感覺寫的東西都都堆在一齊，看起來很複雜，不知道要怎麼 factorize 我的程式碼，讓往後維護會更簡單，而且看起來會跟直接，更符合業界標準。希望得到老師的指導。"
                            disabled
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <label htmlFor="userInput" className="form-label">
                            希望接受指導的項目
                          </label>
                          <textarea
                            className="form-control border-0 bg-white p-0 rounded-0 text-gray-02"
                            id="userInput"
                            style={{ resize: "none" }}
                            rows="5"
                            defaultValue="想深入學習 TypeScript 的高級類型，如條件類型、映射類型等，以提高代碼的類型安全性和可讀性。同時也希望了解泛型在實際項目中的最佳實踐。"
                            disabled
                          />
                        </div>
                      </>
                    )}
                  </div>
                </form>

                {/* 提醒 */}
                <div className="mt-6 alert bg-brand-02 f-center" role="alert">
                  <span className="material-symbols-outlined me-2"> info </span>
                  {type === "1on1"
                    ? "檢視結果將於預約時間結束時回覆。"
                    : "會議連結將於預約時間前一天發送至您的電子信箱。"}
                </div>

                {/* Button */}
                <NavLink
                  to="/"
                  className="btn btn-brand-03 slide-right-hover f-center rounded-2 w-100"
                >
                  回到首頁
                  <span className="material-symbols-outlined icon-fill fs-6 fs-md-5 mt-1 ms-1">
                    {" "}
                    arrow_forward{" "}
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
