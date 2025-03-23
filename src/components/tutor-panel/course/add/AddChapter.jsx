import { useEffect, useState, useRef, useCallback } from "react";
import { Link, NavLink } from "react-router-dom";

import * as bootstrap from "bootstrap";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

import courseApi from "@/api/courseApi";

export default function AddChapter({ newCourseId, setLoadingState }) {
  const [temChapterList, setTemChapterList] = useState({});
  const [temChapterData, setTemChapterData] = useState({
    title: "",
  });

  // 取得章節資料
  const getChapter = useCallback(async () => {
    setLoadingState(true);
    try {
      const result = await courseApi.getCourseChapter(newCourseId);
      setTemChapterList(result);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response?.data?.message,
      });
    } finally {
      setLoadingState(false);
    }
  }, [newCourseId, setLoadingState]);

  // 新增章節
  const addChapter = async (data) => {
    if (temChapterData.title) {
      setLoadingState(true);
      try {
        await courseApi.addChapter(newCourseId, {
          ...data,
          sort_order: temChapterList.length + 1,
        });
        Swal.fire({
          icon: "success",
          title: "新增成功",
        });
        setTemChapterData({ title: "" });
        hideModal();
        getChapter();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: error.response?.data?.message,
        });
      } finally {
        setLoadingState(false);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "請輸入章節名稱",
      });
    }
  };

  // 刪除章節
  const deleteChapter = async (course_id, chapterId) => {
    Swal.fire({
      title: "確定要刪除嗎？",
      showCancelButton: true,
      confirmButtonText: "刪除",
      denyButtonText: "不要刪除",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoadingState(true);
        try {
          await courseApi.deleteChapter(course_id, chapterId);
          Swal.fire({
            icon: "success",
            title: "刪除成功",
          });
          getChapter();
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: error.response?.data?.message,
          });
        } finally {
          setLoadingState(false);
        }
      }
    });
  };

  // modal
  const myModal = useRef(null);
  const chapterModalRef = useRef(null);
  const openModal = () => {
    myModal.current.show();
  };
  const hideModal = () => {
    myModal.current.hide();
  };
  const handleChapterChange = (e) => {
    const name = e.target.name;
    setTemChapterData((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };

  // 初始化 - 啟用 modal
  useEffect(() => {
    myModal.current = new bootstrap.Modal(chapterModalRef.current);
  }, []);

  // 初始化 - 取得資料
  useEffect(() => {
    getChapter();
  }, [getChapter]);

  return (
    <div className="col-xxl-8">
      <div className="mt-6 mt-lg-8 px-lg-6">
        <h2 className="fs-6 fs-lg-5">課程章節</h2>
        <ul className="chapter-wrap mt-4">
          {temChapterList.length === 0 && (
            <li className="dashed-border text-center mt-4 mt-lg-6 py-4 py-lg-11">
              <p>目前尚無章節，請新增章節</p>
            </li>
          )}
          {temChapterList.length > 0 && (
            <>
              {temChapterList.map((chapter, index) => (
                <li
                  className={`chapter-item p-4 mt-2 ${
                    chapter?.Videos.length > 0 ? "bg-brand-02" : "dashed-border"
                  }`}
                  key={index}
                >
                  <div className="mt-2 mt-lg-0">
                    <p>{index === 0 ? `開場影片` : `第 ${index} 章`}</p>
                  </div>

                  {chapter?.Videos.length > 0 ? (
                    <>
                      <div className="chapter-content mt-2">
                        <img
                          src={chapter.Videos[0].cover_image}
                          alt="course-image"
                          className="chapter-image"
                        />
                        <p className="ms-4">{chapter.Videos[0].title}</p>
                      </div>
                      <div className="f-align-center mt-2 mt-lg-0">
                        <Link
                          to="/tutor-panel/course/video/topicSeries/edit"
                          className="btn btn-brand-03 f-align-center rounded-2 border-2 px-3 py-2"
                        >
                          <span className="material-symbols-outlined me-1">
                            edit
                          </span>
                          編輯影片
                        </Link>
                        <button
                          type="button"
                          className="btn btn-outline-danger f-align-center rounded-2 border-2 p-2 ms-2"
                          onClick={() =>
                            deleteChapter(chapter.course_id, chapter.id)
                          }
                        >
                          <span className="material-symbols-outlined me-1">
                            delete
                          </span>
                          刪除
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <p>{chapter.title}</p>
                      </div>
                      <div className="f-align-center mt-2 mt-lg-0">
                        <Link
                          to={`/tutor-panel/video/topicSeries/add/${chapter.course_id}/${chapter.id}`}
                          className="btn btn-brand-03 f-align-center rounded-2 border-2 px-3 py-2"
                        >
                          <span className="material-symbols-outlined me-1">
                            add
                          </span>
                          新增影片
                        </Link>
                        <button
                          type="button"
                          className="btn btn-outline-danger f-align-center rounded-2 border-2 p-2 ms-2"
                          onClick={() =>
                            deleteChapter(chapter.course_id, chapter.id)
                          }
                        >
                          <span className="material-symbols-outlined me-1">
                            delete
                          </span>
                          刪除
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </>
          )}
        </ul>
        <button
          type="button"
          className="btn btn-outline-brand-03 f-align-center rounded-2 border-2 px-3 py-2 mt-4"
          onClick={openModal}
        >
          <span className="material-symbols-outlined me-1">add</span>
          增加新章節
        </button>
      </div>

      <div className="btn-container text-end fixed-bottom pb-4 pe-4 pe-lg-13">
        <NavLink
          to="/tutor-panel/course"
          className="btn btn-outline-brand-03 rounded-2"
        >
          返回課程列表
        </NavLink>
      </div>

      {/* modal */}
      <div
        id="chapterModal"
        className="modal fade"
        tabIndex="-1"
        aria-labelledby="chapterModalLabel"
        aria-hidden="true"
        ref={chapterModalRef}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="chapterModalLabel">
                新增章節
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={hideModal}
              ></button>
            </div>
            <div className="modal-body px-4 px-lg-8">
              <form>
                <div className="mb-3">
                  <h6 className="fs-5">
                    {temChapterList.length === 0
                      ? "開場影片"
                      : `第 ${temChapterList.length} 章`}
                  </h6>
                  <label htmlFor="company" className="form-label mt-4 mt-lg-6">
                    章節影片名稱
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-2"
                    id="title"
                    name="title"
                    placeholder="請輸入新章節的影片名稱"
                    value={temChapterData.title}
                    onChange={handleChapterChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-none"
                data-bs-dismiss="modal"
                onClick={hideModal}
              >
                關閉
              </button>
              <button
                type="button"
                className="btn btn-brand-03"
                onClick={() => addChapter(temChapterData)}
              >
                新增
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
AddChapter.propTypes = {
  newCourseId: PropTypes.string.isRequired,
  setLoadingState: PropTypes.func.isRequired,
};
