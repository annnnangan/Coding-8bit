// react 相關套件
import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

// 第三方套件
import PropTypes from "prop-types";
import DOMPurify from "dompurify";
import Swal from "sweetalert2";
import { Modal } from "bootstrap";

// API
import courseApi from "../../../api/courseApi";

// 組件
import CommentsSection from "./CommentsSection";
import StarRating from "./StarRating";

export default function VideoContent({
  videoUrl,
  courseList,
  courseTutor,
  introductionVideoId,
  paramsVideoId,
}) {
  const [comments, setComments] = useState([]); // 留言
  const [disableInputComment, setDisableInputComment] = useState(false); // 是否禁用留言輸入框
  const [favoriteVideo, setFavoriteVideo] = useState(false); // 是否收藏影片
  const [starRating, setStarRating] = useState(false); // 是否評分影片
  const [videoSrc, setVideoSrc] = useState(""); // 影片 URL

  // redux 使用者資訊
  const userInfo = useSelector((state) => state.auth.userData);

  // 評分 modal
  const modalRef = useRef(null);
  const modalRefMethod = useRef(null);

  // 取得課程留言
  const getCourseCommentsHandle = async () => {
    try {
      const commentsResult = await courseApi.getCourseComments(
        introductionVideoId || paramsVideoId
      );
      setComments(commentsResult);
    } catch (error) {
      console.error("getCourseCommentsHandle error", error);
    }
  };

  // 控制收藏課程
  const handleFavorite = async (videoId) => {
    let response;
    try {
      if (favoriteVideo) {
        response = await courseApi.deleteFavoriteVideo(videoId);
      } else {
        response = await courseApi.postFavoriteVideo(videoId);
      }
      if (response.status === "success") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "課程已收藏",
          showConfirmButton: false,
          timer: 1000,
        });
        setFavoriteVideo(true);
      } else {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "移除收藏",
          showConfirmButton: false,
          timer: 1000,
        });
        setFavoriteVideo(false);
      }
    } catch (error) {
      console.error("handleFavorite error", error);
    }
  };

  // 取得影片播放權限
  const getTokenToPlay = async (videoUrl) => {
    if (!videoUrl) return "";

    // 如果開頭為 "https://firebasestorage.googleapis.com/"，直接回傳網址
    if (videoUrl.startsWith("https://firebasestorage.googleapis.com/")) {
      return videoUrl;
    }

    // 使用正則表達式過濾掉 "https://" 到 "videos" 之前跟 "?" 後面的字串
    const filteredUrl = videoUrl
      .replace(/https:\/\/.*?\/videos/, "videos")
      .split("?")[0];

    const tokenUrl = await courseApi.getVideoPermission(filteredUrl);
    return tokenUrl;
  };

  // 檢查是否有登入
  const checkToken = () => {
    return Object.keys(userInfo).length === 0 ? true : false;
  };

  //初始化判斷是否禁用留言輸入框
  useEffect(() => {
    if (checkToken()) return;

    videoUrl === ""
      ? setDisableInputComment(true)
      : setDisableInputComment(false);

    if (introductionVideoId || paramsVideoId) {
      const getFavoriteVideoStatus = async () => {
        const resStatus = await courseApi.getFavoriteVideo(
          introductionVideoId || paramsVideoId
        );
        resStatus.isFavorite ? setFavoriteVideo(true) : setFavoriteVideo(false);
      };
      const getStarRatingStatus = async () => {
        const resRating = await courseApi.getStarRatingVideo(
          introductionVideoId || paramsVideoId
        );
        resRating.isRated ? setStarRating(true) : setStarRating(false);
      };

      getFavoriteVideoStatus();
      getStarRatingStatus();
      getCourseCommentsHandle();
    }
  }, [introductionVideoId || paramsVideoId]);

  // 取得影片播放 URL
  useEffect(() => {
    if (checkToken()) return;
    const fetchVideoSrc = async () => {
      const tokenUrl = await getTokenToPlay(videoUrl);
      setVideoSrc(tokenUrl);
    };

    fetchVideoSrc();
  }, [videoUrl]);

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
    <section className="col-lg-7 col-xl-8">
      <div className="mb-6 video-container position-relative">
        <video
          poster={courseList.cover_image}
          className="video-show position-absolute w-100 h-100"
          src={videoSrc}
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
              onClick={() =>
                handleFavorite(introductionVideoId || paramsVideoId)
              }
            >
              <span
                className={`fs-5 me-1 material-symbols-outlined ${
                  favoriteVideo && "icon-fill"
                }`}
              >
                favorite
              </span>
              <span className="fs-7 favorite-font">
                {favoriteVideo ? "已收藏" : "未收藏"}
              </span>
            </button>
            <button
              type="button"
              className="review-button f-align-center btn btn-outline-none py-2 ps-0 pe-0 pe-sm-4 "
              onClick={() => modalRefMethod.current.show()}
            >
              <span
                className={`fs-5 me-1 material-symbols-outlined ${
                  starRating && "icon-fill"
                }`}
              >
                kid_star
              </span>
              <span className="fs-7 review-font">
                {starRating ? "已評價" : "未評價"}
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
          <span className="author-info fs-7">{courseList.Tutor.slogan}</span>
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
                評分
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <span>給講師 1 ~ 5 的評價</span>
              <StarRating
                videoId={introductionVideoId || paramsVideoId}
                setStarRating={setStarRating}
                hideModal={() => modalRefMethod.current.hide()}
              />
            </div>
          </div>
        </div>
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
      slogan: PropTypes.string,
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
