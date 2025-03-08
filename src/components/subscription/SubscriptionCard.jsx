import { useState, useEffect, useMemo } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import PropTypes from "prop-types";
import Swal from "sweetalert2";

import subscriptionApi from "@/api/subscriptionApi";

export default function SubscriptionCard({ duration, setLoadingState }) {
  // 傳遞訂閱方案(基本、高級)及繳費頻率(年繳、月繳)路由參數
  const navigate = useNavigate();
  const handleNavigate = (subscriptionPlan, planId) => {
    navigate(`/subscription/${subscriptionPlan}/${duration}/${planId}`);
  };
  // 跳轉自下一頁按紐
  const toNextPage = (subscriptionPlan, planId) => {
    handleNavigate(subscriptionPlan, planId);
  };

  const planContents = useMemo(
    () => ({
      free: [
        "只需註冊帳號，即可享有服務",
        "可觀看免費影片",
        "可參與影片討論區，與其他使用者交流",
      ],
      basic: [
        "不限次數、不限時長，觀看所有教學影片",
        "可預約一對一教學、程式碼檢視",
        "可成為老師，上傳教學影片，接受學生預約與客製化需求",
      ],
      premium: ["包含基本會員擁有的所有服務", "可發佈學習客製化需求"],
    }),
    []
  );

  // 取得所有方案
  const [plans, setPlans] = useState([]);
  const getPlans = async () => {
    setLoadingState(true);
    try {
      const res = await subscriptionApi.getPlans();
      setPlans(res.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "取得訂閱方案失敗",
        text: error.response?.data?.message || "發生未知錯誤",
      });
    } finally {
      setLoadingState(false);
    }
  };
  useEffect(() => {
    getPlans();
  }, []);

  return (
    <>
      {plans
        .sort((a, b) => a[duration] - b[duration])
        .map((plan) => (
          <div className="col-lg-4" key={plan.id}>
            <div
              className={`subscription-card card shadow ${
                plan.name === "premium" &&
                "border-4 border-brand-01 position-relative"
              }`}
            >
              <div>
                <span className="badge bg-gray-04 rounded-2">
                  <h4 className="card-badge-text">{plan.description}</h4>
                </span>
              </div>
              <div className="mt-4 mt-lg-6 pb-4 pb-lg-6 border-bottom">
                <h4 className="fs-5 fs-lg-4 fw-medium fw-lg-bold f-align-center">
                  NT$
                  <span className="fs-2 fs-lg-1 fw-bold ms-2">
                    {plan[duration].toLocaleString()}
                  </span>
                  <span className="fs-5 fs-lg-4 fw-normal ms-2">
                    {duration === "price_monthly" ? " / 月" : " / 年"}
                  </span>
                </h4>
              </div>
              <div className="card-body p-0 mt-4 mt-lg-6 f-column-between">
                <ul>
                  {planContents[plan.name].map((content, index) => (
                    <li
                      className={`f-align-center ${
                        index !== 0 && "mt-4 mt-lg-4"
                      }`}
                      key={index}
                    >
                      <span className="material-symbols-outlined icon-fill text-brand-03">
                        check_circle
                      </span>
                      <p className="fw-medium lh-sm ms-4">{content}</p>
                    </li>
                  ))}
                </ul>
                {plan.name === "free" ? (
                  <NavLink
                    to="/signup"
                    className="btn btn-brand-03 slide-right-hover f-center w-100 mt-6 mt-lg-10"
                  >
                    立即註冊
                    <span className="material-symbols-outlined icon-fill fs-6 fs-md-5 ms-1">
                      arrow_forward
                    </span>
                  </NavLink>
                ) : (
                  <button
                    className="btn btn-brand-03 slide-right-hover f-center w-100 mt-6 mt-lg-10"
                    onClick={() => toNextPage(plan.name, plan.id)}
                  >
                    立即訂閱
                    <span className="material-symbols-outlined icon-fill fs-6 fs-md-5 ms-1">
                      arrow_forward
                    </span>
                  </button>
                )}

                {plan.name === "premium" && (
                  <span className="recommend-badge badge bg-brand-01 f-align-center position-absolute">
                    <span className="material-symbols-outlined icon-fill text-white fs-5 fs-lg-6">
                      thumb_up
                    </span>
                    <h5 className="text-white fs-5 fs-lg-6 ms-2">推薦</h5>
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
SubscriptionCard.propTypes = {
  duration: PropTypes.oneOf(["price_monthly", "price_annually"]).isRequired,
  setLoadingState: PropTypes.func.isRequired,
};
