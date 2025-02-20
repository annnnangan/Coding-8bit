import { useState, useEffect } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import courseApi from "../../../api/courseApi";
import CourseCardList from "../../../components/course/CourseCardList";
import Pagination from "../../../components/layout/Pagination";
import Loader from "../../../components/common/Loader";

export default function CourseListPage() {
  // loading
  const [loadingState, setLoadingState] = useState(true);

  // 依路由決定此頁顯示分類
  const [searchParams] = useSearchParams();
  const video_type = searchParams.get("video_type");

  // 取得課程資料函式
  const [courseList, setCourseList] = useState([]);
  const [page, setPage] = useState(1);
  const getCoursesData = async (dataPage = 1) => {
    setLoadingState(true);
    if (video_type !== "topicSeries") {
      try {
        const result = await courseApi.getAllVideos(video_type, page);
        setCourseList(result);
      } catch (error) {
        console.log("錯誤", error);
      } finally {
        setLoadingState(false);
      }
    } else {
      try {
        const result = await courseApi.getAllCourses(dataPage, sortBy, order);
        setPage(dataPage)
        setCourseList(result.courses);
      } catch (error) {
        console.log("錯誤", error);
      } finally {
        setLoadingState(false);
      }
    }
  };

  // 搜尋功能
  const [ascending] = useState(false);
  const [search, setSearch] = useState("GPT");
  const [sortBy, setSortBy] = useState("rating");
  const [order, setOrder] = useState("DESC");

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setSearch(e.target.value);
    }
  };

  // const filterCourseList = useMemo(() => {
  //   return [...courseList] // 需要淺拷貝，不然會影響到原陣列
  //     .filter((course) => course.title.includes(search)) // 找出符合 search 的值 (只過濾符合 search 的內容)
  //     .sort((a, b) => {
  //       // 最熱門排序
  //       if (sort === "view_count") {
  //         return ascending
  //           ? parseInt(a.view_count) - parseInt(b.view_count)
  //           : parseInt(b.view_count) - parseInt(a.view_count);
  //       }
  //       // 評價排序
  //       if (sort === "rating") {
  //         return ascending
  //           ? parseFloat(a.rating) - parseFloat(b.rating)
  //           : parseFloat(b.rating) - parseFloat(a.rating);
  //       } else {
  //         return ascending ? a.sort - b.sort : b.sort - a.sort;
  //       }
  //     });
  // }, [courseList, ascending, search, sort]);

  // title 判斷
  let pageTitle = "Coding∞bit ｜ ";
  if (video_type === "topicSeries") {
    pageTitle += "主題式系列課程影片一覽";
  } else if (video_type === "customLearning") {
    pageTitle += "客製化學習需求影片一覽";
  } else if (video_type === "freeTipShorts") {
    pageTitle += "實用技術短影片一覽";
  } else {
    pageTitle += "課程影片一覽";
  }

  // 初始化取得資料
  useEffect(() => {
    getCoursesData();
  }, [sortBy]);

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      {loadingState && <Loader />}

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
                {video_type === "topicSeries" && "主題式系列課程影片一覽"}
                {video_type === "customLearning" && "客製化學習需求影片一覽"}
                {video_type === "freeTipShorts" && "實用技術短影片一覽"}
              </li>
            </ol>
          </nav>
          <h1 className="text-brand-03 fs-3 fs-lg-1 mt-8">
            {video_type === "topicSeries" && "主題式系列課程影片一覽"}
            {video_type === "customLearning" && "客製化學習需求影片一覽"}
            {video_type === "freeTipShorts" && "實用技術短影片一覽"}
          </h1>
          <p className="fs-6 fs-lg-5 mt-3">
            {video_type === "topicSeries" &&
              "專業講師自編，單一主題的系列課程影片"}
            {video_type === "customLearning" &&
              "由講師專為解決學生需求而錄製，為成果導向的教學影片"}
            {video_type === "freeTipShorts" &&
              "由專業講師錄製，一支影片會進行一個小技術的教學"}
          </p>
          <div className="category-list f-center mt-10 mt-lg-13">
            <span
              className="material-symbols-outlined bg-brand-02 text-brand-01 p-2 rounded-circle me-2 mb-4 arrow"
              role="button"
            >
              chevron_left
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
              chevron_right
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
                onKeyPress={handleSearch}
              />
              <span
                className="material-symbols-outlined text-gray-03 position-absolute ps-4"
                style={{ width: "20px", height: "20px" }}
              >
                search
              </span>
            </div>

            <div className="sort">
              <button
                type="button"
                className="btn btn-outline-brand-03 dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {sortBy === "view_count" && "排序方式(最熱門)"}
                {sortBy === "rating" && "排序方式(最高評價)"}
              </button>

              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => setSortBy("view_count")}
                  >
                    最熱門
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => setSortBy("rating")}
                  >
                    最高評價
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="dropdown-item"
                  >
                    依時間(最新到最舊)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => setSortBy()}
                  >
                    依時間(最舊到最新)
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="row topicSeriesCourse-card-wrap mt-6 mt-lg-8 g-5">
            {video_type === "topicSeries" ? (
              <CourseCardList courseList={courseList} />
            ) : (
              <CourseCardList courseList={courseList} type="singleVideo" />
            )}
          </div>
          <nav className="mt-6 mt-lg-8" aria-label="navigation">
            <Pagination
              page={page}
              setPage={setPage}
              getData={getCoursesData}
            />
          </nav>
        </div>
      </main>
    </>
  );
}
