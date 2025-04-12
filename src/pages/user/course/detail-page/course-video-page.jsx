// reacr 相關套件
import { useState, useEffect, useRef } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useDispatch } from "react-redux";

// 第三方套件
import { Modal } from "bootstrap";
import Swal from "sweetalert2";

// API
import courseApi from "@/api/courseApi";
import userApi from "@/api/userApi";

// 組件
import VideoContent from "@/components/course/detail-page/VideoContent";
import Loader from "@/components/common/Loader";

// 工具
import { convertSecondsToTime } from "@/utils/timeFormatted-utils";
import { loginCheck } from "@/store/slice/authSlice";

export default function CourseVideoPage() {
  const [chapter, setChapter] = useState([]); // 章節
  const [otherVideos, setOtherVideos] = useState([]); // 講師其他影片
  const [relatedVideos, setRelatedVideos] = useState([]); // 相關影片
  const [loadingState, setLoadingState] = useState(true); // loading
  const [swalShown, setSwalShown] = useState(false); // 狀態變數來追蹤是否已經顯示過 Swal 彈窗
  const { id, videoId } = useParams(); // 取得路由參數
  const navigate = useNavigate(); // 用於導頁
  const dispatch = useDispatch(); // redux dispatch

  // 更多章節 modal
  const modalRef = useRef(null);
  const modalRefMethod = useRef(null);

  // 確保開發環境時初始化只執行一次
  const isInitial = useRef(false);

  // 只會記錄一次錯誤訊息，防止重覆彈出 modal
  const errorLogged = useRef(false);

  // 影片資料
  const [videoData, setVideoData] = useState({
    Tutor: {
      User: {},
    },
  });

  // 過濾同講師無章節or相同課程
  const filterOtherCourse = (others) => {
    return others.filter(
      (other) =>
        other.CourseChapters &&
        other.CourseChapters.length > 0 &&
        other.id !== id
    );
  };

  // 過濾同課程的影片並取 6 支影片
  const filterRelatedVideo = (relatedVideo) => {
    return relatedVideo
      .filter((related) => related.course_id !== id)
      .slice(0, 6);
  };

  const getInitialData = async () => {
    if (swalShown) return;

    const isLoginStatus = await dispatch(loginCheck());
    if (isLoginStatus.meta.requestStatus === "rejected") {
      if (!errorLogged.current) {
        setSwalShown(true);
        Swal.fire({
          title: "請先登入或註冊會員",
          text: "趕緊加入觀賞優質課程吧",
          icon: "error",
          showCancelButton: true,
          confirmButtonText: "註冊",
          cancelButtonText: "登入",
          allowOutsideClick: false,
        }).then((result) => {
          setSwalShown(false);
          if (result.isConfirmed) {
            navigate("/signup"); // 註冊
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            navigate("/login"); // 登入
          }
        });
      }

      errorLogged.current = true;
      setLoadingState(false);
    } else {
      setLoadingState(true);
      if (!errorLogged.current) {
        try {
          const userSubscriptionsPlan = await userApi.getUserData();
          if (userSubscriptionsPlan.subscriptions.length === 0) {
            const errObject = new Error();
            errObject.name = "SubscriptionError";
            throw errObject;
          }

          const courseResult = await courseApi.getCourseDetail(id);
          const videoResult = await courseApi.getVideoDetail(videoId);
          const chapterResult = await courseApi.getCourseChapter(id);
          const otherCourseResult = await courseApi.getFrontTutorCourses({
            tutorId: videoResult.tutor_id,
          });
          const relatedVideosResult = await courseApi.getFrontTutorVideos({
            category: videoData.category,
          });

          setVideoData({
            ...courseResult,
            ...videoResult,
            tag: courseResult.tag,
            category: courseResult.category,
          });
          setChapter(chapterResult);
          setOtherVideos(filterOtherCourse(otherCourseResult.courses));
          setRelatedVideos(filterRelatedVideo(relatedVideosResult.videos));
        } catch (error) {
          if (!errorLogged.current) {
            if (error.name === "SubscriptionError") {
              setSwalShown(true);
              Swal.fire({
                title: "無法觀看課程",
                text: "輕鬆升級，詳情請至訂閱了解",
                icon: "error",
                showCancelButton: true,
                confirmButtonText: "手刀升級！",
                cancelButtonText: "回首頁",
                allowOutsideClick: false,
              }).then((result) => {
                setSwalShown(false);
                if (result.isConfirmed) {
                  navigate("/subscription-list"); // 手刀升級
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                  navigate("/"); // 返回首頁
                }
              });
            }
            errorLogged.current = true;
          }
        } finally {
          setLoadingState(false);
        }

        isInitial.current = false;
      }
    }
  };

  // 初始化取得資料
  useEffect(() => {
    if (!isInitial.current) {
      getInitialData();
    } else {
      isInitial.current = false;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  // 確保 modal 隱藏時，焦點不會停留在 modal 上
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
          {videoData.video_url && (
            <>
              <VideoContent
                videoUrl={videoData?.video_url}
                courseList={videoData}
                paramsVideoId={videoId}
                page="course-video"
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
                {otherVideos.length > 0 && (
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
                      {otherVideos.map((other, index) => (
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
                              <h5 className="other-video-title">
                                {other.title}
                              </h5>
                              <div className="f-align-center me-6">
                                <span className="view-count me-1 material-symbols-outlined eyes-icon fs-6">
                                  visibility
                                </span>
                                <data
                                  value={Number(
                                    other.view_count
                                  ).toLocaleString()}
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
                )}

                {/* 相關影片 */}
                {relatedVideos.length > 0 && (
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
                      {relatedVideos.map((related, index) => (
                        <li
                          className="d-flex py-3 py-4 px-6 video-background-color-hover position-relative"
                          key={index}
                        >
                          <NavLink
                            to={`/video/${related.id}`}
                            className="d-flex justify-content-between chapter-item"
                          >
                            <div className="position-relative me-4 related-video-image rounded-2">
                              <img
                                className="w-100"
                                src={related.cover_image}
                                alt="影片縮圖"
                              />
                              <span className="position-absolute py-1 px-2 rounded-1 fs-7 related-video-duration">
                                {convertSecondsToTime(related.duration)}
                              </span>
                            </div>
                            <div className="f-column-between py-2">
                              <h5 className="related-video-title">
                                {related.title}
                              </h5>
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
                                  value="23,005"
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
                )}
              </aside>
            </>
          )}
        </div>
      </main>

      {/* 更多章節 modal */}
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
                章節總覽
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
                {chapter.slice(1).map((video, index) => (
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
          </div>
        </div>
      </div>
    </>
  );
}
