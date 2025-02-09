import { useState } from "react";

import PropTypes from "prop-types";

export default function ShowMoreBtn({ text, initialShow = false }) {
  const [isShow, setIsShow] = useState(initialShow);

  const handleClick = () => {
    setIsShow((prevIsShow) => !prevIsShow);
  };

  return (
    <>
      <p className={`tab-details ${isShow ? "" : "text-hide"}`}>{text}</p>
      <div
        className="d-flex align-items-center py-3 show-more"
        role="button"
        data-show={isShow}
        onClick={handleClick}
      >
        <p className="text-brand-03">{isShow ? "更少" : "更多"}</p>
        <span className="material-symbols-outlined icon-fill text-brand-03 align-middle">
          {isShow ? "keyboard_arrow_up" : "expand_more"}
        </span>
      </div>
    </>
  );
}
ShowMoreBtn.propTypes = {
  text: PropTypes.string,
  initialShow: PropTypes.bool,
};
