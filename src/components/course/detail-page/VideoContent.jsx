import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import DOMPurify from "dompurify";

import courseApi from "../../../api/courseApi";

import CommentsSection from "./CommentsSection";

export default function VideoContent({
  videoUrl,
  courseList,
  courseTutor,
  introductionVideoId,
  paramsVideoId,
}) {
  const [comments, setComments] = useState([]);
  const [disableInputComment, setDisableInputComment] = useState(false);
  const getCourseCommentsHandle = async () => {
    try {
      const commentsResult = await courseApi.getCourseComments(
        introductionVideoId || paramsVideoId
      );

      setComments(commentsResult);
    } catch (error) {
      console.log("getCourseCommentsHandle error", error);
    }
  };

  useEffect(() => {
    videoUrl === ""
      ? setDisableInputComment(true)
      : setDisableInputComment(false);

    console.log("introductionVideoId", introductionVideoId);
    console.log("paramsVideoId", paramsVideoId);

    if (introductionVideoId || paramsVideoId) {
      getCourseCommentsHandle();
    }
  }, [introductionVideoId || paramsVideoId]);
  

  return (
    <section className="col-lg-7 col-xl-8">
      <div className="mb-6 video-container position-relative">
        <video
          poster={courseList.cover_image}
          className="video-show position-absolute w-100 h-100"
          src={videoUrl ? videoUrl : ""}
          controls
        ></video>
      </div>
      <h1 className="fs-2 mb-4 video-title">{courseList.title}</h1>
      <div className="d-flex mb-sm-6 mb-2">
        <div className="f-align-center">
          <div className="f-align-center py-2 ps-0">
            <span className="view-count me-1 fs-5 material-symbols-outlined">
              visibility
            </span>
            <data
              value={courseList.view_count}
              className="fs-7 data-view-count"
            >
              {Number(courseList.view_count).toLocaleString()}
            </data>
          </div>
          <div className="f-align-center py-2 px-4">
            <span className="rating-score me-1 fs-5 material-symbols-outlined icon-fill">
              kid_star
            </span>
            <data value={courseList.rating} className="fs-7 data-rating-score">
              {Number(courseList.rating).toFixed(1)}
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
                  courseList.is_favorite && "icon-fill"
                }`}
              >
                favorite
              </span>
              <span className="fs-7 favorite-font">
                {courseList.is_favorite ? "已收藏" : "未收藏"}
              </span>
            </button>
            <button
              type="button"
              className="review-button f-align-center btn btn-outline-none py-2 ps-0 pe-0 pe-sm-4 "
            >
              <span
                className={`fs-5 me-1 material-symbols-outlined ${
                  courseList.is_reviewed && "icon-fill"
                }`}
              >
                kid_star
              </span>
              <span className="fs-7 review-font">
                {courseList.is_reviewed ? "已評價" : "未評價"}
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="mb-sm-6 mb-5">
        <ul className="d-flex flex-wrap gap-2">
          <li className="tag-label btn btn-brand-03 py-2 px-4 mouse-pointer-style">
            <h3>{courseList.category}</h3>
          </li>
        </ul>
      </div>
      <div className="author-content d-flex mb-10">
        <img
          className="author-image rounded-5 me-4"
          src={
            courseList.Tutor.User.avatar_url
              ? courseList.Tutor.User.avatar_url
              : "images/icon/user.png"
          }
          alt="tutor-avatar-image"
        />
        <div>
          <NavLink to={`/tutor-info/${courseTutor}`}>
            <h2 className="author-name mb-2">
              {courseList.Tutor.User.username}
            </h2>
          </NavLink>
          <span className="author-info fs-7">{courseList.Tutor.about}</span>
        </div>
      </div>
      <div>
        <nav className="mb-6">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item mouse-pointer-style" role="presentation">
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
            <li className="nav-item mouse-pointer-style" role="presentation">
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
              <div className="ps-5 pt-6">
                <p
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(courseList.description),
                  }}
                ></p>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <CommentsSection
                comments={comments}
                videoId={introductionVideoId || paramsVideoId}
                disableInputComment={disableInputComment}
              />
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
}
VideoContent.propTypes = {
  courseList: PropTypes.shape({
    title: PropTypes.string,
    Tutor: PropTypes.shape({
      User: PropTypes.shape({
        username: PropTypes.string,
        avatar_url: PropTypes.string,
      }),
      about: PropTypes.string,
    }),
    duration: PropTypes.number,
    view_count: PropTypes.number,
    rating: PropTypes.string,
    cover_image: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    is_favorite: PropTypes.string,
    is_reviewed: PropTypes.string,
  }),
  videoUrl: PropTypes.string,
  introductionVideoId: PropTypes.string,
  courseTutor: PropTypes.string,
  paramsVideoId: PropTypes.string,
};
