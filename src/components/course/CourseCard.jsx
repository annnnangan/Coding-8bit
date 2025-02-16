import { NavLink } from "react-router-dom";

const courseCategoryMap = {
  topicSeries: "主題式課程影片",
  customLearning: "客製化學習需求影片",
  freeTipShorts: "實用技術短影片",
};

import PropTypes from "prop-types";

export default function CourseCard({ course }) {
  return (
    <NavLink to={`/course/${course.id}`} className="course-card card-column">
      <div className="card gradient-border img-hover-enlarge p-lg-6 p-4 h-100">
        <div className="overflow-hidden img-wrapper rounded position-relative">
          <img
            src={course.thumbnail}
            className="card-img-top cover-img rounded"
            alt="course-image"
            style={{
              width: "100%",
              aspectRatio: "3 / 2",
              objectFit: "cover",
            }}
          />
        </div>
        <span className="course-category-tag bg-brand-02 text-brand-03 position-absolute start-0">{courseCategoryMap[course.category]}</span>

        <div className="card-body p-0 mt-3 mt-lg-4 f-column-between">
          <div>
            <h3 className="card-title fs-6 fs-lg-5">{course.title}</h3>
            <p className="card-text fs-7 fs-lg-6 mt-1 mt-lg-2">{course.tutor}</p>
          </div>
          <div className="f-between-center">
            <div className="f-align-center mt-1 mt-lg-2">
              <div className="f-center">
                <span className="material-symbols-outlined fs-5 me-1">schedule</span>
                <p className="fs-7 fs-lg-6">{course.duration}</p>
              </div>
              <div className="f-center ms-2">
                <span className="material-symbols-outlined fs-5 me-1">group</span>
                <p className="fs-7 fs-lg-6">{Number(course.view_count).toLocaleString()}</p>
              </div>
            </div>
            <p className="f-center text-brand-03 fs-7 fs-lg-6">
              <span className="material-symbols-outlined icon-fill text-brand-01 fs-6 fs-lg-5 me-1">kid_star</span>
              {course.rating}
            </p>
          </div>
          {course.learning_progress_in_percent && (
            <div className="f-center mt-3">
              <div
                className="progress"
                role="progressbar"
                aria-label="Learning Progress"
                aria-valuenow={course.learning_progress_in_percent}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ height: `8px`, width: "100%" }}
              >
                <div className="progress-bar" style={{ width: `${course.learning_progress_in_percent}%` }}></div>
              </div>
              <p className="ms-3 fs-7 text-gray-02">{course.learning_progress_in_percent}%</p>
            </div>
          )}
        </div>
      </div>
    </NavLink>
  );
}

CourseCard.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    category: PropTypes.oneOf(["topicSeries", "customLearning", "freeTipShorts"]).isRequired,
    title: PropTypes.string.isRequired,
    tutor: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    view_count: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    learning_progress_in_percent: PropTypes.string,
  }),
};
