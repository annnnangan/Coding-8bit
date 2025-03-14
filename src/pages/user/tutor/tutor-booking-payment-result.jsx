import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import Swal from "sweetalert2";

import Loader from "@/components/common/Loader";

import orderApi from "@/api/orderApi";
import { serviceTypeMap } from "@/utils/schema/booking-schema";
import { formatHour, formatDate } from "@/utils/timeFormatted-utils";

export default function BookingPaymentResult() {
  // loading
  const [loadingState, setLoadingState] = useState(false);

  const [payResult, setPayResult] = useState([]);
  const [isPaid, setIsPaid] = useState(false);
  const [isPending, setIsPending] = useState(true);

  const checkPaymentStatus = async (transactionId) => {
    setLoadingState(true);
    try {
      const response = await orderApi.checkPayResult(transactionId);
      setPayResult(response);
      const transaction = response;

      if (transaction.status === "completed" || transaction.status === "paid") {
        setIsPaid(true);
        // updateOrderStatus(subscriptionId);
      } else {
        Swal.fire({
          icon: "warning",
          title: "付款未完成",
          text: "請確認您的付款狀態",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "查詢失敗",
        text: error.response?.data?.message || "發生未知錯誤",
      });
    } finally {
      setIsPending(false);
      setLoadingState(false);
    }
  };

  // 更新訂單狀態
  //   const updateOrderStatus = async (subscriptionId) => {
  //     setLoadingState(true);
  //     try {
  //       await subscriptionApi.updateSubscription(subscriptionId, {
  //         status: "active",
  //       }),
  //         Swal.fire({
  //           title: "付款成功",
  //           icon: "success",
  //         });
  //     } catch (error) {
  //       Swal.fire({
  //         icon: "error",
  //         title: "訂單狀態更新失敗",
  //         text: error.response?.data?.message || "發生未知錯誤",
  //       });
  //     } finally {
  //       setLoadingState(false);
  //     }
  //   };

  // 取用付款頁存下來的資料
  const [bookingSuccessResult, setBookingSuccessResult] = useState({
    tutor_name: "",
    booking_date: "",
    service_type: "",
    hourly_availability: [],
    source_code_url: "",
    instruction_details: "",
  });

  useEffect(() => {
    const storedBookingDetails = JSON.parse(sessionStorage.getItem("bookingDetails"));
    console.log("storedBookingDetails", storedBookingDetails);
    setBookingSuccessResult(storedBookingDetails);
    checkPaymentStatus(storedBookingDetails.transactionId);
  }, []);

  return (
    <>
      <Helmet>
        <title>Coding∞bit ｜ 付款結果</title>
      </Helmet>
      {loadingState && <Loader />}

      {!isPending ? (
        <>
          {isPaid ? (
            <>
              <div className="f-center mt-8">
                <h1 className="fs-2 fs-lg-1 text-brand-03 f-align-center">
                  <span className="material-symbols-outlined icon-fill display-3 text-brand-03 me-5">check_circle </span>
                  付款成功
                </h1>
              </div>
              <div className="row f-center">
                <div className="col-md-8 col-xxl-6 mt-10 mt-lg-11">
                  <div className="card shadow rounded-2 p-6 p-lg-10">
                    <h2 className="fs-5 fs-lg-4 w-bolder">預約詳細資訊</h2>

                    {/* 詳細預約內容 */}
                    <div className="mt-6">
                      <div className="row row-cols-md-2">
                        <div className="mb-md-12 mb-6">
                          <label htmlFor="tutor" className="form-label">
                            <h3 className="fs-6 fw-medium">預約老師</h3>
                          </label>
                          <input type="text" className="form-control border-0 bg-white p-0 rounded-0 text-gray-02" id="tutor" defaultValue={bookingSuccessResult.tutor_name} disabled />
                        </div>
                        <div className="mb-md-12 mb-6">
                          <label htmlFor="bookingType" className="form-label">
                            <h3 className="fs-6 fw-medium">預約類型</h3>
                          </label>
                          <input
                            type="text"
                            className="form-control border-0 bg-white p-0 rounded-0 text-gray-02"
                            id="bookingType"
                            defaultValue={serviceTypeMap[bookingSuccessResult.service_type]}
                            disabled
                          />
                        </div>
                        <div className="mb-md-5 mb-6">
                          <label htmlFor="booking_date" className="form-label">
                            <h3 className="fs-6 fw-medium">預約日期</h3>
                          </label>
                          <input
                            type="text"
                            className="form-control border-0 bg-white p-0 rounded-0 text-gray-02"
                            id="booking_date"
                            defaultValue={formatDate(bookingSuccessResult.booking_date)}
                            disabled
                          />
                        </div>
                        <div className="mb-md-5 mb-6">
                          <label htmlFor="timeSlot" className="form-label">
                            <h3 className="fs-6 fw-medium">預約時段</h3>
                          </label>
                          <div className="d-flex flex-wrap gap-1">
                            {bookingSuccessResult.hourly_availability.map((time) => (
                              <input
                                key={time}
                                type="text"
                                className="form-control border-0 bg-white p-0 rounded-0 text-gray-02"
                                id="timeSlot"
                                value={`${formatHour(time)} - ${formatHour(time + 1)}`}
                                disabled
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <hr />

                      <div className="mt-10">
                        {bookingSuccessResult.service_type === "codeReview" ? (
                          <>
                            <div className="mb-8">
                              <label htmlFor="source_code_url" className="form-label">
                                希望接受檢視的程式碼儲存庫
                              </label>
                              <input className="form-control border-0 bg-white p-0 rounded-0 text-gray-02 h-100" id="source_code_URL" defaultValue={bookingSuccessResult.source_code_url} disabled />
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
                                defaultValue={bookingSuccessResult.instruction_details}
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
                                defaultValue={bookingSuccessResult.instruction_details}
                                disabled
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* 提醒 */}
                    <div className="mt-6 alert bg-brand-02 f-center" role="alert">
                      <span className="material-symbols-outlined me-2"> info </span>
                      {bookingSuccessResult.service_type === "codeReview" ? "檢視結果將於預約時間結束時回覆。" : "會議連結將於預約時間前一天發送至您的電子信箱。"}
                    </div>

                    {/* Button */}
                    <NavLink to="/" className="btn btn-brand-03 slide-right-hover f-center rounded-2 w-100">
                      回到首頁
                      <span className="material-symbols-outlined icon-fill fs-6 fs-md-5 mt-1 ms-1"> arrow_forward </span>
                    </NavLink>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <main className="subscription-booking-success-section wrap">
              <div className="container">
                <div className="f-center">
                  <div>
                    <h1 className="fs-2 fs-lg-1 text-brand-03 f-align-center">
                      <span className="material-symbols-outlined icon-fill display-3 text-brand-03 me-5">close</span>
                      付款失敗
                    </h1>
                    <p>發生未知錯誤，請重新進行預約</p>
                    <div>
                      <NavLink to="/" className="btn btn-brand-03 slide-right-hover f-align-center rounded-2 mt-6 mt-lg-10">
                        回到首頁
                        <span className="material-symbols-outlined icon-fill fs-6 fs-md-5">arrow_forward</span>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          )}
        </>
      ) : (
        <main className="subscription-booking-success-section wrap">
          <div className="container">
            <div className="f-center py-10">
              <h1 className="fs-2 fs-lg-1 text-brand-03 f-align-center">付款處理中...</h1>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
