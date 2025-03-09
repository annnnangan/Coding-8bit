// FAQ 資料
export const faqData = [
  {
    id: 1,
    question: "如何預約一對一的課程？",
    answer: "付費訂閱後前往講師預約頁面，選擇講師及可預約時段，完成付款手續即可。",
  },
  {
    id: 2,
    question: "是否可以選擇我喜歡的講師？",
    answer: "可以，使用者可根據自己的需求選擇講師，並預約他們的空閒時間。",
  },
  {
    id: 3,
    question: "課程是否支援離線觀看？",
    answer: "目前課程僅提供線上觀看服務，但我們正在規劃離線下載的功能，敬請期待。",
  },
  {
    id: 4,
    question: "觀看課程要付費嗎？",
    answer:
      "註冊免費會員可以觀看免費影片，訂閱基本會員或高級會員則可以不限次數、不限時間，觀看所有類型的課程影片。",
  },
];

// 聯絡資訊
export const contactInfo = [
  {
    id: 1,
    icon: "call",
    title: "電話",
    content: (
      <a href="tel:+021234-5678" className="underline-hover d-inline-block">
        (02) 1234-5678
      </a>
    ),
  },
  {
    id: 2,
    icon: "mail",
    title: "信箱",
    content: (
      <a
        href="mailto:coding8bit@gmail.com"
        className="underline-hover d-inline-block"
      >
        coding8bit@gmail.com
      </a>
    ),
  },
  {
    id: 3,
    icon: "pin_drop",
    title: "地址",
    content: "100 台北市中正區重慶南路一段102號",
  },
];

export const socialLinks = [
  {
    id: 1,
    href: "#",
    iconSrc: "images/icon/icon-ins-purple.svg",
    altText: "Instagram icon",
  },
  {
    id: 2,
    href: "#",
    iconSrc: "images/icon/icon-facebook-purple.svg",
    altText: "Facebook icon",
  },
];