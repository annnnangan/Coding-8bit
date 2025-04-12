import { useState, useRef, useEffect, useCallback } from "react";

import * as bootstrap from "bootstrap";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

import tutorApi from "@/api/tutorApi";

export default function WorkExperienceSection({ userData, setLoadingState }) {
  const [workExperiences, setWorkExperiences] = useState([]);
  const [temExperience, setTemExperience] = useState({
    company: "",
    position: "",
    start_year: "",
    end_year: "",
  });

  // modal
  const [modalType, setModalType] = useState("");
  const myModal = useRef(null);
  const experienceModalRef = useRef(null);

  const openModal = (exp, type) => {
    if (type === "edit") {
      setIsCurrentlyJob(exp.end_year === 9999);
      setModalType("edit");
      setTemExperience(exp);
      if (exp.end_year === 9999) {
        setTemExperience((prev) => ({
          ...prev,
          end_year: "",
        }));
      }
      setUpdateDataId(exp.id);
    } else {
      setModalType("add");
      setTemExperience({
        company: "",
        position: "",
        start_year: "",
        end_year: "",
      });
    }
    myModal.current.show();
    setModalType(type);
  };

  const hideModal = () => {
    myModal.current.hide();
  };

  // 更新資料的狀態
  const handleExpChange = (e, field) => {
    let value = e.target.value;

    if (field === "start_year" || field === "end_year") {
      value = value ? parseInt(value, 10) : "";
    }

    setTemExperience((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 在職狀態處理
  const [isCurrentlyJob, setIsCurrentlyJob] = useState(false);

  // 獲取資料
  const [tutorId, setTutorId] = useState("");
  const getData = useCallback(async () => {
    setLoadingState(true);
    try {
      const { tutor_id } = userData;
      const result = await tutorApi.getExp(tutor_id);
      setTutorId(tutor_id);
      setWorkExperiences(result.data || []);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "資料獲取失敗",
        text: error,
      });
    } finally {
      setLoadingState(false);
    }
  }, [setLoadingState, userData]);

  // 新增資料
  const addData = async () => {
    setLoadingState(true);
    try {
      await tutorApi.addExp(tutorId, {
        ...temExperience,
        tutor_id: tutorId,
        end_year: isCurrentlyJob ? 9999 : temExperience.end_year,
      });
      setTemExperience({});
      Swal.fire({
        icon: "success",
        title: "新增成功",
      });
      hideModal();
      getData();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "新增失敗",
        text: error.response?.data?.message || "發生錯誤，請稍後再試",
      });
    } finally {
      setLoadingState(false);
    }
  };

  // 更新資料
  const [updateDataId, setUpdateDataId] = useState("");
  const updateData = async () => {
    setLoadingState(true);
    try {
      await tutorApi.updateExp(
        tutorId,
        {
          ...temExperience,
          end_year: isCurrentlyJob ? 9999 : temExperience.end_year,
        },
        updateDataId
      );
      Swal.fire({
        icon: "success",
        title: "修改成功",
      });
      hideModal();
      getData();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "修改失敗",
        text: error.response?.data?.message || "發生錯誤，請稍後再試",
      });
    } finally {
      setLoadingState(false);
    }
  };

  // 刪除資料
  const deleteData = async (expId) => {
    Swal.fire({
      title: "確定要刪除嗎？",
      showCancelButton: true,
      confirmButtonText: "刪除",
      denyButtonText: "不要刪除",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoadingState(true);
        try {
          await tutorApi.deleteExp(tutorId, expId);
          Swal.fire({
            icon: "success",
            title: "刪除成功",
          });
          getData();
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "刪除失敗",
            text: error.response?.data?.message || "發生錯誤，請稍後再試",
          });
        } finally {
          setLoadingState(false);
        }
      }
    });
  };

  // 初始化 - 啟用 modal
  useEffect(() => {
    myModal.current = new bootstrap.Modal(experienceModalRef.current);
  }, []);

  // 初始化 - 取得資料
  useEffect(() => {
    if (userData.tutor_id) {
      getData();
    }
  }, [userData.tutor_id, getData]);

  return (
    <>
      <section className="tutor-manage-profile-workExperiences-wrap bg-white rounded-3 px-4 px-md-10 py-4 py-md-6 mt-4 mt-xxl-0">
        <h2 className="fs-6 fs-md-5 fw-bold">工作經歷</h2>
        <div className="table-wrap">
          <table className="table mt-4 mt-lg-6">
            <thead>
              <tr>
                <th>公司名稱</th>
                <th>職稱</th>
                <th>入職年份</th>
                <th>離職年份</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody className="align-middle">
              {workExperiences
                ?.sort((a, b) => a.start_year - b.start_year)
                .map((experience) => (
                  <tr key={experience.id}>
                    <td>{experience.company}</td>
                    <td>{experience.position}</td>
                    <td>{experience.start_year}</td>
                    <td>
                      {experience.end_year === 9999 ? "-" : experience.end_year}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-brand-03"
                        onClick={() => {
                          openModal(experience, "edit");
                        }}
                      >
                        編輯
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger rounded-2 px-1 py-1 ms-1"
                        onClick={() => deleteData(experience.id)}
                      >
                        <span className="material-symbols-outlined fs-6">
                          delete
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <button
          className="btn btn-brand-03 mt-3"
          onClick={() => openModal({}, "add")}
        >
          新增工作經歷
        </button>

        {/* modal */}
        <div
          id="expModal"
          className="modal fade"
          tabIndex="-1"
          aria-labelledby="expModalLabel"
          ref={experienceModalRef}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="experienceModalLabel">
                  {modalType === "add" ? "新增經驗" : "編輯經驗"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={hideModal}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="isCurrentlyJobCheckbox"
                      checked={isCurrentlyJob}
                      onChange={(e) => {
                        setIsCurrentlyJob(e.target.checked);
                      }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="isCurrentlyJobCheckbox"
                    >
                      仍在職中
                    </label>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="company" className="form-label">
                      公司名稱
                    </label>
                    <input
                      type="text"
                      className="profile-input form-control"
                      id="company"
                      placeholder="七角股份有限公司"
                      value={temExperience.company ?? ""}
                      onChange={(e) => handleExpChange(e, "company")}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="position" className="form-label">
                      職稱
                    </label>
                    <input
                      type="text"
                      className="profile-input form-control"
                      placeholder="前端工程師"
                      id="position"
                      value={temExperience.position ?? ""}
                      onChange={(e) => handleExpChange(e, "position")}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="start_year" className="form-label">
                      入職年份
                    </label>
                    <input
                      type="text"
                      className="profile-input form-control"
                      placeholder="2017"
                      id="start_year"
                      value={temExperience.start_year ?? ""}
                      onChange={(e) => handleExpChange(e, "start_year")}
                    />
                  </div>
                  {!isCurrentlyJob && (
                    <div className="mb-3">
                      <label htmlFor="end_year" className="form-label">
                        離職年份
                      </label>
                      <input
                        type="text"
                        className="profile-input form-control"
                        placeholder="2020"
                        id="end_year"
                        value={temExperience.end_year ?? ""}
                        onChange={(e) => handleExpChange(e, "end_year")}
                      />
                    </div>
                  )}
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
                {modalType === "add" ? (
                  <button
                    type="button"
                    className="btn btn-brand-03"
                    onClick={() => addData(temExperience)}
                  >
                    新增
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-brand-03"
                    onClick={() => updateData(temExperience)}
                  >
                    更新
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
WorkExperienceSection.propTypes = {
  userData: PropTypes.object.isRequired,
  setLoadingState: PropTypes.func.isRequired,
};
