import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import VideoContent from "../../../../components/course/detail-page/VideoContent";
import Loader from "../../../../components/common/Loader";

import courseApi from "../../../../api/courseApi";

import { convertSecondsToTime } from "../../../../utils/timeFormatted-utils";

export default function CourseVideoPage() {
  // loading
  const [loadingState, setLoadingState] = useState(true);

  // 取得影片資料函式
  const [videoData, setVideoData] = useState({
    Tutor: {
      User: {},
    },
  });

  const [otherVideos, setOtherVideos] = useState([]);
  const [relatedVideo, setRelatedVideo] = useState([]);
  const { videoId } = useParams();
  const getData = async () => {
    setLoadingState(true);
    try {
      const videoResult = await courseApi.getVideoDetail(videoId); //取得影片
      const otherCourseResult = await courseApi.getTutorCourses({
        tutorId: videoResult.data.tutor_id,
      });
      const relatedVideoReault = await courseApi.getTutorVideos({
        category: videoData.category,
      });
      setVideoData(videoResult.data);
      setOtherVideos(otherCourseResult.courses);
      setRelatedVideo(relatedVideoReault.data.videos);
    } catch (error) {
      console.log("錯誤", error);
    } finally {
      setLoadingState(false);
    }
  };

  // 初始化取得資料
  useEffect(() => {
    getData();
  }, [videoId]);

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
            paramsVideoId={videoId}
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
                {otherVideos?.map((other, index) => (
                  <li
                    className="d-flex py-3 py-4 px-6 video-background-color-hover"
                    key={index}
                  >
                    <NavLink
                      to={`/course/${other.id}`}
                      className="d-flex justify-content-between chapter-item"
                    >
                      <div className="position-relative">
                        <img
                          className="rounded-2 me-4 other-video-image"
                          src={other.cover_image}
                          alt="影片縮圖"
                        />
                        <span className="position-absolute py-1 px-2 rounded-1 fs-7 other-video-duration">
                          {convertSecondsToTime(other.duration)}
                        </span>
                      </div>
                      <div className="f-column-between py-2">
                        <h5 className="other-video-title">{other.title}</h5>
                        <div className="f-align-center me-6">
                          <span className="view-count me-1 material-symbols-outlined eyes-icon fs-6">
                            visibility
                          </span>
                          <data
                            value={other.view_count}
                            className="data-view-count fs-7"
                          >
                            {Number(other.view_count).toLocaleString()}
                          </data>
                        </div>
                      </div>
                    </NavLink>
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
                {relatedVideo?.map((related, index) => (
                  <li
                    className="d-flex py-3 py-4 px-6 video-background-color-hover position-relative"
                    key={index}
                  >
                    <NavLink
                      to={`/video/${related.id}`}
                      className="d-flex justify-content-between chapter-item"
                    >
                      <div className="position-relative me-4">
                        <img
                          className="rounded-2 related-video-image"
                          src={related.cover_image}
                          alt="影片縮圖"
                        />
                        <span className="position-absolute py-1 px-2 rounded-1 fs-7 related-video-duration">
                          {related.duration}
                        </span>
                      </div>
                      <div className="f-column-between py-2">
                        <h5 className="related-video-title">{related.title}</h5>
                        <div className="f-align-center">
                          <span className="material-symbols-outlined me-1 author-icon fs-6">
                            co_present
                          </span>
                          <span className="me-2 me-md-4">
                            {related.Tutor.User.username}
                          </span>
                          <span className="view-count me-1 material-symbols-outlined eyes-icon fs-6">
                            visibility
                          </span>
                          <data
                            value={related.view_count}
                            className="data-view-count fs-7"
                          >
                            {Number(related.view_count).toLocaleString()}
                          </data>
                        </div>
                      </div>
                    </NavLink>
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
