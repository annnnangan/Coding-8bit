import { useEffect, useState } from "react";
import { useSearchParams, NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import Swal from "sweetalert2";

import subscriptionApi from "@/api/subscriptionApi";
import orderApi from "@/api/orderApi";

import PaymentStepSection3 from "@/components/subscription/PaymentStepSection3";
import Loader from "@/components/common/Loader";

export default function SubscriptionPaymentResult() {
  // loading
  const [loadingState, setLoadingState] = useState(false);

  // 取得路由中的值
  const [searchParams] = useSearchParams();
  
  const gateway = searchParams.get("gateway");
  const transactionId = searchParams.get("transactionId");
  const duration = searchParams.get("duration");
  const orderId = searchParams.get("orderId");

  const [formattedToday, setFormattedToday] = useState("");
  const [formattedNextMonth, setFormattedNextMonth] = useState("");
  const [formattedNextYear, setFormattedNextYear] = useState("");

  const [payResult, setPayResult] = useState([]);
  const [isPaid, setIsPaid] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const checkPaymentStatus = async (transactionId) => {
    setLoadingState(true);
    try {
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

      // 下個月的日期
      const endNextMonthDate = nextMonth
        .toLocaleDateString("zh-TW", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\//g, "-");
      setFormattedNextMonth(endNextMonthDate);

      // 明年的日期
      const nextYear = new Date();
      nextYear.setFullYear(nextYear.getFullYear() + 1);
      const endNextYearDate = nextYear
        .toLocaleDateString("zh-TW", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\//g, "-");

      setFormattedNextYear(endNextYearDate);

      const response = await orderApi.checkPayResult(transactionId);
      setPayResult(response);
      const transaction = response.data;

      if (transaction.status === "completed" || transaction.status === "paid") {
        Swal.fire({
          title: "付款成功",
          icon: "success",
        });
        setIsPaid(true);
        updateOrderStatus();
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
  const updateOrderStatus = async () => {
    setLoadingState(true);
    try {
      await Promise.all([
        orderApi.updateOrder(orderId, {
          order_type: subscriptionPlan,
          target_id: subscriptionId,
          amount: payResult.amount,
          order_status: "paid",
        }),
        subscriptionApi.updateSubscription(subscriptionId, {
          status: "active",
        }),
      ]);

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
    if (gateway) {
      document.getElementById("newebpay-form").submit();
      checkPaymentStatus(transactionId);
    }
  }, [gateway]);
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
              prices={payResult.amount}
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
