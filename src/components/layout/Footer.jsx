export default function Footer() {
  return (
    <footer className="layout-footer-wrap wrap-lg bg-white">
      <div className="container f-xl-between">
        <div className="footer-info-wrap flex-grow-1">
          <a href="index.html" className="navbar-brand">
            <picture>
              <source
                srcSet="src/assets/images/logo-sm.svg"
                media="(max-width: 575.98px)"
              />
              <img src="src/assets/images/logo.svg" alt="logo-image" />
            </picture>
          </a>
          <ul className="mt-4">
            <li className="f-align-center">
              <span className="material-symbols-outlined fs-6">call</span>
              <a
                href="tel:+0212345678"
                className="fs-7 underline-hover lh-sm ms-2"
              >
                (02) 1234-5678
              </a>
            </li>
            <li className="f-align-center mt-2">
              <span className="material-symbols-outlined fs-6">schedule</span>
              <p className="fs-7 lh-sm ms-2">MON - FRI : 8:30 am - 17:30 pm</p>
            </li>
            <li className="f-align-center mt-2">
              <p className="fs-7 lh-sm">本網站僅供作品參考，並非真實營運販售</p>
            </li>
          </ul>
        </div>
        <div className="d-flex flex-grow-1 mt-8 mt-lg-0">
          <ul className="navbar-nav f-column w-50 px-4">
            <li className="nav-item">
              <a
                className="nav-link underline-hover d-inline-flex link-gray-02 fs-7"
                aria-current="page"
                href="course-list.html"
              >
                精選課程
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link underline-hover d-inline-flex link-gray-02 fs-7"
                href="tutor-list.html"
              >
                一對一教學
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link underline-hover d-inline-flex link-gray-02 fs-7"
                href="custom-course.html"
              >
                課程客製化
              </a>
            </li>
          </ul>
          <ul className="navbar-nav f-column w-50 px-4">
            <li className="nav-item">
              <a
                className="nav-link underline-hover d-inline-flex link-gray-02 fs-7"
                aria-current="page"
                href="help-center.html"
              >
                幫助中心
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link underline-hover d-inline-flex link-gray-02 fs-7"
                href="subscription.html"
              >
                訂閱方案選擇
              </a>
            </li>
          </ul>
        </div>
        <ul className="d-flex justify-content-lg-end flex-grow-1 mt-8 mt-lg-0 ms-lg-6">
          <li>
            <a href="#" className="icon-hover">
              <img
                src="src/assets/images/icon/icon-ins-purple.svg"
                alt="icon-ins"
              />
            </a>
          </li>
          <li className="ms-3">
            <a href="#" className="icon-hover">
              <img
                src="src/assets/images/icon/icon-facebook-purple.svg"
                alt="icon-ins"
              />
            </a>
          </li>
          <li className="ms-3">
            <a href="#" className="icon-hover">
              <img
                src="src/assets/images/icon/icon-mail-purple.svg"
                alt="icon-ins"
              />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
