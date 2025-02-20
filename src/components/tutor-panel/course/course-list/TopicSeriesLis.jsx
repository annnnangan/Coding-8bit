import { NavLink } from "react-router-dom";

export default function TopicSeriesList({course}) {
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
            <span className="position-absolute py-1 px-2 me-12 rounded-1 fs-7 related-video-duration">
              {course.duration}
            </span>
          </div>
        </td>
        <td>{course.title}</td>
        <td>{course.category}</td>
        <td>{course.isPublic ? "公開" : "未公開"}</td>
        <td>2024年12月1日</td>
        <td>{Number(course.view_count).toLocaleString()}</td>
        <td>{course.rating}</td>
        <td>
          <div>
            <NavLink
              to={`/tutor-panel/course/topicSeries/${course.id}/chapter`}
              className="btn link-brand-03 border-0 d-inline-flex f-align-center p-0"
            >
              <span className="material-symbols-outlined me-1">dataset</span>
              詳細
            </NavLink>
            <button
              type="button"
              className="btn link-danger border-0 f-align-center p-0 mt-1"
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
