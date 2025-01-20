import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import CourseCard from "../../../components/course/CourseCard";

const { VITE_API_BASE } = import.meta.env;

export default function CourseListPage() {
  const [courseList, setCourseList] = useState([]);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  // 取得課程資料函式
  const getCoursesData = async () => {
    try {
      const result = await axios.get(
        `${VITE_API_BASE}/api/v1/courses?category=${category}`
      );
      setCourseList(result.data);
    } catch (error) {
      console.log("錯誤", error);
    }
  };

  // 初始化取得資料
  useEffect(() => {
    getCoursesData();
  }, []);

  return (
    <>
      <header className="topicSeries-header-section bg-brand-05 wrap">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <NavLink to="/" className="underline-hover">
                  首頁
                </NavLink>
              </li>
              <li className="breadcrumb-item">
                <NavLink to="/course-list" className="underline-hover">
                  課程一覽
                </NavLink>
              </li>
              <li
                className="breadcrumb-item active fw-semibold"
                aria-current="page"
              >
                {category === "topicSeries" && "主題式系列課程影片一覽"}
                {category === "customLearning" && "客製化學習需求影片一覽"}
                {category === "freeTipShorts" && "實用技術短影片一覽"}
              </li>
            </ol>
          </nav>
          <h1 className="text-brand-03 fs-3 fs-lg-1 mt-8">
            {category === "topicSeries" && "主題式系列課程影片一覽"}
            {category === "customLearning" && "客製化學習需求影片一覽"}
            {category === "freeTipShorts" && "實用技術短影片一覽"}
          </h1>
          <p className="fs-6 fs-lg-5 mt-3">
            {category === "topicSeries" &&
              "專業講師自編，單一主題的系列課程影片"}
            {category === "customLearning" &&
              "由講師專為解決學生需求而錄製，為成果導向的教學影片"}
            {category === "freeTipShorts" &&
              "由專業講師錄製，一支影片會進行一個小技術的教學"}
          </p>
          <div className="category-list f-center mt-10 mt-lg-13">
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
      </header>
      <main className="topicSeries-course-section wrap">
        <div className="container">
          <div className="control-group f-end-center">
            <div className="position-relative f-align-center d-flex me-2 search-tutor">
              <input
                type="search"
                className="form-control nav-search-desktop border border-brand-03 border-3"
                placeholder="搜尋課程"
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
          <div className="row topicSeriesCourse-card-wrap mt-6 mt-lg-8 g-5">
            <CourseCard courseList={courseList} />
          </div>
          <nav className="mt-6 mt-lg-8" aria-label="navigation">
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
      </main>
    </>
  );
}
