import { useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Swal from "sweetalert2";

import subscriptionApi from "@/api/subscriptionApi";
import orderApi from "@/api/orderApi";

import { CreditCardForm } from "@/components/common/payment-form/CreditCardForm";
import { BuyerForm } from "@/components/common/payment-form/BuyerForm";
import Loader from "@/components/common/Loader";

import { PaymentSchema } from "@/utils/schema/payment-schema";

const step2Fields = [
  "buyerEmail",
  "buyerName",
  "buyerTel",
  "userCreditCardNumber",
  "creditCardExpiration",
  "creditCardCvc",
];

export default function SubscriptionPayment() {
  // loading
  const [loadingState, setLoadingState] = useState(false);

  // 取得路由中的值
  const { subscriptionPlan, duration } = useParams();

  // 目前處於的步驟進度
  const [currentStep, setCurrentStep] = useState(1);

  const methods = useForm({
    resolver: zodResolver(PaymentSchema),
  });

  // 往下一步
  const toNextStep = async () => {
    // 第一步，建立訂閱方案
    if (currentStep === 1) {
      const today = new Date();
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);

      const startDate = today
        .toLocaleDateString("zh-TW", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\//g, "-");
      setFormattedToday(startDate);

      const endDate = nextMonth
        .toLocaleDateString("zh-TW", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\//g, "-");
      setFormattedNextMonth(endDate);

      addSubscription({
        plan_id:
          subscriptionPlan === "normal"
            ? "a05de56e-0228-4cdb-a85a-d1d31589b88a"
            : "6f11324d-4fac-432d-ac4f-182f9873db72",
        billing_cycle: duration,
        start_date: startDate,
        end_date: endDate,
      });
    }

    // 第二步，根據剛剛的訂閱方案建立付款 (建立後預設是處理中，還需一個狀態變為付款成功的動作)
    if (currentStep === 2) {
      const isValid = await methods.trigger(step2Fields);
      if (!isValid) {
        Swal.fire({
          icon: "error",
          title: "請確認所有欄位已經填妥",
        });
        return;
      }
      await methods.handleSubmit(onSubmit)();
    }
  };

  // 往上一步
  const toPrevStep = async () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep) => currentStep - 1);
    }
    if (currentStep === 2) {
      await subscriptionApi.addSubscription(subscriptionId, {
        status: "cancelled",
      });
    }
  };

  // 建立訂閱函式
  const [formattedToday, setFormattedToday] = useState("");
  const [formattedNextMonth, setFormattedNextMonth] = useState("");
  const [subscriptionId, setSubscription] = useState("");

  const navigate = useNavigate();
  // 取得 RTK 使用者資料
  const { isAuth } = useSelector((state) => state.auth);
  const { userData } = useSelector((state) => state.auth);

  const addSubscription = async (subscriptionData) => {
    setLoadingState(true);
    try {
      if (!isAuth) {
        Swal.fire("請先登入再進行訂閱");
        navigate("/login");
        return;
      }
      const res = await subscriptionApi.addSubscription(subscriptionData);
      setSubscription(res.data.id);
      setCurrentStep((currentStep) => currentStep + 1);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "訂閱失敗",
        text: error.response.data.message,
      });
    } finally {
      setLoadingState(false);
    }
  };

  // 建立訂單函式
  const addOrder = async () => {
    setLoadingState(true);
    try {
      const orderData = {
        order_type: "subscription",
        target_id: subscriptionId,
        amount: Number(prices[subscriptionPlan]?.[duration]),
      };

      // 建立訂單
      const res = await orderApi.addOrder({
        user_id: userData.id,
        ...orderData,
      });

      // 付款後，更改訂單與訂閱的狀態
      await Promise.all([
        orderApi.updateOrder(res.data.id, {
          order_status: "paid",
          ...orderData,
        }),
        subscriptionApi.updateSubscription(subscriptionId, {
          status: "active",
        }),
      ]);

      Swal.fire({
        title: "付款成功",
        icon: "success",
      });

      setCurrentStep(3);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "付款失敗",
        text: error.response?.data?.message || "發生未知錯誤",
      });
    } finally {
      setLoadingState(false);
    }
  };

  const onSubmit = () => {
    addOrder();
  };

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

  return (
    <>
      <Helmet>
        <title>Coding∞bit ｜ 訂閱付款</title>
      </Helmet>
      {loadingState && <Loader />}

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {currentStep === 1 && (
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
                      <NavLink
                        to="/subscription-list"
                        className="underline-hover"
                      >
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
                        <p className="fw-medium lh-sm ms-4">
                          可發佈學習客製化需求
                        </p>
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
          )}
          {currentStep === 2 && (
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
                            onClick={toPrevStep}
                          >
                            升級方案 - 基本會員
                          </button>
                        )}
                        {subscriptionPlan === "premium" && (
                          <button
                            type="button"
                            className="nav-link underline-hover"
                            onClick={toPrevStep}
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
                        <h2 className="fs-5 fs-lg-3">訂閱方案明細</h2>
                        <table className="table mt-8">
                          <tbody>
                            <tr className="border-top border-bottom f-between-center">
                              <th scope="row" className="border-0">
                                <h4 className="fs-6 fs-lg-5 fw-medium py-10">
                                  {subscriptionPlan === "normal" &&
                                    "基本會員方案"}
                                  {subscriptionPlan === "premium" &&
                                    "高級會員方案"}
                                  {duration === "monthly" ? " / 月" : " / 年"}
                                </h4>
                              </th>
                              <td className="border-0 text-end">
                                <h4 className="fs-6 fs-lg-5 fw-medium py-10">
                                  NT${" "}
                                  {prices[subscriptionPlan]?.[duration] || ""}
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
                                  NT${" "}
                                  {prices[subscriptionPlan]?.[duration] || ""}
                                </h4>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <button
                          className="btn btn-brand-03 slide-right-hover f-center rounded-2 w-100 mt-8"
                          onClick={toNextStep}
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
                    onClick={toNextStep}
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
          {currentStep === 3 && (
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
                      <h2 className="fs-5 fs-lg-4 w-bolder">
                        訂閱方案詳細資訊
                      </h2>
                      <table className="table border-top border-bottom mt-6 mt-lg-10">
                        <tbody>
                          <tr>
                            <th scope="row" className="border-0">
                              <h3 className="fs-5 fs-lg-4 pt-6">
                                {subscriptionPlan === "normal" &&
                                  "基本會員方案"}
                                {subscriptionPlan === "premium" &&
                                  "高級會員方案"}
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
                                <time>{formattedToday}</time>
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row" className="border-0">
                              <h4 className="fs-6 fw-medium pb-6 mt-3">
                                終止日期
                              </h4>
                            </th>
                            <td className="border-0 text-end">
                              <p className="pb-6 mt-3">
                                <time>{formattedNextMonth}</time>
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
        </form>
      </FormProvider>
    </>
  );
}
