import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginCheck, getUserData } from "@/store/slice/authSlice";
import { Helmet } from "react-helmet-async";

import { Modal } from "bootstrap";
import Swal from "sweetalert2";

import customRequestsApi from "@/api/customRequestsApi";

import Card from "@/components/custom-request/Card";
import DesktopTimeline from "@/components/custom-request/DesktopTimeline";
import ScrollBtn from "@/components/custom-request/ScrollBtn";
import CardModal from "@/components/custom-request/CardModal";
import TransparentLoader from "@/components/common/TransparentLoader";

import { categories } from "@/data/courses";

export default function CustomRequestsList() {
  // loading
  const [loadingState, setLoadingState] = useState(true);

  const isMobile = window.innerWidth <= 576;

  const containerRef = useRef(null);

  // 返回上一頁
  const navigate = useNavigate();
  const toPrevPage = () => {
    navigate(-1);
  };

  // 前往新增需求頁面按鈕
  const toAddLearningNeedPage = () => {
    if (
      userData.id &&
      !userData.subscriptions
        .filter((item) => item.plan_name === "premium")
        .filter((item) => item.status === "active").length > 0
    ) {
      Swal.fire({
        title: "成為高級會員後即可提出客製化學習需求唷",
        showCancelButton: true,
        confirmButtonText: "前往訂閱頁面",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/subscription-list");
        }
      });
    } else if (
      userData.id &&
      userData.subscriptions
        .filter((item) => item.plan_name === "premium")
        .filter((item) => item.status === "active").length > 0
    ) {
      navigate("/add-learning-need");
    } else if (!userData.id) {
      Swal.fire({
        title: "請先登入",
        showCancelButton: true,
        confirmButtonText: "前往登入頁面",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };

  // 搜尋與篩選功能
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("DESC");
  const [filterCategory, setFilterCategory] = useState("請選擇類別");
  const [limit, setLimit] = useState(8);

  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const sanitizedSearch = e.target.value.trim();
      setSearch(sanitizedSearch);
    }
  };

  // 初始化 - 取得資料
  const [customCourseList, setCustomCourseList] = useState([]);
  useEffect(() => {
    const getData = async () => {
      setLoadingState(true);
      try {
        const result = await customRequestsApi.getAllCustomRequests(
          sortBy,
          order,
          search,
          limit
        );
        setCustomCourseList(result.requests);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "取得資料失敗",
          text: error?.response?.data?.message,
        });
      } finally {
        setLoadingState(false);
      }
    };

    getData();
  }, [sortBy, order, search, limit]);

  /* -------------------------------------- header & footer START ---------------------------------------- */
  // header & footer 變化
  const [isFooterHidden, setIsFooterHidden] = useState(false);
  const mainContentRef = useRef(null);
  const headerRef = useRef(null);
  const footerRef = useRef(null);

  // 滾動按鈕顯示狀態更新
  const updateScrollButtonVisibility = useCallback(() => {
    if (!containerRef.current) return;
  }, []);

  // 調整內容區域的 padding
  const adjustMainContentPadding = useCallback(() => {
    if (!mainContentRef.current || !headerRef.current || !footerRef.current)
      return;

    const headerHeight = headerRef.current.offsetHeight || 0;
    const footerHeight = footerRef.current.offsetHeight || 0;

    mainContentRef.current.style.paddingTop = `${headerHeight}px`;
    mainContentRef.current.style.paddingBottom = `${footerHeight}px`;
  }, []);

  // 卡片隨機擺放
  const applyRandomPositioning = useCallback(() => {
    if (window.innerWidth <= 576) return;

    const cards = document.querySelectorAll(".card-wrapper");
    const maxOffset = 20;

    cards.forEach((card) => {
      const [randomX, randomY] = [Math.random() - 0.5, Math.random() - 0.5].map(
        (n) => n * 2 * maxOffset
      );

      Object.assign(card.style, {
        position: "relative",
        left: `${randomX}px`,
        top: `${randomY}px`,
        transition: "all 0.5s ease",
      });
    });
  }, []);

  // 切換 Footer 顯示/隱藏
  const toggleFooter = () => {
    setIsFooterHidden((prev) => !prev);
  };

  // 監聽視窗大小變化
  useEffect(() => {
    window.addEventListener("resize", adjustMainContentPadding);
    return () => {
      window.removeEventListener("resize", adjustMainContentPadding);
    };
  }, [adjustMainContentPadding]);

  // 監聽 DOM 變化
  useEffect(() => {
    const observer = new MutationObserver(adjustMainContentPadding);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [adjustMainContentPadding]);

  // 更新 body 的 class
  useEffect(() => {
    if (isFooterHidden) {
      document.body.classList.add("footer-hidden");
    } else {
      document.body.classList.remove("footer-hidden");
    }
    adjustMainContentPadding();
  }, [isFooterHidden, adjustMainContentPadding]);

  useEffect(() => {
    function initWishPool() {
      applyRandomPositioning();
      setTimeout(applyRandomPositioning, 100);
      updateScrollButtonVisibility();
    }

    initWishPool();

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtonVisibility);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", updateScrollButtonVisibility);
      }
    };
  }, [customCourseList, applyRandomPositioning, updateScrollButtonVisibility]);

  /* -------------------------------------- header & footer END ---------------------------------------- */

  // modal
  const [temCustomCourse, setTemCustomCourse] = useState({});
  const myModal = useRef(null);
  const cardModalRef = useRef(null);
  const openModal = (course) => {
    myModal.current.show();
    setTemCustomCourse(course);
  };

  // 初始化 - 啟用 modal
  useEffect(() => {
    myModal.current = new Modal(cardModalRef.current);
  }, []);

  // 初始化 - 背景圖片
  useEffect(() => {
    document.body.classList.add("bg-custom-course");

    return () => {
      document.body.classList.remove("bg-custom-course");
    };
  }, []);

  // 取得使用者資料
  const dispatch = useDispatch();
  const { userData, isAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuth) {
      dispatch(getUserData());
    }
  }, [isAuth, dispatch]);

  useEffect(() => {
    const token =
      document.cookie.replace(
        /(?:(?:^|.*;\s*)authToken\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      ) || null;
    if (token) {
      dispatch(loginCheck());
    }
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Coding∞bit ｜ 客製化需求一覽</title>
      </Helmet>
      {loadingState && <TransparentLoader />}

      {/* header */}
      <header
        className="header-custom-course bg-white shadow-sm"
        ref={headerRef}
      >
        <div className="container">
          <nav className="py-3">
            <div className="d-flex flex-column flex-lg-row align-items-lg-center flex-wrap position-relative pe-lg-10 row-gap-4">
              {/* 導覽 & 搜尋框 */}
              <div className="d-flex align-items-center">
                <ScrollBtn containerRef={containerRef} setLimit={setLimit} />
                <div className="searchInput pe-10">
                  <input
                    type="search"
                    name="courseSearch"
                    className="form-control search-course border-1 border-gray-03"
                    placeholder="搜尋課程需求"
                    onKeyDown={handleSearch}
                  />
                </div>
              </div>
              {/* 下拉霸 */}
              <div className="d-flex column-gap-4 pe-lg-6 order-lg-2 order-1 ms-xl-auto">
                <div className="dropdown dropdown-menu-end">
                  <button
                    className="btn btn-outline-brand-03 dropdown-toggle"
                    type="button"
                    id="sortDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {sortBy === "createdAt" &&
                      order !== "ASC" &&
                      "建立時間(新到舊)"}
                    {sortBy === "createdAt" &&
                      order === "ASC" &&
                      "建立時間(舊到新)"}
                  </button>
                  <ul
                    className="dropdown-menu mt-1"
                    aria-labelledby="sortDropdown"
                  >
                    <li>
                      <button
                        type="button"
                        className="dropdown-item"
                        onClick={() => {
                          setSortBy("createdAt");
                          setOrder("DESC");
                        }}
                      >
                        建立時間(新到舊)
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="dropdown-item"
                        onClick={() => {
                          setSortBy("createdAt");
                          setOrder("ASC");
                        }}
                      >
                        建立時間(舊到新)
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="dropdown dropdown-menu-end">
                  <button
                    className="btn btn-outline-brand-03 dropdown-toggle"
                    type="button"
                    id="formatDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {filterCategory}
                  </button>
                  <div
                    className="dropdown-menu p-0 mt-1"
                    aria-labelledby="formatDropdown"
                    style={{ width: "250px" }}
                  >
                    {/* <div className="px-3 py-2">
                      <input
                        type="text"
                        className="form-control form-control-sm mt-1"
                        id="tagSearch"
                        placeholder="搜尋標籤..."
                      />
                    </div> */}
                    <div className="tag-list-container py-1">
                      <ul className="list-unstyled mb-0" id="tagList">
                        <li
                          className="dropdown-item"
                          onClick={() => {
                            setSearch("");
                            setFilterCategory("選擇類別");
                          }}
                        >
                          全部
                        </li>
                        {categories.map((category) => (
                          <li
                            className="dropdown-item"
                            key={category.id}
                            onClick={() => {
                              setSearch(category.name);
                              setFilterCategory(category.name);
                            }}
                          >
                            {category.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* 回上一頁 */}
              <button
                className="position-absolute border-0 end-0 top-0 btn p-2"
                onClick={toPrevPage}
              >
                <span
                  className="material-symbols-outlined icon-fill"
                  style={{ width: "28px", height: "28px" }}
                >
                  close
                </span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      <main className="main-content" ref={mainContentRef}>
        {/* wish-pool*/}
        <section className="custom-course-wishPool">
          <div className="wishPool-container" ref={containerRef}>
            <div className="cards-container">
              {/* 客製化需求卡片 */}
              {isMobile ? (
                customCourseList.map((customCourse, index) => (
                  <Card
                    key={customCourse.id}
                    customCourse={customCourse}
                    openModal={() => {
                      openModal(customCourse);
                    }}
                    prevCourse={customCourseList[index - 1]}
                  />
                ))
              ) : (
                <>
                  <div className="card_row">
                    {customCourseList
                      .filter((_, index) => index % 2 === 0)
                      .map((customCourse) => (
                        <Card
                          key={customCourse.id}
                          customCourse={customCourse}
                          openModal={() => {
                            openModal(customCourse);
                          }}
                        />
                      ))}
                  </div>
                  <div className="card_row">
                    {customCourseList
                      .filter((_, index) => index % 2 !== 0)
                      .map((customCourse) => (
                        <Card
                          key={customCourse.id}
                          customCourse={customCourse}
                          openModal={() => {
                            openModal(customCourse);
                          }}
                        />
                      ))}
                  </div>
                </>
              )}
            </div>
            {/* 時間點 */}
            <DesktopTimeline customCourseList={customCourseList} />
          </div>
        </section>

        <section className="time-line mt-auto">
          <div className="bg-brand-01" style={{ height: "8px" }}></div>
        </section>
      </main>

      {/* footer-learning-needs */}
      <footer className="footer-learning-needs" ref={footerRef}>
        <button
          className="footer-toggle"
          aria-label={isFooterHidden ? "顯示 Footer" : "隱藏 Footer"}
          onClick={toggleFooter}
        >
          <span className="material-symbols-outlined">
            {isFooterHidden ? "expand_less" : "expand_more"}
          </span>
        </button>
        <div className="container">
          <div className="banner">
            <div className="banner-text">
              <h1 className="title display-1">
                學習，
                <br />
                不再受侷限。
              </h1>
              <p className="subtitle text-brand-03">大膽提出你的學習需求</p>
            </div>
            <div className="d-flex flex-column align-items-center">
              <button
                className="add-button"
                aria-label="提出學習需求"
                onClick={toAddLearningNeedPage}
              >
                <span className="add-icon material-symbols-outlined icon-fill">
                  add
                </span>
              </button>
              <span className="fs-md-5 fs-6 text-gray-02 d-block mt-2">
                提出學習需求
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* 學習需求卡片 Modal */}
      <CardModal
        temCustomCourse={temCustomCourse}
        cardModalRef={cardModalRef}
        setLoadingState={setLoadingState}
      />
    </>
  );
}
