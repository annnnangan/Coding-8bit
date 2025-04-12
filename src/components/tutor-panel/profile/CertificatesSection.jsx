import { useState, useRef, useEffect, useCallback } from "react";

import * as bootstrap from "bootstrap";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

import tutorApi from "@/api/tutorApi";

export default function CertificatesSection({ userData, setLoadingState }) {
  const [certificates, setCertificates] = useState([]);
  const [temCertificates, setTemCertificates] = useState({
    title: "",
    issuer: "",
    issued_date: "",
  });

  // modal
  const [modalType, setModalType] = useState("");
  const myModal = useRef(null);
  const certificateModalRef = useRef(null);

  const openModal = (certificate, type) => {
    if (type === "edit") {
      setModalType("edit");
      setTemCertificates(certificate);
      setUpdateDataId(certificate.id);
    } else {
      setModalType("add");
      setTemCertificates({
        title: "",
        issuer: "",
        issued_date: "",
      });
    }
    myModal.current.show();
    setModalType(type);
  };

  const hideModal = () => {
    myModal.current.hide();
  };

  // 更新資料的狀態
  const handleCertificateChange = (e, field) => {
    let value = e.target.value;

    if (field === "issued_date") {
      value = value ? parseInt(value, 10) : "";
    }

    setTemCertificates((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 獲取資料
  const [tutorId, setTutorId] = useState("");
  const getData = useCallback(async () => {
    setLoadingState(true);
    try {
      const { tutor_id } = userData;
      const result = await tutorApi.getCertificate(tutor_id);
      setTutorId(tutor_id);
      setCertificates(result.data || []);
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
      await tutorApi.addCertificate(tutorId, {
        ...temCertificates,
        tutor_id: tutorId,
      });
      setTemCertificates({});
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
      await tutorApi.updateCertificate(tutorId, temCertificates, updateDataId);
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
  const deleteData = async (certificateId) => {
    Swal.fire({
      title: "確定要刪除嗎？",
      showCancelButton: true,
      confirmButtonText: "刪除",
      denyButtonText: "不要刪除",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoadingState(true);
        try {
          await tutorApi.deleteCertificate(tutorId, certificateId);
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
    myModal.current = new bootstrap.Modal(certificateModalRef.current);
  }, []);

  // 初始化 - 取得資料
  useEffect(() => {
    if (userData.tutor_id) {
      getData();
    }
  }, [userData.tutor_id, getData]);

  return (
    <section className="tutor-manage-profile-certificates-wrap bg-white rounded-3 px-4 px-md-10 py-4 py-md-6 mt-4">
      <h2 className="fs-6 fs-md-5 fw-bold">證照</h2>
      <div className="table-wrap">
        <table className="table mt-4 mt-lg-6">
          <thead>
            <tr>
              <th>證照名稱</th>
              <th>發照單位</th>
              <th>發證年份</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody className="align-middle">
            {certificates
              ?.sort((a, b) => a.start_year - b.start_year)
              .map((certificate) => (
                <tr key={certificate.id}>
                  <td>{certificate.title}</td>
                  <td>{certificate.issuer}</td>
                  <td>{certificate.issued_date}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-brand-03"
                      onClick={() => {
                        openModal(certificate, "edit");
                      }}
                    >
                      編輯
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger rounded-2 px-1 py-1 ms-1"
                      onClick={() => deleteData(certificate.id)}
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
        新增證照
      </button>

      {/* modal */}
      <div
        id="certificateModal"
        className="modal fade"
        tabIndex="-1"
        aria-labelledby="certificateModalLabel"
        ref={certificateModalRef}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="certificateModalLabel">
                {modalType === "add" ? "新增證照" : "編輯證照"}
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
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    證照名稱
                  </label>
                  <input
                    type="text"
                    className="profile-input form-control"
                    id="title"
                    placeholder="JLPT N1"
                    value={temCertificates.title}
                    onChange={(e) => handleCertificateChange(e, "title")}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="issuer" className="form-label">
                    發照單位
                  </label>
                  <input
                    type="text"
                    className="profile-input form-control"
                    placeholder="日本台灣交流協會"
                    id="issuer"
                    value={temCertificates.issuer}
                    onChange={(e) => handleCertificateChange(e, "issuer")}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="issued_date" className="form-label">
                    發證年份
                  </label>
                  <input
                    type="text"
                    className="profile-input form-control"
                    placeholder="2021"
                    id="issued_date"
                    value={temCertificates.issued_date}
                    onChange={(e) => handleCertificateChange(e, "issued_date")}
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
              {modalType === "add" ? (
                <button
                  type="button"
                  className="btn btn-brand-03"
                  onClick={() => addData(temCertificates)}
                >
                  新增
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-brand-03"
                  onClick={() => updateData(temCertificates)}
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
CertificatesSection.propTypes = {
  userData: PropTypes.object.isRequired,
  setLoadingState: PropTypes.func.isRequired,
};
