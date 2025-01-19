import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { otherVideos, relatedVideos } from "../../../data/videos";
import CommentsSection from "../../../components/course/CommentsSection";

const { VITE_API_BASE } = import.meta.env

export default function CourseVideoPage() {
  const [courseList, setCourseList] = useState({
    tags: [],
    tutor: {},
    descriptionList: [],
  });
  const [comments, setComments] = useState([]);
  const [chapterVideos, setChapterVideos] = useState([]);
  const { id } = useParams();

  // 取得課程資料函式
  const getCoursesData = async () => {
    try {
      const videoDetailResult = await axios.get(
        `${VITE_API_BASE}/api/v1/videos/${id}`
      );
      const commentsResult = await axios.get(
        `${VITE_API_BASE}/api/v1/videos/${id}/comments`
      );
      const chapterVideosResult = await axios.get(
        `${VITE_API_BASE}/api/v1/videos/${id}/chapters`
      );
      setCourseList(videoDetailResult.data);
      setComments(commentsResult.data);
      setChapterVideos(chapterVideosResult.data);
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
      <main className="video-details container-lg py-lg-13 py-md-0">
        <div className="row">
          <section className="col-lg-7 col-xl-8">
            <video
              poster={courseList.thumbnail}
              className="mb-6 w-100 video-show mouse-pointer-style"
              src={courseList.videoUrl}
              controls
            ></video>
            <h1 className="fs-2 mb-4 video-title">{courseList.title}</h1>
            <div className="d-flex mb-sm-6 mb-2">
              <div className="f-align-center">
                <div className="f-align-center py-2 ps-0">
                  <span className="view-count me-1 fs-5 material-symbols-outlined">
                    visibility
                  </span>
                  <data
                    value={courseList.viewCount}
                    className="fs-7 data-view-count"
                  >
                    {courseList.viewCount}
                  </data>
                </div>
                <div className="f-align-center py-2 px-4">
                  <span className="rating-score me-1 fs-5 material-symbols-outlined icon-fill">
                    kid_star
                  </span>
                  <data
                    value={courseList.ratingScore}
                    className="fs-7 data-rating-score"
                  >
                    {courseList.ratingScore}
                  </data>
                </div>
              </div>
              <div className="ms-auto">
                <div className="f-align-center">
                  <button
                    type="button"
                    className="favorite-button f-align-center btn btn-outline-none py-2 ps-3 px-4"
                  >
                    <span
                      className={`fs-5 me-1 material-symbols-outlined ${
                        courseList.isFavorite ? "icon-fill" : ""
                      }`}
                    >
                      favorite
                    </span>
                    <span className="fs-7 favorite-font">
                      {courseList.isFavorite ? "已收藏" : "未收藏"}
                    </span>
                  </button>
                  <button
                    type="button"
                    className="review-button f-align-center btn btn-outline-none py-2 ps-0 pe-0 pe-sm-4 "
                  >
                    <span
                      className={`fs-5 me-1 material-symbols-outlined ${
                        courseList.isReviewed ? "icon-fill" : ""
                      }`}
                    >
                      kid_star
                    </span>
                    <span className="fs-7 review-font">
                      {courseList.isReviewed ? "已評價" : "未評價"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className="mb-sm-6 mb-5">
              <ul className="d-flex flex-wrap gap-2">
                {courseList.tags.map((tag, index) => (
                  <li
                    className="tag-label btn btn-brand-03 py-2 px-4 mouse-pointer-style"
                    key={index}
                  >
                    <h3>{tag}</h3>
                  </li>
                ))}
              </ul>
            </div>
            <div className="author-content d-flex mb-10">
              <img
                className="author-image rounded-5 me-4"
                src={courseList.tutor.avatar}
                alt="作者頭像"
              />
              <div>
                <h2 className="author-name mb-2">{courseList.tutor.name}</h2>
                <span className="author-info fs-7">
                  {courseList.tutor.description}
                </span>
              </div>
            </div>
            <div>
              <nav className="mb-6">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li
                    className="nav-item mouse-pointer-style"
                    role="presentation"
                  >
                    <div
                      className="nav-link active video-description"
                      id="description-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#description"
                      role="tab"
                      aria-controls="description"
                      aria-selected="true"
                    >
                      影片簡介
                    </div>
                  </li>
                  <li
                    className="nav-item mouse-pointer-style"
                    role="presentation"
                  >
                    <div
                      className="nav-link video-comments"
                      id="profile-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#profile"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                    >
                      留言討論區
                    </div>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="description"
                    role="tabpanel"
                    aria-labelledby="description-tab"
                  >
                    <ul className="ps-5 pt-6">
                      {courseList.descriptionList.map((item, index) => (
                        <li className="video-description-item mb-2" key={index}>
                          <h6>{item}</h6>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                  >
                    <CommentsSection comments={comments} />
                  </div>
                </div>
              </nav>
            </div>
          </section>
          <aside className="col-lg-5 col-xl-4">
            <div className="chapter-video rounded-4 aside-border mb-6">
              <div
                className="px-6 d-flex justify-content-between align-items-center"
                style={{ marginBottom: "22px" }}
              >
                <h4 className="chapter-video-title">章節影片</h4>
                <div className="f-align-center show-more-button mouse-pointer-style slide-right-hover">
                  <span className="me-1">更多</span>
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
                </div>
              </div>
              <ul className="chapter-list">
                {chapterVideos.map((video) => (
                  <li
                    className="px-6 py-4 d-flex justify-content-between chapter-item video-background-color-hover"
                    key={video.chapterId}
                  >
                    <span className="material-symbols-outlined player-icon me-2">
                      play_circle
                    </span>
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <span className="fs-7 chapter-contents">
                          {video.chapterNumber}
                        </span>
                        <time className="video-duration fs-7 rounded-1 px-2 py-1">
                          {video.duration}
                        </time>
                      </div>
                      <h5 className="chapter-item-title mb-2">
                        {video.chapterTitle}
                      </h5>
                      <div className="d-flex">
                        <span className="material-symbols-outlined me-1 fs-6 eyes-icon">
                          visibility
                        </span>
                        <data
                          className="chapter-view-count fs-7"
                          value="23,005"
                        >
                          {video.viewCount}
                        </data>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="other-videos rounded-4 aside-border mb-6">
              <div
                className="px-6 d-flex justify-content-between align-items-center"
                style={{ marginBottom: "22px" }}
              >
                <h4 className="tutor-other-video-title">講師其他影片</h4>
                <a
                  href="tutor-info.html"
                  className="f-align-center show-more-button slide-right-hover"
                >
                  <span className="me-1">更多</span>
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
                </a>
              </div>
              <ul className="other-videos-list">
                {otherVideos.map((course, index) => (
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
                        {course.duration}
                      </span>
                    </div>
                    <div className="f-column-between py-2">
                      <h5 className="other-video-title">{course.title}</h5>
                      <div className="f-align-center me-6">
                        <span className="view-count me-1 material-symbols-outlined eyes-icon fs-6">
                          visibility
                        </span>
                        <data
                          value={course.viewCount}
                          className="data-view-count fs-7"
                        >
                          {course.viewCount}
                        </data>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

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
                {relatedVideos.map((course, index) => (
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
                        <data value="23,005" className="data-view-count fs-7">
                          {course.viewCount}
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
