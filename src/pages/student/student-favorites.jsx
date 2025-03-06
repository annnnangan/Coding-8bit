// react 相關套件
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";

// API
import courseApi from "@/api/courseApi";

// 工具
import { convertSecondsToTime } from "@/utils/timeFormatted-utils";

function StudentFavorites() {
  const [favorite, setFavorite] = useState([]); // 收藏陣列
  const [tutors, setTutors] = useState({}); // 導師資料

  // 獲取所有導師資料
  const getTutorHandle = async () => {
    const tutorData = {};
    for (const item of favorite) {
      const tutor = await courseApi.getVideoDetail(item.video_id);
      tutorData[item.video_id] = tutor.Tutor.User.username;
    }
    setTutors(tutorData);
  };

  // 獲取所有收藏
  const getFavoriteVideo = async () => {
    const response = await courseApi.getAllFavoriteVideo();
    const { data } = response;
    setFavorite(data);
  };

  // 初始化
  useEffect(() => {
    getFavoriteVideo();
    getTutorHandle();
  }, []);

  return (
    <>
      <Helmet>
        <title>Coding∞bit ｜ 學生我的收藏</title>
      </Helmet>

      <div className="overflow-y-auto">
        <h2 className="mb-6 ps-5 ps-lg-0">我的收藏</h2>
        <div className="bg-gray-04 p-8 rounded-3 student-favorites-section">
          <ul className="nav nav-tabs mb-5" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#home"
                type="button"
                role="tab"
                aria-controls="home"
                aria-selected="true"
              >
                收藏影片
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#profile"
                type="button"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
              >
                收藏導師
              </button>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <div className="table-wrap mt-6 mt-lg-8">
                <table className="table">
                  <thead>
                    <tr height="50">
                      <th></th>
                      <th>影片名稱</th>
                      <th>類別</th>
                      <th>觀看數</th>
                      <th>評價</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {favorite.map((item, index) => (
                      <tr className="align-middle" key={index}>
                        <td>
                          <div className="cover_image-wrap position-relative">
                            <img src={item.Video.cover_image} alt="封面圖" />
                            <span className="position-absolute py-1 px-2 rounded-1 fs-7 related-video-duration">
                              {convertSecondsToTime(item.Video.duration)}
                            </span>
                          </div>
                        </td>
                        <td>{item.Video.title}</td>
                        <td>{item.Video.category}</td>
                        <td>{item.Video.view_count}</td>
                        <td>{Number(item.Video.rating)}</td>
                        <td>
                          <NavLink
                            to={`/video/${item.video_id}`}
                            className="btn btn-primary btn-sm"
                          >
                            <i className="bi bi-box-arrow-up-right me-1"></i>
                            <span>前往</span>
                          </NavLink>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              ...
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentFavorites;
