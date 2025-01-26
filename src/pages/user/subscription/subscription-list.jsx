import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import SubscriptionCard from "../../../components/subscription/SubscriptionCard";

export default function SubscriptionList() {
  return (
    <>
      <Helmet>
        <title>Coding∞bit ｜ 訂閱方案一覽</title>
      </Helmet>
      <main className="subscription-section">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <NavLink to="/" className="underline-hover">
                  首頁
                </NavLink>
              </li>
              <li
                className="breadcrumb-item active fw-semibold"
                aria-current="page"
              >
                訂閱方案
              </li>
            </ol>
          </nav>
          <h1 className="text-brand-03 mt-8">訂閱方案一覽</h1>
          <p className="fs-5 mt-3">立即升級會員，享有更多服務</p>
          <ul
            className="nav nav-tabs border-bottom border-gray-03 mt-8 mt-lg-12"
            id="subscriptionTab"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="monthly-tab"
                data-bs-toggle="tab"
                data-bs-target="#monthly"
                type="button"
                role="tab"
                aria-controls="monthly"
                aria-selected="true"
              >
                月繳
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="annually-tab"
                data-bs-toggle="tab"
                data-bs-target="#annually"
                type="button"
                role="tab"
                aria-controls="annually"
                aria-selected="false"
              >
                年繳
              </button>
            </li>
          </ul>
          <div className="row mt-6 mt-lg-12">
            <div className="col">
              <div className="tab-content" id="subscriptionTabContent">
                <div
                  className="tab-pane fade show active"
                  id="monthly"
                  role="tabpanel"
                  aria-labelledby="monthly-tab"
                >
                  <div className="row">
                    <SubscriptionCard duration="monthly" />
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="annually"
                  role="tabpanel"
                  aria-labelledby="annually-tab"
                >
                  <div className="row">
                    <SubscriptionCard duration="annually" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
