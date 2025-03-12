import PropTypes from "prop-types";

export default function CommentRatingStat({ ratingStats, isLoading = false }) {
  console.log(ratingStats);
  /* -------------------------- Calculate rating star ------------------------- */
  const decimalRating = Math.round((ratingStats?.average_rating % 1) * 10) / 10;
  const fullStars = Math.floor(ratingStats?.average_rating) + (decimalRating >= 0.8 && 1); // Number of full stars
  const hasHalfStar = decimalRating >= 0.3 && decimalRating < 0.8; // Show half star if decimal is between 0.3 and 0.8
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Remaining empty stars

  return (
    <div className="card p-4">
      {isLoading ? (
        <div className="placeholder-glow d-flex flex-column" style={{ width: "80%" }}>
          <span className="placeholder bg-brand-02 w-50 mb-1"></span>
          <span className="placeholder bg-brand-02 w-75 mb-1"></span>
          <span className="placeholder bg-brand-02 w-75"></span>
        </div>
      ) : (
        <div className="row justify-content-center">
          <div className="col-lg-5 f-center flex-column">
            <h4 className="text-brand-03 mb-2">{Number(ratingStats.average_rating).toFixed(1)}</h4>
            <div className="f-center mb-2">
              {isLoading && (
                <div className="placeholder-glow" style={{ width: "40%" }}>
                  <span className="placeholder bg-brand-02 w-50 mb-1"></span>
                </div>
              )}
              {Array.from({ length: fullStars }, (_, i) => (
                <img key={`filled-${i}`} className="text-brand-01" src="images/icon/kid_star.svg" alt="filled start" width="16" height="16" />
              ))}

              {hasHalfStar && <img src="images/icon/kid_star_half_purple.svg" alt="" width="16" height="16" />}

              {Array.from({ length: emptyStars }, (_, i) => (
                <span key={`empty-${i}`} className="material-symbols-outlined fs-6 icon-fill" style={{ color: "#b6b4b4" }}>
                  kid_star
                </span>
              ))}
            </div>
            <p className="fs-7 text-center">{ratingStats.total_comment_count} 則評論</p>
          </div>
          <div className="col-lg-7">
            <ol className="ps-0 mb-0">
              {Object.keys(ratingStats.rating_distribute)
                .sort((a, b) => b - a)
                .map((rate) => (
                  <li className="f-between-center" key={rate}>
                    <p className="fs-7 me-3">{rate} 星</p>
                    <div className="progress flex-grow-1" style={{ height: "8px" }} role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                      <div className="progress-bar" style={{ width: `${(ratingStats.rating_distribute[rate] / ratingStats.total_comment_count) * 100}%` }}></div>
                    </div>
                    <p className="className=fs-7 text-gray-03">{ratingStats.rating_distribute[rate]}</p>
                  </li>
                ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}

CommentRatingStat.propTypes = {
  ratingStats: PropTypes.shape({
    average_rating: PropTypes.number.isRequired,
    total_comment_count: PropTypes.number.isRequired,
    rating_distribute: PropTypes.shape({
      1: PropTypes.number.isRequired,
      2: PropTypes.number.isRequired,
      3: PropTypes.number.isRequired,
      4: PropTypes.number.isRequired,
      5: PropTypes.number.isRequired,
    }).isRequired,
  }),
  isLoading: PropTypes.bool,
};
