// 課程語言類別
export const categories = [
  { id: 1, name: "HTML / CSS" },
  { id: 2, name: "JavaScript" },
  { id: 3, name: "React" },
  { id: 4, name: "Vue" },
  { id: 5, name: "UI / UX" },
  { id: 6, name: "Python" },
  { id: 7, name: "Node.js" },
  { id: 8, name: "AI" },
  { id: 9, name: "其他" },
];

// 課程類別資料物件
export const categoryData = [
  {
    id: "1",
    title: "主題式系列課程影片",
    firstDescription: "由專業講師自行規劃，",
    secDescription: "為單一主題的系列課程影片，具有連貫性。",
    image: "images/deco/Illustration-11.svg",
    video_type: "topicSeries",
  },
  {
    id: "2",
    title: "客製化學習需求影片",
    firstDescription: "學生於客製化許願頁面提出學習需求，",
    secDescription: "再由講師專為解決此需求而錄製，為成果導向的教學影片。",
    image: "images/deco/Illustration-12.svg",
    video_type: "customLearning",
  },
  {
    id: "3",
    title: "實用技術短影片",
    firstDescription: "免費會員也可以自由觀看。",
    secDescription: "由專業講師錄製，影片時長較短，一支影片會進行一個小技術的教學。",
    image: "images/deco/Illustration-13.svg",
    video_type: "freeTipShorts",
  },
];

// 熱門課程資料物件
export const hotCoursesData = [
  {
    id: "1",
    title: "ChatGPT API 串接與應用",
    video_url: "/course/7d663a90-6306-4d41-bf4a-d2be6053a145",
    description: "從零開始學習 OpenAI API 的應用",
    image: "https://raw.githubusercontent.com/ahmomoz/8bit-image-data/refs/heads/main/8bit-image/chapter/course1-chpater-0.png",
    tag: "快速入門",
  },
  {
    id: "2",
    title: "Vue 高效開發實戰",
    video_url: "/course/e156dfe0-a317-4389-ba74-5f3c1cf9d241",
    description: "深入探索 Vue.js 的進階應用",
    image: "https://raw.githubusercontent.com/ahmomoz/8bit-image-data/refs/heads/main/8bit-image/course-10.png",
    tag: "必備課程",
  },
  {
    id: "3",
    title: "UI/UX 設計基礎",
    video_url: "/course/bcbf797a-c49a-47f0-afb4-b4f128565dec",
    description: "學習視覺層次、色彩搭配與使用者體驗優化",
    image: "https://raw.githubusercontent.com/ahmomoz/8bit-image-data/refs/heads/main/8bit-image/course-11.png",
    tag: "真材實料",
  },
  {
    id: "4",
    title: "Nuxt 3 實戰",
    video_url: "/course/4d434500-855b-4a83-b44a-d5f37e31487b",
    description: "學習 Nuxt 3 的核心概念與專案結構",
    image: "https://raw.githubusercontent.com/ahmomoz/8bit-image-data/refs/heads/main/8bit-image/course-13.png",
    tag: "Vue 工程師必備",
  },
];

// 學生後台資料物件
export const dashboardContinueToWatchCourseList = [
  {
    id: "1",
    cover_image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "topicSeries",
    title: "React 進階開發技巧",
    Tutor:{
      User:{
        username:"卡斯伯Casper",
      }
    },
    duration: 36,
    view_count: 12345,
    rating: "4",
    learning_progress_in_percent: 10,
  },
  {
    id: "2",
    cover_image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1355&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "topicSeries",
    title: "Web 開發實戰",
    Tutor:{
      User:{
        username:"Peter Fan",
      }
    },
    duration: 3.2,
    view_count: 402,
    rating: "4",
    learning_progress_in_percent: 80,
  },
  {
    id: "3",
    cover_image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=1406&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "topicSeries",
    title: "數據分析技巧",
    Tutor:{
      User:{
        username:"Neko Meow",
      }
    },
    duration: 1.2,
    view_count: 48,
    rating: "4",
    learning_progress_in_percent: 34,
  },
];

export const dashboardRecommendCourseList = [
  {
    id: "4",
    cover_image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "topicSeries",
    title: "移動應用開發",
    Tutor:{
      User:{
        username:"momomo",
      }
    },
    duration: 36,
    view_count: 798,
    rating: "3.8",
  },
  {
    id: "5",
    cover_image: "https://plus.unsplash.com/premium_photo-1682124651258-410b25fa9dc0?q=80&w=1621&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "topicSeries",
    title: "機器學習導論",
    Tutor:{
      User:{
        username:"Tina Chan",
      }
    },
    duration: 3.2,
    view_count: 402,
    rating: "4.5",  
  },
  {
    id: "6",
    cover_image: "https://plus.unsplash.com/premium_photo-1674506654010-22677db35bdf?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "topicSeries",
    title: "網路安全基礎",
    Tutor:{
      User:{
        username:"Anna Wu",
      }
    },
    duration: 1.8,
    view_count: 48,
    rating: "4",
  },
];
