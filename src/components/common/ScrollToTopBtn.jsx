// 按下就可跳轉到最上方的懸浮右下角按紐
export default function ScrollToTopBtn() {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <a href="#" onClick={scrollToTop}>
      <img
        className="scroll-to-top-btn"
        src="src/assets/images/icon/icons-to-top.png"
        alt="to-top-btn-image"
      />
    </a>
  );
}
