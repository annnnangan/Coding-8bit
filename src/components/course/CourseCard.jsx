import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

export default function CourseCard({ courseList, cardsNum = 3 }) {
  if (cardsNum === 2 || cardsNum === 3) {
    return (
      <>
        {courseList.map((course) => (
          <div className="col-md-6 col-xl-4" key={course.id}>
            <NavLink
              to={`/course/${course.id}`}
              className="course-card card-column"
            >
              <div className="card gradient-border img-hover-enlarge p-lg-6 p-4 h-100">
                <div className="overflow-hidden img-wrapper rounded position-relative">
                  <img
                    src={course.thumbnail}
                    className="card-img-top cover-img rounded"
                    alt="course-image"
                  />
                </div>
                <span className="course-category-tag opacity-75 position-absolute">
                  {course.category === "topicSeries" && "主題式課程影片"}
                  {course.category === "customLearning" && "客製化學習需求影片"}
                  {course.category === "freeTipShorts" && "實用技術短影片"}
                </span>
                <div className="card-body p-0 mt-3 mt-lg-4 f-column-between">
                  <div>
                    <h3 className="card-title fs-6 fs-lg-5">{course.title}</h3>
                    <p className="card-text fs-7 fs-lg-6 mt-1 mt-lg-2">
                      {course.tutor}
                    </p>
                  </div>
                  <div className="f-between-center">
                    <div className="f-align-center mt-1 mt-lg-2">
                      <div className="f-center">
                        <span className="material-symbols-outlined fs-5 me-1">
                          schedule
                        </span>
                        <p className="fs-7 fs-lg-6">{course.duration}</p>
                      </div>
                      <div className="f-center ms-2">
                        <span className="material-symbols-outlined fs-5 me-1">
                          group
                        </span>
                        <p className="fs-7 fs-lg-6">{course.view_count}</p>
                      </div>
                    </div>
                    <p className="f-center text-brand-03 fs-7 fs-lg-6">
                      <span className="material-symbols-outlined icon-fill text-brand-01 fs-6 fs-lg-5 me-1">
                        kid_star
                      </span>
                      {course.rating}
                    </p>
                  </div>
                </div>
              </div>
            </NavLink>
          </div>
        ))}
      </>
    );
  } else {
    return (
      <NavLink
        to={`/course/${courseList.id}`}
        className="course-card card-column"
      >
        <div className="card gradient-border img-hover-enlarge p-lg-6 p-4 h-100">
          <div className="overflow-hidden img-wrapper rounded position-relative">
            <img
              src={courseList.thumbnail}
              className="card-img-top cover-img rounded"
              alt="course-image"
            />
          </div>
          <span className="course-category-tag opacity-75 position-absolute">
            {courseList.category === "topicSeries" && "主題式課程影片"}
            {courseList.category === "customLearning" && "客製化學習需求影片"}
            {courseList.category === "freeTipShorts" && "實用技術短影片"}
          </span>
          <div className="card-body p-0 mt-3 mt-lg-4 f-column-between">
            <div>
              <h3 className="card-title fs-6 fs-lg-5">{courseList.title}</h3>
              <p className="card-text fs-7 fs-lg-6 mt-1 mt-lg-2">
                {courseList.tutor}
              </p>
            </div>
            <div className="f-between-center">
              <div className="f-align-center mt-1 mt-lg-2">
                <div className="f-center">
                  <span className="material-symbols-outlined fs-5 me-1">
                    schedule
                  </span>
                  <p className="fs-7 fs-lg-6">{courseList.duration}</p>
                </div>
                <div className="f-center ms-2">
                  <span className="material-symbols-outlined fs-5 me-1">
                    group
                  </span>
                  <p className="fs-7 fs-lg-6">{courseList.view_count}</p>
                </div>
              </div>
              <p className="f-center text-brand-03 fs-7 fs-lg-6">
                <span className="material-symbols-outlined icon-fill text-brand-01 fs-6 fs-lg-5 me-1">
                  kid_star
                </span>
                {courseList.rating}
              </p>
            </div>
          </div>
        </div>
      </NavLink>
    );
  }
}
CourseCard.propTypes = {
  courseList: PropTypes.oneOfType([
    PropTypes.array.isRequired,
    PropTypes.object.isRequired,
  ]),
  cardsNum: PropTypes.oneOf([1, 2, 3]),
};
