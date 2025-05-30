import PropTypes from "prop-types";
import { formatDateDash } from "@/utils/timeFormatted-utils";

export default function CommentCard({ comment, isLoading = false }) {
  return (
    <div className="col">
      <div className="student-comment-card card p-4 h-100">
        {isLoading ? (
          // Loading Skeleton
          <div className="d-flex w-100">
            <div className="placeholder-glow">
              <span
                className="placeholder rounded-circle bg-brand-02 me-4"
                style={{ width: "48px", height: "48px" }}
              ></span>
            </div>

            <div
              className="placeholder-glow d-flex flex-column flex-grow-1"
              style={{ width: "80%" }}
            >
              <span className="placeholder bg-brand-02 w-50 mb-1"></span>
              <span className="placeholder bg-brand-02 w-75 mb-1"></span>
              <span className="placeholder bg-brand-02 w-75 mt-auto"></span>
            </div>
          </div>
        ) : (
          // Content
          <div className="d-flex">
            <div className="flex-shrink-0">
              <img
                src={comment?.avatar_url}
                alt="profile"
                className="object-fit-cover rounded-circle me-4 avatar"
                style={{ width: "48px", height: "48px" }}
              />
            </div>

            <div className="d-flex flex-column flex-grow-1">
              <h6 className="mb-2 text-gray-01 fw-medium">{comment?.username}</h6>
              <p className="comment-details mb-1">{comment?.comment}</p>
              <p className="timestamp text-gray-03 fs-7 mt-auto">
                {formatDateDash(comment?.comment_at)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

CommentCard.propTypes = {
  comment: PropTypes.shape({
    username: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    comment_at: PropTypes.string.isRequired,
  }),
  isLoading: PropTypes.bool,
};
