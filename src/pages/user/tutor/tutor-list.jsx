import { useState, useEffect, useRef } from "react";
import axios from "axios";
import AOS from "aos";
import MainTitle from "../../../components/MainTitle";
import TutorsCard from "../../../components/tutor/TutorsCard";

const { VITE_API_BASE_2 } = import.meta.env;

export default function TutorList() {
  const [tutorsList, setTutorsList] = useState([]);

  // 找講師按鈕往下跳轉函式
  const tutorListRef = useRef(null);
  const handleScroll = (e) => {
    e.preventDefault;
    if (tutorListRef.current) {
      tutorListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // 取得資料函式
  const getTutorsData = async () => {
    try {
      const tutorResult = await axios.get(`${VITE_API_BASE_2}/api/v1/tutors`);
      setTutorsList(tutorResult.data);
    } catch (error) {
      console.log("錯誤", error);
    }
  };

  // title 打字機效果
  const [titleText, setTitleText] = useState("程式卡關？");
  const [, setCalc] = useState(1);
  useEffect(() => {
    const interval = setInterval(() => {
      setCalc((prevCalc) => {
        const newCalc = prevCalc + 1;
        setTitleText(newCalc % 2 === 1 ? "程式卡關？" : "程式冗長？");
        return newCalc;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // 初始化 - AOS
  useEffect(() => {
    AOS.init();
  }, []);

  // 初始化 - 取得資料
  useEffect(() => {
    getTutorsData();
  }, []);

  return (
    <>
      <main className="tutor-list">
        {/* hero-section */}
        <section className="hero-section">
          <div className="container">
            <div className="d-flex justify-content-md-around align-items-md-center">
              <div>
                <div className="question-text-wrapper">
                  <h2 className="fs-1 mb-2 question-text text-brand-03">
                    {titleText}
                  </h2>
                </div>
                <h2 className="fs-md-1 fs-2 mb-12">找專業講師來場一對一課程</h2>
                <a
                  className="w-50 btn btn-brand-03 cta-btn f-center slide-down-hover mb-5"
                  onClick={handleScroll}
                >
                  我要找講師
                  <span className="material-symbols-outlined">
                    keyboard_arrow_down
                  </span>
                </a>
                <div className="d-flex align-items-center">
                  <img
                    src="images/user/user-1.png"
                    alt="tutor"
                    className="object-cover-fit profile"
                  />
                  <img
                    src="images/user/user-5.png"
                    alt="tutor"
                    className="object-cover-fit profile"
                  />
                  <img
                    src="images/user/user-6.png"
                    alt="tutor"
                    className="object-cover-fit profile"
                  />
                  <img
                    src="images/user/user-7.png"
                    alt="tutor"
                    className="object-cover-fit profile"
                  />
                  <img
                    src="images/user/user-10.png"
                    alt="tutor"
                    className="object-cover-fit profile"
                  />
                  <img
                    src="images/user/user-8.png"
                    alt="tutor"
                    className="object-cover-fit profile"
                  />
                  <img
                    src="images/user/user-9.png"
                    alt="tutor"
                    className="object-cover-fit profile"
                  />
                  <p className="profile">100+</p>
                </div>
              </div>
              <img
                src="images/deco/star3D.png"
                className="star-deco"
                alt="star-deco"
              />
            </div>
          </div>
        </section>

        {/* service introduction */}
        <section className="service-intro" style={{ overflow: "hidden" }}>
          <div className="container">
            {/* title */}
            <div className="f-center flex-column">
              <MainTitle
                longTitle={false}
                beforeTitle="什麼是一對一教學 & 程式碼檢視服務"
                afterTitle=""
              />
              <p className="mt-5 mb-11 description fs-md-5 fs-6">
                只要您訂閱成為基本會員，即可購買專業講師一對一課程或是程式碼檢視服務。
              </p>
            </div>
            <div className="row justify-content-around">
              <div className="col-lg-6 col-md-8">
                {/* description */}
                <div>
                  <div
                    className="mb-8 f-center"
                    data-aos="fade-right"
                    data-aos-easing="linear"
                    data-aos-duration="800"
                    data-aos-offset="200"
                  >
                    <p className="tag bg-brand-03 text-white fs-md-5 fs-7 text-nowrap me-3">
                      一對一課程
                    </p>
                    <span className="material-symbols-outlined me-3">
                      {" "}
                      chevron_right{" "}
                    </span>
                    <p className="fs-md-5 fs-7">
                      不怕問題被淹沒在人海之中，只要預約，就可以在線上接受指定講師的單獨教學。
                    </p>
                  </div>
                  <div
                    className="mb-8 f-center"
                    data-aos="fade-right"
                    data-aos-easing="linear"
                    data-aos-duration="800"
                    data-aos-delay="300"
                    data-aos-offset="200"
                  >
                    <p className="tag bg-brand-03 text-white fs-md-5 fs-7 text-nowrap me-3">
                      程式碼檢視
                    </p>
                    <span className="material-symbols-outlined me-3">
                      {" "}
                      chevron_right{" "}
                    </span>
                    <p className="fs-md-5 fs-7">
                      預約時提交想接受指導的程式碼，講師將會於預約時間回覆指導，再也不怕code沒有人批改。
                    </p>
                  </div>
                </div>

                <a
                  href="subscription-info-normal.html"
                  className="underline-hover text-brand-03 cta fs-md-5 fs-6"
                  data-aos="fade-right"
                  data-aos-easing="linear"
                  data-aos-duration="1000"
                  data-aos-delay="800"
                >
                  還沒有訂閱嗎？點我前往訂閱
                </a>
              </div>
              {/* image */}
              <div className="col-4">
                <img
                  src="images/deco/Illustration-9.png"
                  alt="illustration"
                  className="deco-img"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Category */}
        <section className="category bg-gray-04 wrap">
          <div className="container">
            <MainTitle
              longTitle={false}
              beforeTitle="不知道要選哪位講師？先從分類開始選起"
              afterTitle=""
            />
            <div className="category-list">
              <span
                className="material-symbols-outlined bg-brand-02 text-brand-01 p-2 rounded-circle me-2 mb-4 arrow"
                role="button"
              >
                {" "}
                chevron_left{" "}
              </span>
              <a
                href="#"
                className="btn btn-brand-03 me-2 mb-4 border border-3 border-brand-03"
              >
                全部
              </a>
              <a href="#" className="btn btn-outline-brand-03 me-2 mb-4">
                HTML & CSS
              </a>
              <a href="#" className="btn btn-outline-brand-03 me-2 mb-4">
                JavaScript
              </a>
              <a href="#" className="btn btn-outline-brand-03 me-2 mb-4">
                WordPress
              </a>
              <a href="#" className="btn btn-outline-brand-03 me-2 mb-4">
                Python
              </a>
              <a href="#" className="btn btn-outline-brand-03 me-2 mb-4">
                Vue
              </a>
              <a href="#" className="btn btn-outline-brand-03 me-2 mb-4">
                React
              </a>
              <a href="#" className="btn btn-outline-brand-03 me-2 mb-4">
                C++
              </a>
              <a href="#" className="btn btn-outline-brand-03 me-2 mb-4">
                Bootstrap
              </a>
              <span
                className="material-symbols-outlined p-2 rounded-circle bg-brand-02 text-brand-01 mb-4 arrow"
                role="button"
              >
                {" "}
                chevron_right{" "}
              </span>
            </div>
          </div>
        </section>

        {/* Tutor Cards */}
        <section ref={tutorListRef} className="wrap">
          <div className="container">
            <MainTitle
              longTitle={false}
              beforeTitle="尋找喜歡的講師"
              afterTitle=""
            />
            <div className="mt-8">
              <div className="control-group">
                <div className="position-relative f-align-center d-flex me-2 search-tutor">
                  <input
                    type="search"
                    className="form-control nav-search-desktop border border-brand-03 border-3"
                    placeholder="搜尋講師"
                  />
                  <span
                    className="material-symbols-outlined text-gray-03 position-absolute ps-4"
                    style={{ width: "20px", height: "20px" }}
                  >
                    {" "}
                    search{" "}
                  </span>
                </div>

                <div className="sort">
                  <button
                    type="button"
                    className="btn btn-outline-brand-03 dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    排序方式
                  </button>

                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <a className="dropdown-item" href="#">
                        最熱門
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        最高評價
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        依時間(最舊到最新)
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        依時間(最新到最舊)
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="my-8">
              <TutorsCard tutorList={tutorsList} cardsNum={3} />
            </div>

            <nav aria-label="navigation">
              <ul className="pagination f-center">
                <li className="page-item disabled">
                  <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">
                      <span className="material-symbols-outlined align-middle">
                        {" "}
                        arrow_left
                      </span>
                    </span>
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link active" href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">
                      <span className="material-symbols-outlined align-middle">
                        {" "}
                        arrow_right
                      </span>
                    </span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </section>
      </main>
    </>
  );
}
