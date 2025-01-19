import PropTypes from "prop-types";

export default function TutorBookingResume({ comment }) {
  return (
    <div className="col">
      <div className="student-comment-card card p-4 h-100">
        <div>
          <img
            src={comment.user.avatar}
            alt="profile"
            className="object-fit-cover rounded-circle me-4 avatar"
          />
        </div>
        <div className="flex-grow-1">
          <h6 className="mb-2 text-gray-01 fw-medium mb-1">
            {comment.user.name}
          </h6>
          <p className="comment-details mb-1">{comment.content}</p>
          <p className="timestamp text-gray-03 fs-7 mt-auto">{comment.time}</p>
        </div>
      </div>
    </div>
  );
}
TutorBookingResume.propTypes = {
  comment: PropTypes.object.isRequired,
};
