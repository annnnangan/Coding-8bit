import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";

import Swal from "sweetalert2";

import Loader from "@/components/common/Loader";
import Pagination from "@/components/layout/Pagination";

export default function TutorManageCustomCourses() {
  // loading
  const [loadingState, setLoadingState] = useState(true);

  // auth
  const { isAuth } = useSelector((state) => state.auth);

  // 初始化 - 取得資料
  useEffect(() => {
    if (isAuth) {
      getData();
    }
  }, [isAuth]);

  return (
    <>
      <Helmet>
        <title>Coding∞bit ｜ 客製化學習需求管理</title>
      </Helmet>
      {loadingState && <Loader />}

      <main className="tutor-manage-custom-course-list-wrap container-fluid">
        <div className="f-between">
          <div className="title">
            <h1 className="fs-4 fs-lg-2">
              客製化學習需求管理 - 已回覆的學習需求
            </h1>
          </div>
        </div>

        {/* 需求列表 */}
        <div className="table-wrap mt-6 mt-lg-8">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>
                  {item.category === "topicSeries" ? "課程名稱" : "影片名稱"}
                </th>
                <th>類別</th>
                <th>瀏覽權限</th>
                <th>上傳日期</th>
                <th>觀看數</th>
                <th>評價</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr className="align-middle">
                <td>
                  <div className="cover_image-wrap position-relative">
                    <img
                      src={course.cover_image}
                      alt="course-image"
                      className="w-100"
                    />
                    <span className="position-absolute py-1 px-2 rounded-1 fs-7 related-video-duration">
                      {convertSecondsToTime(course.duration)}
                    </span>
                  </div>
                </td>
                <td>
                  <NavLink
                    to={`/course/${course.id}`}
                    className="d-inline underline-hover"
                  >
                    {course.title}
                  </NavLink>
                </td>
                <td>{course.category}</td>
                <td>{course.is_public ? "公開" : "未公開"}</td>
                <td>{formatDate(course.created_at)}</td>
                <td>{Number(course.view_count).toLocaleString()}</td>
                <td>{Number(course.rating).toFixed(1)}</td>
                <td>
                  <div>
                    <NavLink
                      to={`/tutor-panel/course/topicSeries/${course.id}/edit`}
                      className="btn link-brand-03 border-0 d-inline-flex f-align-center p-0"
                    >
                      <span className="material-symbols-outlined me-1">
                        dataset
                      </span>
                      詳細
                    </NavLink>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          {/* 頁碼 */}
          <Pagination pageData={pageData?.topicSeries} getData={getData} />
        </div>
      </main>
    </>
  );
}
