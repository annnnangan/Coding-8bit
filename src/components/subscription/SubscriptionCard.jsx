import PropTypes from 'prop-types';

export default function SubscriptionCard({ duration }) {
  SubscriptionCard.propTypes = {
    duration: PropTypes.oneOf(['month', 'year']).isRequired,
  };

  return (
    <>
      <div className="col-lg-4">
        <div className="subscription-card card shadow">
          <div>
            <span className="badge bg-gray-04 rounded-2">
              <h4 className="card-badge-text">免費會員</h4>
            </span>
          </div>
          <div className="mt-4 mt-lg-6 pb-4 pb-lg-6 border-bottom">
            <h4 className="fs-5 fs-lg-4 fw-medium fw-lg-bold f-align-center">
              NT$
              <span className="fs-2 fs-lg-1 fw-bold ms-2">0</span>
              <span className="fs-5 fs-lg-4 fw-normal ms-2">
                {duration === "month" ? " / 月" : " / 年"}
              </span>
            </h4>
          </div>
          <div className="card-body p-0 mt-4 mt-lg-6 f-column-between">
            <ul>
              <li className="f-align-center">
                <span className="material-symbols-outlined icon-fill text-brand-03">
                  check_circle
                </span>
                <p className="fw-medium lh-sm ms-4">
                  只需註冊帳號，即可享有服務
                </p>
              </li>
              <li className="f-align-center mt-4 mt-lg-4">
                <span className="material-symbols-outlined icon-fill text-brand-03">
                  check_circle
                </span>
                <p className="fw-medium lh-sm ms-4">可觀看免費影片</p>
              </li>
              <li className="f-align-center mt-4 mt-lg-4">
                <span className="material-symbols-outlined icon-fill text-brand-03">
                  check_circle
                </span>
                <p className="fw-medium lh-sm ms-4">
                  可參與影片討論區，與其他使用者交流
                </p>
              </li>
            </ul>
            <button className="btn btn-brand-03 slide-right-hover f-center w-100 mt-6 mt-lg-10">
              立即註冊
              <span className="material-symbols-outlined icon-fill fs-6 fs-md-5 ms-1">
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="subscription-card card shadow">
          <div>
            <span className="badge bg-gray-04 rounded-2">
              <h4 className="card-badge-text">基本會員</h4>
            </span>
          </div>
          <div className="mt-4 mt-lg-6 pb-4 pb-lg-6 border-bottom">
            <h4 className="fs-5 fs-lg-4 fw-medium fw-lg-bold f-align-center">
              NT$
              <span className="fs-2 fs-lg-1 fw-bold ms-2">
                {duration === "month" ? "299" : "2,399"}
              </span>
              <span className="fs-5 fs-lg-4 fw-normal ms-2">
                {duration === "month" ? " / 月" : " / 年"}
              </span>
            </h4>
          </div>
          <div className="card-body p-0 mt-4 mt-lg-6 f-column-between">
            <ul>
              <li className="f-align-center">
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
            </ul>
            <a href="subscription-info-normal.html">
              <button className="btn btn-brand-03 slide-right-hover f-center w-100 mt-6 mt-lg-10">
                立即訂閱
                <span className="material-symbols-outlined icon-fill fs-6 fs-md-5 ms-1">
                  arrow_forward
                </span>
              </button>
            </a>
          </div>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="subscription-card card border-4 border-brand-01 shadow position-relative">
          <div>
            <span className="badge bg-gray-04 rounded-2">
              <h4 className="card-badge-text">高級會員</h4>
            </span>
          </div>
          <div className="mt-4 mt-lg-6 pb-4 pb-lg-6 border-bottom">
            <h4 className="fs-5 fs-lg-4 fw-medium fw-lg-bold f-align-center">
              NT$
              <span className="fs-2 fs-lg-1 fw-bold ms-2">
                {duration === "month" ? "499" : "5,799"}
              </span>
              <span className="fs-5 fs-lg-4 fw-normal ms-2">
                {duration === "month" ? " / 月" : " / 年"}
              </span>
            </h4>
          </div>
          <div className="card-body p-0 mt-4 mt-lg-6 f-column-between">
            <ul>
              <li className="f-align-center">
                <span className="material-symbols-outlined icon-fill text-brand-03">
                  check_circle
                </span>
                <p className="fw-medium lh-sm ms-4">
                  包含基本會員擁有的所有服務
                </p>
              </li>
              <li className="f-align-center mt-4 mt-lg-4">
                <span className="material-symbols-outlined icon-fill text-brand-03">
                  check_circle
                </span>
                <p className="fw-medium lh-sm ms-4">可發佈學習客製化需求</p>
              </li>
            </ul>
            <a href="subscription-info-premium.html">
              <button className="btn btn-brand-03 slide-right-hover f-center w-100 mt-6 mt-lg-10">
                立即訂閱
                <span className="material-symbols-outlined icon-fill fs-6 fs-md-5 ms-1">
                  arrow_forward
                </span>
              </button>
            </a>
            <span className="recommend-badge badge bg-brand-01 f-align-center position-absolute">
              <span className="material-symbols-outlined icon-fill text-white fs-5 fs-lg-6">
                thumb_up
              </span>
              <h5 className="text-white fs-5 fs-lg-6 ms-2">推薦</h5>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
