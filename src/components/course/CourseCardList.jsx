import PropTypes from "prop-types";
import CourseCard from "./CourseCard";

export default function CourseCardList({ courseList, cardsNum = 3 }) {
  if (cardsNum === 2 || cardsNum === 3) {
    return (
      <>
        {courseList.map((course) => (
          <div className="col-md-6 col-xl-4" key={course.id}>
            <CourseCard course={course} />
          </div>
        ))}
      </>
    );
  } else {
    return <CourseCard course={courseList} />;
  }
}

CourseCardList.propTypes = {
  courseList: PropTypes.oneOfType([PropTypes.array.isRequired, PropTypes.object.isRequired]),
  cardsNum: PropTypes.oneOf([1, 2, 3]),
};
