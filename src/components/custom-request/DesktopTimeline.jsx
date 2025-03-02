import { useMemo } from "react";

import PropTypes from "prop-types";

import { utils } from "./utils";

export default function DesktopTimeline({ customCourseList = [] }) {
  const isMobile = window.innerWidth <= 576;

  // 桌機版時間軸
  const desktopTimeline = useMemo(() => {
    if (customCourseList.length === 0) return null;

    return customCourseList.map((customCourse, index) => {
      const topOffsetLeft = index * (416 - 50); // 每張卡片的間距為 416 (寬度) + 50px (間隔)
      const bottomOffsetLeft = index * 208 - 100;

      if (index % 2 === 0) {
        return (
          <div
            key={customCourse.id}
            className="timeline-point"
            style={{ left: `${topOffsetLeft}px` }}
          >
            {utils.formatDate(new Date(customCourse.createdAt))}
          </div>
        );
      } else {
        return (
          <div
            key={customCourse.id}
            className="timeline-point"
            style={{ left: `${bottomOffsetLeft}px` }}
          >
            {utils.formatDate(new Date(customCourse.createdAt))}
          </div>
        );
      }
    });
  }, [customCourseList]);

  return (
    <div className="timeline-container">{!isMobile && desktopTimeline}</div>
  );
}

DesktopTimeline.propTypes = {
  customCourseList: PropTypes.array,
};
