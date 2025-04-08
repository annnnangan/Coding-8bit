import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import Swal from "sweetalert2";

import subscriptionApi from "@/api/subscriptionApi";
import orderApi from "@/api/orderApi";

import PaymentStepSection3 from "@/components/subscription/PaymentStepSection3";
import Loader from "@/components/common/Loader";

export default function SubscriptionPaymentResult() {
  // loading
  const [loadingState, setLoadingState] = useState(false);

  const getFromSession = (key) => sessionStorage.getItem(key) || "";
  const subscriptionPlan = getFromSession("subscriptionPlan");
  const duration = getFromSession("duration");
  const formattedToday = getFromSession("formattedToday");
  const formattedNextMonth = getFromSession("formattedNextMonth");
  const formattedNextYear = getFromSession("formattedNextYear");
  const transactionId = getFromSession("transactionId");
  const subscriptionId = getFromSession("subscriptionId");

  const [payResult, setPayResult] = useState([]);
  const [isPaid, setIsPaid] = useState(false);
  const [isPending, setIsPending] = useState(true);

  // 更新訂單狀態
  const updateOrderStatus = async (subscriptionId) => {
    setLoadingState(true);
    try {
      await subscriptionApi.updateSubscription(subscriptionId, {
        status: "active",
      }),
        Swal.fire({
          title: "付款成功",
          icon: "success",
        });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "訂單狀態更新失敗",
        text: error.response?.data?.message || "發生未知錯誤",
      });
    } finally {
      setLoadingState(false);
    }
  };

  useEffect(() => {
    const checkPaymentStatus = async () => {
      setLoadingState(true);
      try {
        const response = await orderApi.checkPayResult(transactionId);
        setPayResult(response);
        const transaction = response;

        if (
          transaction.status === "completed" ||
          transaction.status === "paid"
        ) {
          setIsPaid(true);
          await updateOrderStatus(subscriptionId);
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
    checkPaymentStatus();
  }, [subscriptionId, transactionId]);

  return (
    <>
      <Helmet>
        <title>Coding∞bit ｜ 付款結果</title>
      </Helmet>
      {loadingState && <Loader />}

      {!isPending ? (
        <>
          {isPaid ? (
            <PaymentStepSection3
              price={Number(payResult.amount)}
              duration={duration}
              subscriptionPlan={subscriptionPlan}
              formattedToday={formattedToday}
              formattedNextMonth={formattedNextMonth}
              formattedNextYear={formattedNextYear}
            />
          ) : (
            <main className="subscription-booking-success-section wrap">
              <div className="container">
                <div className="f-center">
                  <div>
                    <h1 className="fs-2 fs-lg-1 text-brand-03 f-align-center">
                      <span className="material-symbols-outlined icon-fill display-3 text-brand-03 me-5">
                        close
                      </span>
                      付款失敗
                    </h1>
                    <p>發生未知錯誤，請重新進行訂閱流程</p>
                    <div>
                      <NavLink
                        to="/"
                        className="btn btn-brand-03 slide-right-hover f-align-center rounded-2 mt-6 mt-lg-10"
                      >
                        回到首頁
                        <span className="material-symbols-outlined icon-fill fs-6 fs-md-5">
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
      ) : (
        <main className="subscription-booking-success-section wrap">
          <div className="container">
            <div className="f-center py-10">
              <h1 className="fs-2 fs-lg-1 text-brand-03 f-align-center">
                付款處理中...
              </h1>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
