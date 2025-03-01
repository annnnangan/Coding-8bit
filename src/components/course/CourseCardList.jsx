import PropTypes from "prop-types";
import CourseCard from "./CourseCard";

export default function CourseCardList({
  courseList,
  cardsNum = 3,
  type = "courseDetail",
}) {
  if (cardsNum === 2 || cardsNum === 3) {
    return (
      <>
        {courseList.length > 0 ? (
          <>
            {courseList.map((course) => (
              <div className="col-md-6 col-xl-4" key={course.id}>
                <CourseCard course={course} type={type} />
              </div>
            ))}
          </>
        ) : (
          <p className="fs-5 fs-lg-4">目前此項目暫無課程</p>
        )}
      </>
    );
  } else {
    return <CourseCard course={courseList} type={type} />;
  }
}

CourseCardList.propTypes = {
  courseList: PropTypes.oneOfType([
    PropTypes.array.isRequired,
    PropTypes.object.isRequired,
  ]),
  cardsNum: PropTypes.oneOf([1, 2, 3]),
  type: PropTypes.oneOf(["courseDetail", "singleVideo"]),
};
