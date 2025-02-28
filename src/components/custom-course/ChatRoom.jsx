export default function ChatRoom() {
  return (
    <div
      className="chat-room offcanvas offcanvas-end"
      tabIndex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <h4 id="offcanvasRightLabel" className="room-title">
          建立需求小幫手
        </h4>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body position-relative px-4 px-lg-8">
        <div className="d-flex align-items-center pe-8">
          <div className="flex-shrink-0 align-self-start">
            <img
              src="images/deco/robot-avatar.svg"
              alt="user-image"
              className="user-page-header-img rounded-circle"
            />
          </div>
          <ul className="flex-grow-1 ms-4 ms-lg-6">
            <li className="bg-white rounded-5 py-3 px-5">
              <p className="fs-7 fs-lg-6">
                哈囉～我是建立需求小幫手，接下來，我將協助您建立學習需求呦
              </p>
            </li>
            <li className="bg-white rounded-5 py-3 px-5 mt-3 mt-lg-4">
              <p className="fs-7 fs-lg-6">
                想先請問您一個問題～您目前是使用什麼程式語言呢？
              </p>
            </li>
          </ul>
        </div>

        <div className="f-end-center">
          <div className="bg-brand-02 rounded-5 py-3 px-5 mt-6 mt-lg-8">
            <p className="fs-7 fs-lg-6">CSS</p>
          </div>
        </div>

        <div className="d-flex align-items-center pe-8 mt-6 mt-lg-8">
          <div className="flex-shrink-0 align-self-start">
            <img
              src="images/deco/robot-avatar.svg"
              alt="user-image"
              className="user-page-header-img rounded-circle"
            />
          </div>
          <ul className="flex-grow-1 ms-4 ms-lg-6">
            <li className="bg-white rounded-5 py-3 px-5">
              <p className="fs-7 fs-lg-6">
                原來如此，謝謝您的回答～請問您目前的學習階段大概位於哪個等級呢？（請幫小幫手選一個選項呦）
              </p>
            </li>
          </ul>
        </div>

        <div className="f-end-center">
          <div className="bg-brand-02 rounded-5 py-3 px-5 mt-6 mt-lg-8">
            <p className="fs-7 fs-lg-6">Lv.1 什麼都不會的小萌新</p>
          </div>
        </div>

        <div className="d-flex align-items-center pe-8 mt-6 mt-lg-8">
          <div className="flex-shrink-0 align-self-start">
            <img
              src="images/deco/robot-avatar.svg"
              alt="user-image"
              className="user-page-header-img rounded-circle"
            />
          </div>
          <ul className="flex-grow-1 ms-4 ms-lg-6">
            <li className="bg-white rounded-5 py-3 px-5">
              <p className="fs-7 fs-lg-6">
                看來是可愛的小新手呢，不錯不錯，勤奮學習很棒哦！再來請幫我選擇下一個問題呦！您是想獲得新知識，還是遇到小問題卡關了呢～？
              </p>
            </li>
          </ul>
        </div>

        <div className="f-end-center">
          <div className="bg-brand-02 rounded-5 py-3 px-5 mt-6 mt-lg-8">
            <p className="fs-7 fs-lg-6">遇到小問題卡關</p>
          </div>
        </div>

        <div className="d-flex align-items-center pe-8 mt-6 mt-lg-8">
          <div className="flex-shrink-0 align-self-start">
            <img
              src="images/deco/robot-avatar.svg"
              alt="user-image"
              className="user-page-header-img rounded-circle"
            />
          </div>
          <ul className="flex-grow-1 ms-4 ms-lg-6">
            <li className="bg-white rounded-5 py-3 px-5">
              <p className="fs-7 fs-lg-6">
                {`嘿嘿，謝謝您的回答 > w < 那再來請幫小幫手簡單說明一下～您想要學習什麼小知識呢？`}
              </p>
            </li>
          </ul>
        </div>
      </div>

      {/* 回答輸入框 */}
      <div className="offcanvas-footer bg-white shadow position-absolute bottom-0 f-align-center px-3 px-lg-8 py-4 py-lg-6 w-100 ">
        <input type="text" className="form-control" id="response" />
        <button
          type="button"
          className="btn btn-brand-03 lh-lg py-2 ms-2 ms-md-6"
        >
          發送
        </button>
      </div>

      {/* 回答選項框 */}
      <div className="offcanvas-footer bg-white shadow position-absolute bottom-0 px-3 px-lg-8 py-4 py-lg-6 w-100 d-none">
        <button
          type="button"
          className="btn btn-outline-gray-03 text-gray-01 w-100"
        >
          想獲得新知識
        </button>
        <button
          type="button"
          className="btn btn-outline-gray-03 text-gray-01 w-100 mt-4"
        >
          遇到小問題卡關了
        </button>
      </div>
    </div>
  );
}
