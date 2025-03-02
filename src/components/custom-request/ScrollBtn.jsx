import { useRef, useEffect } from "react";

import PropTypes from "prop-types";

export default function ScrollBtn({ containerRef, setLimit }) {
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

  const debounceTimeoutRef = useRef(null); // 用來儲存計時器 ID
  const coolDownTime = 5000; // 設置冷卻時間

  const updateScrollButtonVisibility = () => {
    const wishPool = containerRef.current;
    const leftButton = leftButtonRef.current;
    const rightButton = rightButtonRef.current;
  
    if (!wishPool || !leftButton || !rightButton) return;
  
    // 手機尺寸（小於等於576px）
    if (window.innerWidth <= 576) {
      leftButton.style.display = "none";
      rightButton.style.display = "none";
  
      const canScrollDown =
        wishPool.scrollTop + wishPool.clientHeight < wishPool.scrollHeight;
  
      // 滑動到底部觸發 setLimit
      if (wishPool.scrollHeight > wishPool.clientHeight) {
        if (!canScrollDown && !debounceTimeoutRef.current) {
          // 執行 setLimit，並設置冷卻時間
          setLimit((prev) => prev + 6);
  
          // 設置計時器，3秒後清除冷卻期
          debounceTimeoutRef.current = setTimeout(() => {
            debounceTimeoutRef.current = null; // 清除冷卻期
          }, coolDownTime);
        }
      }
    } else {
      // 桌面版
      leftButton.style.display = "";
      rightButton.style.display = "";
  
      const canScrollLeft = wishPool.scrollLeft > 0;
      const canScrollRight =
        wishPool.scrollLeft + wishPool.clientWidth < wishPool.scrollWidth;
  
      leftButton.disabled = !canScrollLeft;
      rightButton.disabled = !canScrollRight;
  
      // 滑到最右邊觸發取得更多筆需求卡片
      if (wishPool.scrollWidth > wishPool.clientWidth) {
        // 當滑動到底並且沒有觸發過（防止多次觸發）
        if (!canScrollRight && !debounceTimeoutRef.current) {
          // 執行 setLimit，並設置冷卻時間
          setLimit((prev) => prev + 6);
  
          // 設置計時器
          debounceTimeoutRef.current = setTimeout(() => {
            debounceTimeoutRef.current = null; // 清除冷卻期
          }, coolDownTime);
        }
      }
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
  setLimit: PropTypes.func.isRequired,
};
