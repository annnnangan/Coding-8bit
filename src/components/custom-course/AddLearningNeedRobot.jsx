// 新增學習需求小幫手懸浮按鈕
export default function AddLearningNeedRobot() {
  return (
    <>
      <div className="add-learning-need-bot-wrap">
        <img
          src="images/deco/bot-greeting.svg"
          alt="bot-greeting-image"
          className="bot-greeting"
        />
        <a
          href="#"
          className="add-learning-need-bot-btn"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
        >
          <img
            src="images/deco/addLearningNeedBot-sm.svg"
            alt="addLearningNeedBot-image"
          />
        </a>
      </div>
    </>
  );
}
