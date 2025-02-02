import PropTypes from "prop-types";

export default function Card({ customCourse={} }) {
  return (
    <div
      className="card-wrapper"
      data-date={customCourse.date}
      data-card-id={customCourse.id}
    >
      <div className="card-back">
        <span className="category">{customCourse.category}</span>
        <div className="response-count">
          <span className="material-symbols-outlined">comment</span>
          <span>{customCourse.responseCount}</span>
        </div>
      </div>
      <div className="card-front">
        <div className="card-content">
          <div className="card-title">
            <span className="material-symbols-outlined icon-fill text-brand-03">
              check_circle
            </span>
            <h2>{customCourse.title}</h2>
          </div>
          <p>{customCourse.content}</p>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  customCourse: PropTypes.object,
};
