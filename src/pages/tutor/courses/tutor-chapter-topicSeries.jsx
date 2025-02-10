import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate, Link } from "react-router-dom";

import courseApi from "../../../api/courseApi";

import BackendPanelMenu from "../../../components/layout/BackendPanelMenu";
import Loader from "../../../components/common/Loader";
import Pagination from "../../../components/layout/Pagination";

export default function TutorManageTopicSeriesChapter() {
  const { id } = useParams();

  // loading
  const [loadingState, setLoadingState] = useState(false);

  const menuItems = [
    {
      icon: "video_settings",
      name: "課程影片管理",
      href: "/tutor-panel/course",
    },
    {
      icon: "event",
      name: "預約管理",
      href: "/tutor-panel/booking",
    },
    {
      icon: "auto_stories",
      name: "學習需求管理",
      href: "/tutor-panel/learning",
    },
    {
      icon: "equalizer",
      name: "數據與趨勢",
      href: "/tutor-panel/statistics",
    },
    {
      icon: "notifications_active",
      name: "個人化通知",
      href: "/tutor-panel/notification",
    },
    {
      icon: "person",
      name: "個人資料管理",
      href: "/tutor-panel/profile",
    },
    {
      icon: "paid",
      name: "財務管理",
      href: "/tutor-panel/finance",
    },
  ];

  const user = {
    avatar:
      "https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "卡斯伯Casper",
  };

  // 返回上一頁
  const navigate = useNavigate();
  const toPrevPage = () => {
    navigate(-1);
  };

  const [courseList, setCourseList] = useState([]);
  const getData = async () => {
    setLoadingState(true);
    try {
      const result = await courseApi.getCourseChapters(id);
      setCourseList(result);
    } catch (error) {
      console.log("錯誤", error);
    } finally {
      setLoadingState(false);
    }
  };

  // 初始化 - 取得資料
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Coding∞bit ｜ 主題式課程影片章節管理</title>
      </Helmet>
      {loadingState && <Loader />}

      <BackendPanelMenu menuItems={menuItems} type="tutor" user={user}>
        <main className="tutor-chapter-topicSeries-wrap container-fluid pb-11">
          <div className="f-between">
            <div className="title f-align-center">
              <button
                type="button"
                className="btn border-0 p-0"
                onClick={toPrevPage}
              >
                <span className="material-symbols-outlined">
                  arrow_back_ios
                </span>
              </button>
              <h1 className="fs-4 fs-lg-2 ms-1">主題式課程影片章節管理</h1>
            </div>
            <Link
              to={`/tutor-panel/course/topicSeries/${id}/edit`}
              className="btn btn btn-brand-03 rounded-2"
            >
              編輯課程資訊
            </Link>
          </div>

          {/* 篩選與搜尋 */}
          <div className="f-end-center mt-10">
            <div className="dropdown">
              <button
                type="button"
                className="btn btn-outline-gray-03 border-1 dropdown-toggle px-11"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                排序方式
                <span className="material-symbols-outlined position-absolute end-0 pe-3">
                  keyboard_arrow_down
                </span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end w-100 mt-1">
                <li>
                  <button type="button" className="dropdown-item">
                    名稱
                  </button>
                </li>
                <li>
                  <button type="button" className="dropdown-item">
                    新增日期
                  </button>
                </li>
              </ul>
            </div>
            <div className="position-relative f-align-center ms-2">
              <input
                type="text"
                className="form-control ps-11"
                placeholder="搜尋影片"
              />
              <span
                className="material-symbols-outlined text-gray-03 position-absolute ps-4"
                style={{ width: "20px", height: "20px" }}
              >
                search
              </span>
            </div>
          </div>

          {/* 影片列表 */}
          <div className="mt-6 mt-lg-8">
            <table className="table">
              <thead>
                <tr>
                  <th>章節</th>
                  <th></th>
                  <th>章節影片名稱</th>
                  <th>上傳日期</th>
                  <th>觀看數</th>
                  <th>操作</th>
                </tr>
              </thead>
              {courseList.map((course) => (
                <tbody key={course.chapterId}>
                  <tr className="align-middle">
                    <td>{course.chapterNumber}</td>
                    <td>
                      <img src={course.thumbnail} alt="course-image" />
                    </td>
                    <td>{course.chapterTitle}</td>
                    <td>2024年12月5日</td>
                    <td>{Number(course.viewCount).toLocaleString()}</td>
                    <td>
                      <div>
                        <Link
                          to={`/tutor-panel/course/topicSeries/${course.chapterId}/chapter`}
                          className="btn link-brand-03 border-0 d-inline-flex f-align-center p-0"
                        >
                          <span className="material-symbols-outlined me-1">
                            edit
                          </span>
                          編輯
                        </Link>
                        <button
                          type="button"
                          className="btn link-danger border-0 f-align-center p-0 mt-1"
                        >
                          <span className="material-symbols-outlined me-1">
                            delete
                          </span>
                          刪除
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
            {/* 頁碼 */}
            <div className="f-end-center mt-6">
              <Pagination />
            </div>
          </div>
        </main>
      </BackendPanelMenu>
    </>
  );
}
