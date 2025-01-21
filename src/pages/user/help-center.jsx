import MainTitle from "../../components/MainTitle";

export default function HelpCenter() {
  return (
    <div className="wrap">
      <header className="help-center-banner-section">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html" className="underline-hover">
                  首頁
                </a>
              </li>
              <li
                className="breadcrumb-item active fw-semibold"
                aria-current="page"
              >
                幫助中心
              </li>
            </ol>
          </nav>
          <h1 className="text-brand-03 mt-4 mt-lg-8">幫助中心</h1>
        </div>
      </header>
      <section className="help-center-FAQ-section">
        <div className="container">
          <div className="row f-center">
            <div className="col">
              <div className="bg-white rounded shadow py-8 px-4 p-md-13">
                <MainTitle
                  longTitle={false}
                  beforeTitle="常見問題"
                  afterTitle=""
                />
                <div className="accordion mt-10" id="FAQ-accordion">
                  <div className="accordion-item">
                    <h3
                      className="accordion-header"
                      id="panelsStayOpen-headingOne"
                    >
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseOne"
                        aria-expanded="true"
                        aria-controls="panelsStayOpen-collapseOne"
                      >
                        如何預約一對一的課程？
                      </button>
                    </h3>
                    <div
                      id="panelsStayOpen-collapseOne"
                      className="accordion-collapse collapse"
                      aria-labelledby="panelsStayOpen-headingOne"
                    >
                      <div className="accordion-body">
                        <p>
                          付費訂閱後前往講師預約頁面，選擇講師及可預約時段，完成付款手續即可。
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h3
                      className="accordion-header"
                      id="panelsStayOpen-headingTwo"
                    >
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseTwo"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseTwo"
                      >
                        是否可以選擇我喜歡的講師？
                      </button>
                    </h3>
                    <div
                      id="panelsStayOpen-collapseTwo"
                      className="accordion-collapse collapse"
                      aria-labelledby="panelsStayOpen-headingTwo"
                    >
                      <div className="accordion-body">
                        <p>
                          可以，使用者可根據自己的需求選擇講師，並預約他們的空閒時間。
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h3
                      className="accordion-header"
                      id="panelsStayOpen-headingThree"
                    >
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseThree"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseThree"
                      >
                        課程是否支援離線觀看？
                      </button>
                    </h3>
                    <div
                      id="panelsStayOpen-collapseThree"
                      className="accordion-collapse collapse"
                      aria-labelledby="panelsStayOpen-headingThree"
                    >
                      <div className="accordion-body">
                        <p>
                          目前課程僅提供線上觀看服務，但我們正在規劃離線下載的功能，敬請期待。
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h3
                      className="accordion-header"
                      id="panelsStayOpen-headingFour"
                    >
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseFour"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseFour"
                      >
                        觀看課程要付費嗎？
                      </button>
                    </h3>
                    <div
                      id="panelsStayOpen-collapseFour"
                      className="accordion-collapse collapse"
                      aria-labelledby="panelsStayOpen-headingFour"
                    >
                      <div className="accordion-body">
                        <p>
                          註冊免費會員可以觀看免費影片，訂閱基本會員或高級會員則可以不限次數、不限時間，觀看所有類型的課程影片。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="help-center-contact-section mt-10">
        <div className="container">
          <div className="row f-center">
            <div className="col">
              <div className="bg-white rounded shadow py-8 px-4 p-md-13">
                <MainTitle
                  longTitle={false}
                  beforeTitle="聯絡我們"
                  afterTitle=""
                />
                <div className="row mt-6 mt-lg-12">
                  <div className="col-lg-6">
                    <ul>
                      <li className="f-align-center mt-4">
                        <div className="flex-shrink-0 f-align-center">
                          <span className="material-symbols-outlined text-brand-01 fs-2">
                            call
                          </span>
                        </div>
                        <div className="flex-grow-1 ms-4">
                          <p className="fw-semibold">電話</p>
                          <small>
                            <a
                              href="tel:+021234-5678"
                              className="underline-hover d-inline-block"
                            >
                              (02) 1234-5678
                            </a>
                          </small>
                        </div>
                      </li>
                      <li className="f-align-center mt-4">
                        <div className="flex-shrink-0 f-align-center">
                          <span className="material-symbols-outlined text-brand-01 fs-2">
                            mail
                          </span>
                        </div>
                        <div className="flex-grow-1 ms-4">
                          <p className="fw-semibold">信箱</p>
                          <small>
                            <a
                              href="mailto:custommadesite@gmail.com"
                              className="underline-hover d-inline-block"
                            >
                              custommadesite@gmail.com
                            </a>
                          </small>
                        </div>
                      </li>
                      <li className="f-align-center mt-4">
                        <div className="flex-shrink-0 f-align-center">
                          <span className="material-symbols-outlined text-brand-01 fs-2">
                            pin_drop
                          </span>
                        </div>
                        <div className="flex-grow-1 ms-4">
                          <p className="fw-semibold">地址</p>
                          <small>100台北市中正區重慶南路一段102號</small>
                        </div>
                      </li>
                    </ul>
                    <hr />
                    <h4 className="fw-medium fs-6 fs-lg-4 mt-6">Follow us</h4>
                    <ul className="d-flex mt-4">
                      <li>
                        <a href="#" className="icon-hover">
                          <img
                            src="images/icon/icon-ins-purple.svg"
                            alt="icon-ins"
                          />
                        </a>
                      </li>
                      <li className="ms-3">
                        <a href="#" className="icon-hover">
                          <img
                            src="images/icon/icon-facebook-purple.svg"
                            alt="icon-ins"
                          />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-6 mt-10 mt-lg-0">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d903.6875711010141!2d121.51242426953871!3d25.042547213645992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a90b40d1885d%3A0xaa64cab47db4b886!2zMTAw5Y-w5YyX5biC5Lit5q2j5Y2A6YeN5oW25Y2X6Lev5LiA5q61MTAy6Jmf!5e0!3m2!1szh-TW!2stw!4v1728110805181!5m2!1szh-TW!2stw"
                      width="100%"
                      height="400"
                      style={{ border: "0" }}
                      allowFullScreen=""
                      loading="lazy"
                    ></iframe>
                  </div>
                </div>
                <form className="row g-3 bg-brand-05 p-3 px-sm-6 py-sm-8 mt-8">
                  <div className="col-md-6">
                    <label htmlFor="name" className="form-label">
                      姓名
                    </label>
                    <input type="text" className="form-control" id="name" />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="phone" className="form-label">
                      電話
                    </label>
                    <input type="tel" className="form-control" id="phone" />
                  </div>
                  <div className="col-12">
                    <label htmlFor="Email" className="form-label">
                      Email
                    </label>
                    <input type="email" className="form-control" id="Email" />
                  </div>
                  <div className="col-12">
                    <label htmlFor="message" className="form-label">
                      聯繫內容
                    </label>
                    <textarea
                      className="form-control"
                      id="message"
                      rows="5"
                    ></textarea>
                  </div>
                  <div className="col-12 text-end">
                    <button className="btn btn-brand-03 rounded-1 slide-right-hover mt-4">
                      送出表單
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
