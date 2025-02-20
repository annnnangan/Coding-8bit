import { useState, useEffect } from "react";
import { useParams, NavLink, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import VideoContent from "../../../../components/course/detail-page/VideoContent";
import Loader from "../../../../components/common/Loader";

import courseApi from "../../../../api/courseApi";
import tutorApi from "../../../../api/tutorApi";

import { otherVideos, relatedVideos } from "../../../../data/videos";
import { convertSecondsToTime } from "../../../../utils/timeFormatted-utils";
import userApi from "../../../../api/userApi";

export default function CourseVideoPage() {
  // loading
  const [loadingState, setLoadingState] = useState(true);

  // 取得影片資料函式
  const [videoData, setVideoData] = useState({
    Tutor: {
      User: {},
    },
  });

  const { videoId } = useParams();
  const getData = async () => {
    setLoadingState(true);
    try {
      const videoResult = await courseApi.getVideoDetail(videoId);
      const tutorResult = await tutorApi.getTutorDetail(videoResult.tutor_id);
      const tutorUserDataResult = await userApi.getUserData(
        tutorResult.user_id
      );
      setVideoData({
        Tutor: { ...tutorResult, User: { ...tutorUserDataResult } },
        ...videoResult,
      });
    } catch (error) {
      console.log("錯誤", error);
    } finally {
      setLoadingState(false);
    }
  };

  const location = useLocation();

  // 初始化取得資料
  useEffect(() => {
    getData();
  }, [location]);

  return (
    <>
      <Helmet>
        <title>
          {videoData?.title
            ? `${videoData.title} ｜ 影片詳細`
            : "Coding∞bit ｜ 課程詳細"}
        </title>
      </Helmet>
      {loadingState && <Loader />}

      <main className="video-details container-lg py-lg-13 py-md-0">
        <div className="row">
          <VideoContent
            videoUrl={videoData?.video_url}
            courseList={videoData}
          />

          <aside className="col-lg-5 col-xl-4">
            {/* 講師其他影片 */}
            <div className="other-videos rounded-4 aside-border mb-6">
              <div
                className="px-6 d-flex justify-content-between align-items-center"
                style={{ marginBottom: "22px" }}
              >
                <h4 className="tutor-other-video-title">講師其他影片</h4>
                <NavLink
                  to={`/tutor-info/${videoData.tutor_id}`}
                  className="f-align-center show-more-button slide-right-hover"
                >
                  <span className="me-1">更多</span>
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
                </NavLink>
              </div>
              <ul className="other-videos-list">
                {otherVideos?.map((course, index) => (
                  <li
                    className="d-flex py-3 py-4 px-6 video-background-color-hover"
                    key={index}
                  >
                    <div className="position-relative">
                      <img
                        className="rounded-2 me-4 other-video-image"
                        src={course.thumbnail}
                        alt="影片縮圖"
                      />
                      <span className="position-absolute py-1 px-2 rounded-1 fs-7 other-video-duration">
                        {convertSecondsToTime(course.duration)}
                      </span>
                    </div>
                    <div className="f-column-between py-2">
                      <h5 className="other-video-title">{course.title}</h5>
                      <div className="f-align-center me-6">
                        <span className="view-count me-1 material-symbols-outlined eyes-icon fs-6">
                          visibility
                        </span>
                        <data
                          value={course.view_count}
                          className="data-view-count fs-7"
                        >
                          {Number(course.view_count).toLocaleString()}
                        </data>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* 相關影片 */}
            <div className="related-videos rounded-4 aside-border">
              <div
                className="px-6 f-between-center"
                style={{ marginBottom: "22px" }}
              >
                <h4 className="tutor-related-video-title">相關影片</h4>
                <div className="f-align-center show-more-button mouse-pointer-style slide-right-hover">
                  <span className="me-1">更多</span>
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
                </div>
              </div>
              <ul className="related-videos-list">
                {relatedVideos?.map((course, index) => (
                  <li
                    className="d-flex py-3 py-4 px-6 video-background-color-hover position-relative"
                    key={index}
                  >
                    <div className="position-relative me-4">
                      <img
                        className="rounded-2 related-video-image"
                        src={course.thumbnail}
                        alt="影片縮圖"
                      />
                      <span className="position-absolute py-1 px-2 rounded-1 fs-7 related-video-duration">
                        {course.duration}
                      </span>
                    </div>
                    <div className="f-column-between py-2">
                      <h5 className="related-video-title">{course.title}</h5>
                      <div className="f-align-center">
                        <span className="material-symbols-outlined me-1 author-icon fs-6">
                          co_present
                        </span>
                        <span className="me-2 me-md-4">{course.tutor}</span>
                        <span className="view-count me-1 material-symbols-outlined eyes-icon fs-6">
                          visibility
                        </span>
                        <data
                          value={course.view_count}
                          className="data-view-count fs-7"
                        >
                          {Number(course.view_count).toLocaleString()}
                        </data>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
