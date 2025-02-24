import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import axios from "axios";

import courseApi from "../../../api/courseApi";
import CourseCardList from "../../../components/course/CourseCardList";
import ShowMoreButton from "../../../components/common/ShowMoreButton";
import Loader from "../../../components/common/Loader";

const { VITE_API_BASE_2 } = import.meta.env;

export default function TutorInfo() {
  // loading
  const [loadingState, setLoadingState] = useState(true);

  // 抓取路由上的 id 來取得遠端特定 id 的資料
  const { id } = useParams();

  const courseCategory = [
    {
      title: "主題式課程影片",
      category: "topicSeries",
    },
    {
      title: "客製化需求影片",
      category: "customLearning",
    },
    {
      title: "實用技術短影片",
      category: "freeTipShorts",
    },
  ];
  // 客製化課程區塊 Tab 切換邏輯
  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (event, index) => {
    event.preventDefault();
    setActiveTab(index);
  };

  // 篩選出跟當前講師同名的課程函式
  const filteredCourses = (courses, tutorResult) =>
    courses.filter((course) => {
      return course.tutor === tutorResult.data.name;
    });

  // 取得資料函式
  const [tutorList, setTutorList] = useState({
    skills: [],
    resume: { workExperience: [], education: [], certificates: [] },
    statistics: {},
  });
  const [courses, setCourses] = useState({
    topicSeries: [],
    customLearning: [],
    freeTipShorts: [],
  });
  const getData = async () => {
    setLoadingState(true);
    try {
      const tutorResult = await axios.get(`${VITE_API_BASE_2}/api/v1/tutors/${id}`);
      const topicSeriesCourses = await courseApi.getCourses("topicSeries");
      const customLearningCourses = await courseApi.getCourses("customLearning");
      const freeTipShortsCourses = await courseApi.getCourses("freeTipShorts");

      setTutorList(tutorResult.data);

      setCourses((prevCourses) => ({
        ...prevCourses,
        topicSeries: filteredCourses(topicSeriesCourses, tutorResult),
        customLearning: filteredCourses(customLearningCourses, tutorResult),
        freeTipShorts: filteredCourses(freeTipShortsCourses, tutorResult),
      }));
    } catch (error) {
      console.log("錯誤", error);
    } finally {
      setLoadingState(false);
    }
  };

  // 初始化 - 取得資料
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Helmet>
        <title>{tutorList?.name ? `${tutorList.name} ｜ 講師資訊` : "Coding∞bit ｜ 可預約講師一覽"}</title>
      </Helmet>
      {loadingState && <Loader />}
      <header className="tutor-info-header-section bg"></header>
      <main>
        <div className="container-fluid px-lg-13">
          <div className="row">
            <div className="col-xxl-3 f-column-align-center tutor-info-section">
              <div className="tutor-img-wrap">
                <img src={tutorList.avatar} className="rounded-circle w-100" alt="tutor-avatar" />
              </div>
              <div className="tutor-content-info px-6 mt-6 mt-lg-8">
                <div className="text-start">
                  <h1 className="fs-4 fs-lg-1">{tutorList.name}</h1>
                  <p className="fs-lg-5 fs-6 text-gray-02 mt-2">{tutorList.title}</p>
                  <div className="list-x-scroll py-2 mt-4">
                    {tutorList.skills.map((skill, index) => (
                      <a href="#" className="tag tag-brand-02 fs-8 me-3" key={index}>
                        {skill}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="tab-content mt-6" id="myTabContent">
                  <div className="tab-pane fade show active" id="about-me-tab-pane" role="tabpanel" aria-labelledby="about-me-tab" tabIndex="0">
                    <ShowMoreButton
                      text={
                        " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro iusto ratione autem minima repellat officia voluptatibus atque aliquid maiores unde enim repellendus, dignissimos expedita assumenda blanditiis mollitia provident! Quod, modi?"
                      }
                    />
                  </div>
                </div>
                <ul className="d-flex mt-6 mt-lg-8">
                  <li>
                    <a href="#" className="icon-hover">
                      <img src="images/icon/icon-ins-purple.svg" alt="icon-ins" />
                    </a>
                  </li>
                  <li className="ms-3">
                    <a href="#" className="icon-hover">
                      <img src="images/icon/icon-facebook-purple.svg" alt="icon-ins" />
                    </a>
                  </li>
                  <li className="ms-3">
                    <a href="#" className="icon-hover">
                      <img src="images/icon/icon-mail-purple.svg" alt="icon-ins" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xxl-9 pt-11 pb-13">
              <ul className="nav nav-tabs border-bottom border-gray-03" id="courseCategoryTab" role="tablist">
                {courseCategory.map((item, index) => (
                  <li className="nav-item" role="presentation" key={index}>
                    <button
                      className={`nav-link fs-7 fs-lg-6 p-2 py-lg-6 px-lg-4 ${index === activeTab && "active"}`}
                      id={`${item.category}-tab`}
                      data-bs-toggle="tab"
                      data-bs-target={`#${item.category}`}
                      type="button"
                      role="tab"
                      aria-controls={item.category}
                      aria-selected="true"
                      onClick={handleTabClick}
                    >
                      {item.title}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="tab-content" id="courseCategoryTab">
                {courseCategory.map((item, index) => (
                  <div className={`tab-pane ${index === activeTab ? "active show" : "fade"}`} id={item.category} role="tabpanel" aria-labelledby={`${item.category}-tab`} key={index}>
                    <div className="row mt-6 mt-lg-8 g-6">
                      {item.category === "topicSeries" && <CourseCardList courseList={courses.topicSeries} />}
                      {item.category === "customLearning" && <CourseCardList courseList={courses.customLearning} />}
                      {item.category === "freeTipShorts" && <CourseCardList courseList={courses.freeTipShorts} />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
