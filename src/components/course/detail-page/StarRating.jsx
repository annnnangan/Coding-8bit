// react 相關套件
import { useState } from "react";

// 第三方套件
import PropTypes from "prop-types";
import Swal from "sweetalert2";

// API
import courseApi from "@/api/courseApi";

const StarRating = ({ videoId, hideModal, setStarRating }) => {
  const [rating, setRating] = useState(0); // 目前評分
  const [hover, setHover] = useState(0); // 偵測滑鼠目前移入的評分分數

  // 處理評分變更
  const onRatingChange = async (newRating) => {
    try {
      const ratingReaponse = await courseApi.postRatingVideo(videoId, {
        rating: newRating,
      });
      if (ratingReaponse.status === "success") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "課程已評分",
          showConfirmButton: false,
          timer: 1000,
        });
      }
      setRating(newRating);
    } catch (error) {
      console.error(error);
    } finally {
      setStarRating(true);
      hideModal();
    }
  };
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? "on" : "off"}
            onClick={() => onRatingChange(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

StarRating.propTypes = {
  videoId: PropTypes.string,
  rating: PropTypes.number,
  onRatingChange: PropTypes.func,
  hideModal: PropTypes.func,
  setStarRating: PropTypes.func,
};

export default StarRating;
