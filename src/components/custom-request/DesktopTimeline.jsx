import { useMemo } from "react";

import PropTypes from "prop-types";

const formatDate = (date) => {
  return date.toLocaleDateString("zh-TW", {
    month: "2-digit",
    day: "2-digit",
  });
};

export default function DesktopTimeline({ customCourseList = [] }) {
  const isMobile = window.innerWidth <= 576;

  // 桌機版時間軸
  const desktopTimeline = useMemo(() => {
    if (customCourseList.length === 0) return null;
  
    const shownDates = new Set();
    let dateIndex = 0; // 控制日期點的位置計算
  
    return customCourseList.map((customCourse) => {
      const dateOnly = formatDate(new Date(customCourse.createdAt));
      if (shownDates.has(dateOnly)) return null;
      shownDates.add(dateOnly);
  
      const left = dateIndex * (416 - 50); // 用顯示日期的次數當位置
      dateIndex++; // 下一個日期 +1
  
      return (
        <div
          key={customCourse.id}
          className="timeline-point"
          style={{ left: `${left}px` }}
        >
          {dateOnly}
        </div>
      );
    });
  }, [customCourseList]);
  
  

  return (
    <div className="timeline-container">{!isMobile && desktopTimeline}</div>
  );
}

DesktopTimeline.propTypes = {
  customCourseList: PropTypes.array,
};
