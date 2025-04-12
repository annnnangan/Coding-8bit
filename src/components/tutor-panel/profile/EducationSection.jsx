import { useState, useRef, useEffect, useCallback } from "react";

import * as bootstrap from "bootstrap";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

import userApi from "@/api/userApi";
import tutorApi from "@/api/tutorApi";

export default function EducationSection({ userData, setLoadingState }) {
  const [education, setEducation] = useState([]);
  const [temEducation, setTemEducation] = useState({
    school_name: "",
    major: "",
    degree: "",
    start_year: "",
    end_year: "",
  });

  // modal
  const [modalType, setModalType] = useState("");
  const myModal = useRef(null);
  const educationModalRef = useRef(null);

  const openModal = (edu, type) => {
    if (type === "edit") {
      setIsCurrentlyEdu(edu.end_year === 9999);
      setModalType("edit");
      setTemEducation(edu);
      if (edu.end_year === 9999) {
        setTemEducation((prev) => ({
          ...prev,
          end_year: "",
        }));
      }
      setUpdateDataId(edu.id);
    } else {
      setModalType("add");
      setTemEducation({
        school_name: "",
        major: "",
        degree: "",
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
  const handleEduChange = (e, field) => {
    let value = e.target.value;

    if (field === "start_year" || field === "end_year") {
      value = value ? parseInt(value, 10) : "";
    }

    setTemEducation((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 在學狀態處理
  const [isCurrentlyEdu, setIsCurrentlyEdu] = useState(false);

  // 獲取資料
  const [tutorId, setTutorId] = useState("");
  const getData = useCallback(async () => {
    setLoadingState(true);
    try {
      const { tutor_id } = await userApi.getUserData();
      const result = await tutorApi.getEdu(tutor_id);
      setTutorId(tutor_id);
      setEducation(result.data || []);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "資料獲取失敗",
        text: error,
      });
    } finally {
      setLoadingState(false);
    }
  }, [setLoadingState]);

  // 新增資料
  const addData = async () => {
    setLoadingState(true);
    try {
      await tutorApi.addEdu(tutorId, {
        ...temEducation,
        tutor_id: tutorId,
        end_year: isCurrentlyEdu ? 9999 : temEducation.end_year,
      });
      setTemEducation({});
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
      await tutorApi.updateEdu(
        tutorId,
        {
          ...temEducation,
          end_year: isCurrentlyEdu ? 9999 : temEducation.end_year,
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
  const deleteData = async (eduId) => {
    Swal.fire({
      title: "確定要刪除嗎？",
      showCancelButton: true,
      confirmButtonText: "刪除",
      denyButtonText: "不要刪除",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoadingState(true);
        try {
          await tutorApi.deleteEdu(tutorId, eduId);
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
    myModal.current = new bootstrap.Modal(educationModalRef.current);
  }, []);

  // 初始化 - 取得資料
  useEffect(() => {
    if (userData.tutor_id) {
      getData();
    }
  }, [userData.tutor_id, getData]);

  return (
    <section className="tutor-manage-profile-education-wrap bg-white rounded-3 px-4 px-md-10 py-4 py-md-6 mt-4">
      <h2 className="fs-6 fs-md-5 fw-bold">學歷</h2>
      <div className="table-wrap">
        <table className="table mt-4 mt-lg-6">
          <thead>
            <tr>
              <th>學校名稱</th>
              <th>主修</th>
              <th>學位</th>
              <th>入學年份</th>
              <th>畢業年份</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody className="align-middle">
            {education
              ?.sort((a, b) => a.start_year - b.start_year)
              .map((education) => (
                <tr key={education.id}>
                  <td>{education.school_name}</td>
                  <td>{education.major}</td>
                  <td>{education.degree}</td>
                  <td>{education.start_year}</td>
                  <td>
                    {education.end_year === 9999 ? "-" : education.end_year}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-brand-03"
                      onClick={() => {
                        openModal(education, "edit");
                      }}
                    >
                      編輯
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger rounded-2 px-1 py-1 ms-1"
                      onClick={() => deleteData(education.id)}
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
        新增學歷
      </button>

      {/* modal */}
      <div
        id="eduModal"
        className="modal fade"
        tabIndex="-1"
        aria-labelledby="eduModalLabel"
        ref={educationModalRef}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="educationModalLabel">
                {modalType === "add" ? "新增學歷" : "編輯學歷"}
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
                    id="isCurrentlyEduCheckbox"
                    checked={isCurrentlyEdu}
                    onChange={(e) => {
                      setIsCurrentlyEdu(e.target.checked);
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="isCurrentlyEduCheckbox"
                  >
                    仍在學中
                  </label>
                </div>
                <div className="mb-3">
                  <label htmlFor="school_name" className="form-label">
                    學校名稱
                  </label>
                  <input
                    type="text"
                    className="profile-input form-control"
                    id="school_name"
                    placeholder="七角大學"
                    value={temEducation.school_name ?? ""}
                    onChange={(e) => handleEduChange(e, "school_name")}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="major" className="form-label">
                    主修
                  </label>
                  <input
                    type="text"
                    className="profile-input form-control"
                    placeholder="資訊工程系"
                    id="major"
                    value={temEducation.major ?? ""}
                    onChange={(e) => handleEduChange(e, "major")}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="degree" className="form-label">
                    學位
                  </label>
                  <input
                    type="text"
                    className="profile-input form-control"
                    placeholder="學士"
                    id="degree"
                    value={temEducation.degree ?? ""}
                    onChange={(e) => handleEduChange(e, "degree")}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edu-start_year" className="form-label">
                    入學年份
                  </label>
                  <input
                    type="text"
                    className="profile-input form-control"
                    placeholder="2017"
                    id="edu-start_year"
                    value={temEducation.start_year ?? ""}
                    onChange={(e) => handleEduChange(e, "start_year")}
                  />
                </div>
                {!isCurrentlyEdu && (
                  <div className="mb-3">
                    <label htmlFor="edu-end_year" className="form-label">
                      畢業年份
                    </label>
                    <input
                      type="text"
                      className="profile-input form-control"
                      placeholder="2020"
                      id="edu-end_year"
                      value={temEducation.end_year ?? ""}
                      onChange={(e) => handleEduChange(e, "end_year")}
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
                  onClick={() => addData(temEducation)}
                >
                  新增
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-brand-03"
                  onClick={() => updateData(temEducation)}
                >
                  更新
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
EducationSection.propTypes = {
  userData: PropTypes.object.isRequired,
  setLoadingState: PropTypes.func.isRequired,
};
