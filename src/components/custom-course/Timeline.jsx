import { Fragment } from "react";

import PropTypes from "prop-types";

import { utils } from "./utils";
import Card from "./Card";

export default function Timeline({customCourseList=[]}) {
  const isMobile = window.innerWidth <= 576;

  return (
    <div className="timeline-container">
      {isMobile ? (
        customCourseList.map((customCourse, index) => {
          const date = utils.formatOnlyDate(new Date(customCourse.date));
          const showDate = index === 0 || date !== utils.formatOnlyDate(new Date(customCourseList[index - 1].date));

          return (
            <Fragment key={customCourse.id}>
              {showDate && <div className="timeline-point">{date}</div>}
              <Card customCourse={customCourse} />
            </Fragment>
          );
        })
      ) : (
        customCourseList.map((customCourse) => (
          <div
            key={customCourse.id}
            className="timeline-point"
            style={{ left: `${customCourse.offsetLeft}px` }}
          >
            {utils.formatDate(new Date(customCourse.date))}
          </div>
        ))
      )}
    </div>
  )
}

Timeline.propTypes = {
  customCourseList: PropTypes.array,
};
