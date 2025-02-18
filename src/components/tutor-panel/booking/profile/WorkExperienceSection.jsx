import { useState, useRef, useEffect } from "react";

import * as bootstrap from "bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

import Loader from "../../../../components/common/Loader";

const { VITE_API_BASE } = import.meta.env;

export default function WorkExperienceSection() {
  //loading
  const [loadingState, setLoadingState] = useState(false);

  // const initialExperiencesState = [
  //   {
  //     id: 11258,
  //     company: "High School",
  //     position: "Math Teacher",
  //     start_data: "2019",
  //     end_data: "2021",
  //   },
  //   {
  //     id: 22258,
  //     company: "High School",
  //     position: "Math Teacher",
  //     start_data: "2016",
  //     end_data: "2020",
  //   },
  // ];
  const [workExperiences, setWorkExperiences] = useState([]);
  const [temExperience, setTemExperience] = useState({
    company: "",
    position: "",
    start_data: "",
    end_data: "",
  });

  // modal
  const [modalType, setModalType] = useState("");
  const myModal = useRef(null);
  const experienceModalRef = useRef(null);

  const openModal = (exp, type) => {
    if (type === "edit") {
      setModalType("edit");
      setTemExperience(exp);
    } else {
      setModalType("add");
      setTemExperience({
        company: "",
        position: "",
        start_data: "",
        end_data: "",
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

    if (field === "start_data" || field === "end_data") {
      value = value ? parseInt(value, 10) : "";
    }

    setTemExperience((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const [tutorId, setTutorId] = useState("");
  // 獲取資料
  const getData = async () => {
    setLoadingState(true);
    try {
      const { data } = await axios.get(`${VITE_API_BASE}/user/users/me`);
      setTutorId(data.id);
      const result = await axios.get(
        `${VITE_API_BASE}/tutor/${data.id}/experiences`
      );
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
  };

  // 新增資料
  const addData = async () => {
    setLoadingState(true);
    try {
      console.log({
        tutor_id: tutorId,
        ...temExperience,
      });
      await axios.post(`${VITE_API_BASE}/tutor/${tutorId}/experiences`, {
        tutor_id: tutorId,
        ...temExperience,
      });
      setTemExperience({});
      Swal.fire({
        icon: "success",
        title: "新增成功",
      });
      getData();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "新增失敗",
        text: error.response.data.message,
      });
    } finally {
      setLoadingState(false);
    }
  };

  // 編輯資料
  const updateData = async (exp) => {
    setLoadingState(true);
    try {
      await axios.put(
        `${VITE_API_BASE}/tutor/${tutorId}/experiences/${exp.expId}`,
        exp
      );
      Swal.fire({
        icon: "success",
        title: "修改成功",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "修改失敗",
        text: error.response.data.message,
      });
    } finally {
      setLoadingState(false);
    }
  };

  // 初始化 - 啟用 modal
  useEffect(() => {
    myModal.current = new bootstrap.Modal(experienceModalRef.current);
  }, []);

  // 初始化 - 取得資料
  useEffect(() => {
    const token =
      document.cookie.replace(
        /(?:(?:^|.*;\s*)authToken\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      ) || null;
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    getData();
  }, []);

  return (
    <>
      {loadingState && <Loader />}

      <section className="tutor-manage-profile-workExperiences-wrap bg-white rounded-3 px-4 px-md-10 py-4 py-md-6">
        <h2 className="fs-6 fs-md-5 fw-bold">工作經歷</h2>
        <table className="table mt-4 mt-lg-6">
          <thead>
            <tr>
              <th>公司名稱</th>
              <th>職稱</th>
              <th>在職年份</th>
              <th>離職年份</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody className="align-middle">
            {workExperiences?.map((experience) => (
              <tr key={experience.id}>
                <td>{experience.company}</td>
                <td>{experience.position}</td>
                <td>{experience.start_data}</td>
                <td>{experience.end_data}</td>
                <td>
                  <button
                    className="btn btn-sm btn-brand-03"
                    onClick={() => openModal(experience, "edit")}
                  >
                    編輯
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
          aria-hidden="true"
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
                  <div className="mb-3">
                    <label htmlFor="company" className="form-label">
                      公司名稱
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="company"
                      placeholder="七角股份有限公司"
                      value={temExperience.company}
                      onChange={(e) => handleExpChange(e, "company")}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="position" className="form-label">
                      職稱
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="前端工程師"
                      id="position"
                      value={temExperience.position}
                      onChange={(e) => handleExpChange(e, "position")}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="start_data" className="form-label">
                      在職年份
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="2017"
                      id="start_data"
                      value={temExperience.start_data}
                      onChange={(e) => handleExpChange(e, "start_data")}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="end_data" className="form-label">
                      離職年份
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="2020"
                      id="end_data"
                      value={temExperience.end_data}
                      onChange={(e) => handleExpChange(e, "end_data")}
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
