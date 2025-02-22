import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { BookingSchema } from "@/utils/schema/booking-schema";
import { serviceTypeMap } from "@/utils/schema/booking-schema";
import { formatDate } from "@/utils/timeFormatted-utils";

import { CreditCardForm } from "@/components/common/payment-form/CreditCardForm";
import { BuyerForm } from "@/components/common/payment-form/BuyerForm";

import { updateFormData } from "../../../utils/slice/bookingSlice";

const stepFields = [
  {
    step: 1,
    field: [
      "booking.booking_date",
      "booking.start_time",
      "booking.service_type",
      "booking.tutor_name",
      "booking.tutor_id",
      "booking.source_code_url",
      "booking.instruction_details",
      "booking.coupon_code",
    ],
  },
  {
    step: 2,
    field: ["buyerEmail", "buyerName", "buyerTel", "userCreditCardNumber", "creditCardExpiration", "creditCardCvc"],
  },
];

export default function TutorBookingPayment() {
  const [currentStep, setCurrentStep] = useState(1);

  // 建立Dispatch 來修改 RTK的State
  const dispatch = useDispatch();

  const bookingFormData = useSelector((state) => state.booking);
  const { tutor_id, tutor_name, booking_date, start_time, end_time, service_type, price, source_code_url, instruction_details } = bookingFormData;

  const methods = useForm({
    resolver: zodResolver(BookingSchema),
  });

  useEffect(() => {
    methods.reset({
      booking: {
        tutor_id: tutor_id,
        tutor_name: tutor_name,
        service_type: service_type,
        booking_date: booking_date,
        start_time: start_time,
      },
    });
  }, [tutor_id, tutor_name, service_type, booking_date, start_time, methods]);

  const toNextStep = async () => {
    const isValid = await methods.trigger(stepFields[currentStep - 1].field);
    console.log("Date field valid:", isValid);

    if (!isValid) return;

    // Clear errors for the previous step before moving to the next
    const formData = methods.getValues();

    if (currentStep === 1) {
      if (isValid) setCurrentStep((currentStep) => currentStep + 1);
      methods.clearErrors(stepFields[currentStep].field);

      console.log(formData.booking.source_code_url);
      if (service_type === "codeReview") {
        dispatch(updateFormData({ source_code_url: formData.booking.source_code_url }));
      }

      dispatch(updateFormData({ instruction_details: formData.booking.instruction_details }));
    }

    if (currentStep === 2) {
      await methods.handleSubmit(onSubmit)();
      setCurrentStep((currentStep) => currentStep + 1);
    }
  };

  const onSubmit = (data) => {
    console.log("data", data);
  };

  return (
    <>
      <Helmet>
        <title>Coding∞bit ｜ 預約付款</title>
      </Helmet>

      <main className="wrap-lg">
        <div className="container">
          {/* Step Tracking */}
          <div className="tracking">
            <div className="row row-cols-lg-5 row-cols-3 g-5 justify-content-center">
              <div className={currentStep === 1 ? "text-brand-03" : "text-brand-02"}>
                <div className={`d-flex border-bottom ${currentStep === 1 ? "border-brand-03" : "border-brand-02"} border-5 ps-0 rounded-1 pb-1`}>
                  <div className="d-flex align-items-center">
                    <span className="material-symbols-outlined icon-fill fs-3 me-2 d-none d-sm-block"> shopping_cart </span>
                    <div>
                      <p className="fs-8">Step 1/3</p>
                      <p className="fw-semibold fs-8 fs-lg-6">確認預約資訊</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={currentStep === 2 ? "text-brand-03" : "text-brand-02"}>
                <div className={`d-flex border-bottom ${currentStep === 2 ? "border-brand-03" : "border-brand-02"} border-5 ps-0 rounded-1 pb-1`}>
                  <div className="d-flex align-items-center mb-auto">
                    <span className="material-symbols-outlined icon-fill fs-3 me-2 d-none d-sm-block"> credit_card </span>
                    <div>
                      <p className="fs-8">Step 2/3</p>
                      <p className="fw-semibold fs-8 fs-lg-6">確認付款</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={currentStep === 3 ? "text-brand-03" : "text-brand-02"}>
                <div className={`d-flex border-bottom ${currentStep === 3 ? "border-brand-03" : "border-brand-02"} border-5 ps-0 rounded-1 pb-1`}>
                  <div className="d-flex align-items-center mb-auto">
                    <span className="material-symbols-outlined icon-fill fs-3 me-2 d-none d-sm-block"> check_circle </span>
                    <div>
                      <p className="fs-8">Step 3/3</p>
                      <p className="fw-semibold fs-8 fs-lg-6">付款結果</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              {currentStep === 1 && (
                <>
                  <div className="row mt-8 mt-lg-12">
                    {/* 表單 */}
                    <div className="col-lg-7">
                      <div className="input-card card shadow rounded-2 p-6 p-lg-10">
                        <h2 className="fs-5 fs-lg-3 mb-5">預約資訊</h2>

                        <div className="row row-cols-md-2">
                          <div className="mb-md-12 mb-6">
                            <label htmlFor="tutor" className="form-label">
                              <h3 className="fs-6 fw-medium">預約老師</h3>
                            </label>
                            <input type="text" className="form-control border-0 bg-white p-0 rounded-0 text-gray-02" id="tutor" value={tutor_name} disabled />
                          </div>
                          <div className="mb-md-12 mb-6">
                            <label htmlFor="service_type" className="form-label">
                              <h3 className="fs-6 fw-medium">預約類型</h3>
                            </label>
                            <input type="text" className="form-control border-0 bg-white p-0 rounded-0 text-gray-02" id="service_type" value={serviceTypeMap[service_type]} disabled />
                          </div>
                          <div className="mb-md-5 mb-6">
                            <label htmlFor="date" className="form-label">
                              <h3 className="fs-6 fw-medium">預約日期</h3>
                            </label>
                            <input type="text" className="form-control border-0 bg-white p-0 rounded-0 text-gray-02" id="date" value={formatDate(booking_date)} disabled />
                          </div>
                          <div className="mb-md-5 mb-6">
                            <label htmlFor="timeSlot" className="form-label">
                              <h3 className="fs-6 fw-medium">預約時段</h3>
                            </label>
                            <input type="text" className="form-control border-0 bg-white p-0 rounded-0 text-gray-02" id="timeSlot" value={`${start_time} - ${end_time}`} disabled />
                          </div>
                        </div>
                        <hr />

                        <div className="mt-10">
                          {service_type === "codeReview" && (
                            <div className="mb-8">
                              <label htmlFor="source_code_url" className="form-label">
                                希望接受檢視的程式碼儲存庫
                                <span className="text-danger ms-1">*</span>
                              </label>
                              <input
                                className={`form-control rounded-1 ${methods?.formState?.errors?.booking?.source_code_url && "is-invalid"} `}
                                id="source_code_url"
                                placeholder="https://github.com/testUser/todolist"
                                {...methods.register("booking.source_code_url")}
                              />
                              {methods?.formState?.errors?.booking?.source_code_url?.message && <div className="invalid-feedback">{methods?.formState?.errors?.booking?.source_code_url?.message}</div>}
                            </div>
                          )}

                          <div>
                            <label htmlFor="instruction_details" className="form-label">
                              希望接受指導的項目
                              <span className="text-danger ms-1">*</span>
                            </label>
                            <textarea
                              className={`form-control rounded-1 ${methods?.formState?.errors?.booking?.instruction_details && "is-invalid"} `}
                              id="instruction_details"
                              rows="15"
                              style={{ resize: "none" }}
                              placeholder="請輸入希望接受指導的項目"
                              {...methods.register("booking.instruction_details")}
                            ></textarea>
                            {methods?.formState?.errors?.booking?.instruction_details?.message && (
                              <div className="invalid-feedback">{methods?.formState?.errors?.booking.instruction_details?.message} </div>
                            )}
                          </div>
                        </div>
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
                                <h4 className="fs-6 fs-lg-5 fw-medium">NT$ {price}</h4>
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
                          <input type="text" className="form-control border-0 border-bottom rounded-0" id="discountCode" placeholder="輸入折扣碼" style={{ width: "30%" }} />
                          <button className="btn border-0 p-0 text-gray-03 border-bottom rounded-0" type="submit">
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
                                <h4 className="fs-2">NT$ {price}</h4>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <button className="btn btn-brand-03 slide-right-hover f-center rounded-2 w-100 mt-8" onClick={toNextStep}>
                          前往付款
                          <span className="material-symbols-outlined icon-fill fs-6 fs-md-5 mt-1 ms-1"> arrow_forward </span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 手機版明細卡片 */}
                  <div className="sticky-bottom bg-white border-top d-lg-none px-4 py-5">
                    <div className="f-between-center">
                      <div>
                        <h4 className="fs-6 fs-lg-5 fw-medium">小計</h4>
                        <h4 className="text-brand-03 fs-lg-2 fs-3 mt-1">NT$ {price}</h4>
                      </div>

                      <button type="button" className="btn btn-brand-03 slide-right-hover f-center rounded-2" onClick={toNextStep}>
                        前往付款
                        <span className="material-symbols-outlined icon-fill fs-6 fs-md-5 mt-1 ms-1"> arrow_forward </span>
                      </button>
                    </div>
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <div className="row mt-8 mt-lg-12">
                    <div className="col-lg-7">
                      <div className="input-card card shadow rounded-2 p-6 p-lg-10">
                        <h2 className="fs-5 fs-lg-3">預約人資訊</h2>
                        <BuyerForm />
                      </div>
                      <div className="input-card card shadow rounded-2 p-6 p-lg-10 mt-6">
                        <h2 className="fs-5 fs-lg-3">付款方式</h2>
                        <CreditCardForm />
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
                                <h4 className="fs-6 fs-lg-5 fw-medium">NT$ {bookingFormData.price}</h4>
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
                                <h4 className="fs-2">NT$ {bookingFormData.price}</h4>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <button className="btn btn-brand-03 slide-right-hover f-center rounded-2 w-100" type="submit" onClick={toNextStep}>
                          確定付款
                          <span className="material-symbols-outlined icon-fill fs-6 fs-md-5 mt-1 ms-1"> arrow_forward </span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 手機版明細卡片 */}
                  <div className="sticky-bottom bg-white border-top d-lg-none px-4 py-5">
                    <div className="f-between-center">
                      <div>
                        <h4 className="fs-6 fs-lg-5 fw-medium">小計</h4>
                        <h4 className="text-brand-03 fs-lg-2 fs-3 mt-1">NT$ {bookingFormData.price}</h4>
                      </div>

                      <button className="btn btn-brand-03 slide-right-hover f-center rounded-2" type="submit" onClick={toNextStep}>
                        確定付款
                        <span className="material-symbols-outlined icon-fill fs-6 fs-md-5 mt-1 ms-1"> arrow_forward </span>
                      </button>
                    </div>
                  </div>
                </>
              )}

              {currentStep === 3 && (
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
                              <input type="text" className="form-control border-0 bg-white p-0 rounded-0 text-gray-02" id="tutor" defaultValue={tutor_name} disabled />
                            </div>
                            <div className="mb-md-12 mb-6">
                              <label htmlFor="bookingType" className="form-label">
                                <h3 className="fs-6 fw-medium">預約類型</h3>
                              </label>
                              <input type="text" className="form-control border-0 bg-white p-0 rounded-0 text-gray-02" id="bookingType" defaultValue={serviceTypeMap[service_type]} disabled />
                            </div>
                            <div className="mb-md-5 mb-6">
                              <label htmlFor="date" className="form-label">
                                <h3 className="fs-6 fw-medium">預約日期</h3>
                              </label>
                              <input type="text" className="form-control border-0 bg-white p-0 rounded-0 text-gray-02" id="date" defaultValue={formatDate(booking_date)} disabled />
                            </div>
                            <div className="mb-md-5 mb-6">
                              <label htmlFor="timeSlot" className="form-label">
                                <h3 className="fs-6 fw-medium">預約時段</h3>
                              </label>
                              <input type="text" className="form-control border-0 bg-white p-0 rounded-0 text-gray-02" id="timeSlot" defaultValue={`${start_time} - ${end_time}`} disabled />
                            </div>
                          </div>
                          <hr />

                          <div className="mt-10">
                            {service_type === "codeReview" ? (
                              <>
                                <div className="mb-8">
                                  <label htmlFor="sourceCodeURL" className="form-label">
                                    希望接受檢視的程式碼儲存庫
                                  </label>
                                  <input className="form-control border-0 bg-white p-0 rounded-0 text-gray-02 h-100" id="sourceCodeURL" defaultValue={source_code_url} disabled />
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
                                    defaultValue={instruction_details}
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
                                    defaultValue={instruction_details}
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
                          {service_type === "codeReview" ? "檢視結果將於預約時間結束時回覆。" : "會議連結將於預約時間前一天發送至您的電子信箱。"}
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
              )}
            </form>
          </FormProvider>
        </div>
      </main>
    </>
  );
}
