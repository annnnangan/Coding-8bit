import { useRef, useEffect } from "react";

import PropTypes from "prop-types";

export default function ScrollBtn({ containerRef }) {
  const leftButtonRef = useRef(null);
  const rightButtonRef = useRef(null);

  // 滾動相關功能
  const handleScroll = (direction) => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({
      left: direction === "left" ? -200 : 200,
      behavior: "smooth",
    });
  };

  const addScrollFunctionality = () => {
    const wishPool = containerRef.current;
    if (!wishPool) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    // 滑鼠橫向滾動功能
    const handleWheel = (e) => {
      if (window.innerWidth > 576) {
        e.preventDefault();
        wishPool.scrollLeft += e.deltaY;
      }
    };

    // 滑鼠拖動功能
    const handleMouseDown = (e) => {
      isDown = true;
      wishPool.style.cursor = "grabbing";
      startX = e.pageX - wishPool.offsetLeft;
      scrollLeft = wishPool.scrollLeft;
    };

    const handleMouseLeaveOrUp = () => {
      isDown = false;
      wishPool.style.cursor = "grab";
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - wishPool.offsetLeft;
      const walk = (x - startX) * 2; // 加速拖動速度
      wishPool.scrollLeft = scrollLeft - walk;
    };

    wishPool.addEventListener("wheel", handleWheel);
    wishPool.addEventListener("mousedown", handleMouseDown);
    wishPool.addEventListener("mouseleave", handleMouseLeaveOrUp);
    wishPool.addEventListener("mouseup", handleMouseLeaveOrUp);
    wishPool.addEventListener("mousemove", handleMouseMove);

    return () => {
      // 清除事件監聽
      wishPool.removeEventListener("wheel", handleWheel);
      wishPool.removeEventListener("mousedown", handleMouseDown);
      wishPool.removeEventListener("mouseleave", handleMouseLeaveOrUp);
      wishPool.removeEventListener("mouseup", handleMouseLeaveOrUp);
      wishPool.removeEventListener("mousemove", handleMouseMove);
    };
  };

  const updateScrollButtonVisibility = () => {
    const wishPool = containerRef.current;
    const leftButton = leftButtonRef.current;
    const rightButton = rightButtonRef.current;

    if (!wishPool || !leftButton || !rightButton) return;

    if (window.innerWidth <= 576) {
      leftButton.style.display = "none";
      rightButton.style.display = "none";
    } else {
      leftButton.style.display = "";
      rightButton.style.display = "";

      const canScrollLeft = wishPool.scrollLeft > 0;
      const canScrollRight =
        wishPool.scrollLeft < wishPool.scrollWidth - wishPool.clientWidth;

      leftButton.disabled = !canScrollLeft;
      rightButton.disabled = !canScrollRight;
    }
  };

  useEffect(() => {
    // 增加滑鼠拖動和滾動功能
    const cleanupScrollEvents = addScrollFunctionality();

    // 初次渲染時更新按鈕顯示狀態
    updateScrollButtonVisibility();

    // 畫面大小變化時更新按鈕顯示狀態
    window.addEventListener("resize", updateScrollButtonVisibility);

    return () => {
      // 清理事件
      cleanupScrollEvents();
      window.removeEventListener("resize", updateScrollButtonVisibility);
    };
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const handleScroll = () => updateScrollButtonVisibility();
      containerRef.current.addEventListener("scroll", handleScroll);

      return () => {
        if (containerRef.current) {
          containerRef.current.removeEventListener("scroll", handleScroll);
        }
      };
    }
  }, []);

  return (
    <div className="navigationArrows d-none d-lg-flex">
      <button
        type="button"
        className="circle left-btn border-0"
        ref={leftButtonRef}
        onClick={() => handleScroll("left")}
      >
        <span className="material-symbols-outlined icon-fill">arrow_back</span>
      </button>
      <button
        type="button"
        className="circle right-btn border-0"
        ref={rightButtonRef}
        onClick={() => handleScroll("right")}
      >
        <span className="material-symbols-outlined icon-fill">
          arrow_forward
        </span>
      </button>
    </div>
  );
}

ScrollBtn.propTypes = {
  containerRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }).isRequired,
};
