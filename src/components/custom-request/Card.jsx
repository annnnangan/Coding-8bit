import { useMemo } from "react";

import PropTypes from "prop-types";
import DOMPurify from "dompurify";

import { utils } from "./utils";

export default function Card({ customCourse = {}, openModal, prevCourse }) {
  const isMobile = window.innerWidth <= 576;

  // 移除底色
  const cleanContent = DOMPurify.sanitize(customCourse?.content).replace(
    /style=["'][^"']*background[^"']*["']/gi, 
    ""
  );

  // 判斷是否為當天的第一個 Card（只顯示一次日期）
  const isFirstOfDate =
    !prevCourse ||
    utils.formatOnlyDate(new Date(customCourse.createdAt)) !==
      utils.formatOnlyDate(new Date(prevCourse.createdAt));

  const mobileTimeline = useMemo(() => {
    const date = utils.formatOnlyDate(new Date(customCourse.createdAt));
    return isFirstOfDate ? (
      <div className="timeline-point">
        <span className="date">{date}</span>
      </div>
    ) : null;
  }, [customCourse, isFirstOfDate]);

  return (
    <>
      <div
        className="card-wrapper"
        data-date={customCourse.createdAt}
        data-card-id={customCourse.id}
        onClick={openModal}
      >
        {isMobile && mobileTimeline}
        <div className="card-back">
          <span className="category">{customCourse.category}</span>
          <div className="response-count">
            <span className="material-symbols-outlined">comment</span>
            <span>{customCourse.response_count}</span>
          </div>
        </div>
        <div className="card-front">
          <div className="card-content">
            <div className="card-title">
              {customCourse.isCompleted && (
                <span className="material-symbols-outlined icon-fill text-brand-03">
                  check_circle
                </span>
              )}
              <h2>{customCourse.title}</h2>
            </div>
            <p className="domPurify-wrap" dangerouslySetInnerHTML={{ __html: cleanContent }}></p>
          </div>
        </div>
      </div>
    </>
  );
}

Card.propTypes = {
  customCourse: PropTypes.object,
  openModal: PropTypes.func,
  prevCourse: PropTypes.object,
};
