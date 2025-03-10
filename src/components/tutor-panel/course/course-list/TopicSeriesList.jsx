import { NavLink } from "react-router-dom";

import PropTypes from "prop-types";

import {
  convertSecondsToTime,
  formatDate,
} from "@/utils/timeFormatted-utils";

export default function TopicSeriesList({ course, deleteCourse }) {
  return (
    <tbody>
      <tr className="align-middle">
        <td>
          <div className="cover_image-wrap position-relative">
            <img
              src={course.cover_image}
              alt="course-image"
              className="w-100"
            />
            <span className="position-absolute py-1 px-2 rounded-1 fs-7 related-video-duration">
              {convertSecondsToTime(course.duration)}
            </span>
          </div>
        </td>
        <td>
          <NavLink
            to={`/course/${course.id}`}
            className="d-inline underline-hover"
          >
            {course.title}
          </NavLink>
        </td>
        <td>{course.category}</td>
        <td>{course.is_public ? "公開" : "未公開"}</td>
        <td>{formatDate(course.created_at)}</td>
        <td>{Number(course.view_count).toLocaleString()}</td>
        <td>{Number(course.rating).toFixed(1)}</td>
        <td>
          <div>
            <NavLink
              to={`/tutor-panel/course/topicSeries/${course.id}/edit`}
              className="btn link-brand-03 border-0 d-inline-flex f-align-center p-0"
            >
              <span className="material-symbols-outlined me-1">dataset</span>
              詳細
            </NavLink>
            <button
              type="button"
              className="btn link-danger border-0 f-align-center p-0 mt-1"
              onClick={() => deleteCourse(course.id, "topicSeries")}
            >
              <span className="material-symbols-outlined me-1">delete</span>
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  );
}
TopicSeriesList.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.string.isRequired,
    cover_image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired,
    view_count: PropTypes.number.isRequired,
    rating: PropTypes.string.isRequired,
    is_public: PropTypes.bool.isRequired,
  }).isRequired,
  deleteCourse: PropTypes.func.isRequired,
};
