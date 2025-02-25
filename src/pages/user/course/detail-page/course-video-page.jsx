import { useState, useEffect, useRef } from "react";
import { useParams, NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Modal } from "bootstrap";

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

  const [chapter, setChapter] = useState([]);
  const [otherVideos, setOtherVideos] = useState([]);
  const [relatedVideo, setRelatedVideo] = useState([]);
  const { id, videoId } = useParams();
  const modalRef = useRef(null);
  const modalRefMethod = useRef(null);

  // 初始化取得資料
  useEffect(() => {
    const getData = async () => {
      setLoadingState(true);
      try {
        const courseResult = await courseApi.getCourseDetail(id);
        const videoResult = await courseApi.getVideoDetail(videoId);
        const chapterResult = await courseApi.getCourseChapter(id);
        const otherCourseResult = await courseApi.getTutorCourses({
          tutorId: videoResult.tutor_id,
        });
        const relatedVideoReault = await courseApi.getTutorVideos({
          category: videoData.category,
        });
        setVideoData({ ...courseResult, ...videoResult });
        setChapter(chapterResult);
        setOtherVideos(otherCourseResult.courses);
        setRelatedVideo(relatedVideoReault.data.videos);
      } catch (error) {
        console.log("錯誤", error);
      } finally {
        setLoadingState(false);
      }
    };
    getData();
  }, [videoId]);

  useEffect(() => {
    modalRefMethod.current = new Modal(modalRef.current);
    modalRef.current.addEventListener("hide.bs.modal", () => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    });
  }, []);

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
            {/* 章節影片 */}
            <div className="chapter-video rounded-4 aside-border mb-6">
              <div
                className="px-6 d-flex justify-content-between align-items-center"
                style={{ marginBottom: "22px" }}
              >
                <h4 className="chapter-video-title">章節影片</h4>
                <div
                  className="f-align-center show-more-button mouse-pointer-style slide-right-hover"
                  onClick={() => modalRefMethod.current.show()}
                >
                  <span className="me-1">更多</span>
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
                </div>
              </div>
              <ul className="chapter-list">
                {chapter?.slice(1, 6).map((video, index) => (
                  <li
                    className="video-background-color-hover px-6 py-4"
                    key={video.id}
                  >
                    <NavLink
                      to={`/course/${id}/chapter/${video.Videos[0].id}`}
                      className="d-flex justify-content-between chapter-item"
                    >
                      <span className="material-symbols-outlined player-icon me-2">
                        play_circle
                      </span>
                      <div className="flex-grow-1">
                        <div className="d-flex align-items-center justify-content-between mb-1">
                          <span className="fs-7 chapter-contents">
                            第 {index + 1} 章
                          </span>
                          <time className="video-duration fs-7 rounded-1 px-2 py-1">
                            {convertSecondsToTime(video.Videos[0].duration)}
                          </time>
                        </div>
                        <h5 className="chapter-item-title mb-2">
                          {video.Videos[0].title}
                        </h5>
                        <div className="d-flex">
                          <span className="material-symbols-outlined me-1 fs-6 eyes-icon">
                            visibility
                          </span>
                          <data
                            className="chapter-view-count fs-7"
                            value={Number(
                              video.Videos[0].view_count
                            ).toLocaleString()}
                          >
                            {Number(
                              video.Videos[0].view_count
                            ).toLocaleString()}
                          </data>
                        </div>
                      </div>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

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
                            value={Number(other.view_count).toLocaleString()}
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
                          <data value="23,005" className="data-view-count fs-7">
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
      <div
        ref={modalRef}
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <ul className="chapter-list">
                {chapter?.map((video, index) => (
                  <li
                    className="video-background-color-hover px-6 py-4"
                    onClick={() => modalRefMethod.current.hide()}
                    key={video.id}
                  >
                    <NavLink
                      to={`/course/${id}/chapter/${video.Videos[0].id}`}
                      className="d-flex justify-content-between chapter-item"
                    >
                      <span className="material-symbols-outlined player-icon me-2">
                        play_circle
                      </span>
                      <div className="flex-grow-1">
                        <div className="d-flex align-items-center justify-content-between mb-1">
                          <span className="fs-7 chapter-contents">
                            第 {index + 1} 章
                          </span>
                          <time className="video-duration fs-7 rounded-1 px-2 py-1">
                            {convertSecondsToTime(video.Videos[0].duration)}
                          </time>
                        </div>
                        <h5 className="chapter-item-title mb-2">
                          {video.Videos[0].title}
                        </h5>
                        <div className="d-flex">
                          <span className="material-symbols-outlined me-1 fs-6 eyes-icon">
                            visibility
                          </span>
                          <data
                            className="chapter-view-count fs-7"
                            value="23,005"
                          >
                            {Number(
                              video.Videos[0].view_count
                            ).toLocaleString()}
                          </data>
                        </div>
                      </div>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            {/* <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
