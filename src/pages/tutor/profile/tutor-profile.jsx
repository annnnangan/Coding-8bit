import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";

import Swal from "sweetalert2";

import tutorApi from "../../../api/tutorApi";

import ResetPassword from "../../../components/common/profile/ResetPassword";
import ProfileContent from "../../../components/common/profile/ProfileContent";

import WorkExperienceSection from "../../../components/tutor-panel/profile/WorkExperienceSection";
import EducationSection from "../../../components/tutor-panel/profile/EducationSection";
import CertificatesSection from "../../../components/tutor-panel/profile/CertificatesSection";

import Loader from "../../../components/common/Loader";

export default function TutorProfile() {
  // loading
  const [loadingState, setLoadingState] = useState(true);

  // 取得使用者資料
  const { userData } = useSelector((state) => state.auth);

  const [tutorId, setTutorId] = useState({});
  const [tutorData, setTutorData] = useState({});
  const [temTutorData, setTemTutorData] = useState({
    expertise: "",
    about: "",
  });
  const getData = async () => {
    try {
      const result = await tutorApi.getTutorDetail(userData.tutor_id);
      setTutorId(userData.tutor_id);
      setTutorData(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingState(false);
    }
  };

  // 更新資料的狀態
  const handleAboutChange = (e, field) => {
    let value = e.target.value;

    setTemTutorData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 切換關於我編輯狀態
  const [isEditingAboutMe, setIsEditingAboutMe] = useState(false);
  const handleEditAboutMe = () => {
    setIsEditingAboutMe((prev) => (prev = !prev));
  };

  // 更新關於我資料
  const updateAboutData = async () => {
    setLoadingState(true);
    try {
      await tutorApi.updateTutorData(tutorId, temTutorData);
      Swal.fire({
        icon: "success",
        title: "修改成功",
      });
      handleEditAboutMe();
      getData();
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

  useEffect(() => {
    if (userData.tutor_id) {
      getData();
    }
  }, [userData.tutor_id]);

  return (
    <>
      <Helmet>
        <title>Coding∞bit ｜ 個人資料</title>
      </Helmet>
      {loadingState && <Loader />}

      <style>{`body { background-color:rgb(250, 250, 250); }`}</style>

      <main className="container-fluid">
        <h1 className="fs-4 fs-lg-2">個人資料</h1>

        <ul
          className="nav nav-tabs border-bottom border-gray-03 mt-4 mt-lg-6"
          id="tutorProfileTab"
          role="tablist"
        >
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#profile"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
              tabIndex="-1"
            >
              帳戶與個人資料
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="aboutMe-tab"
              data-bs-toggle="tab"
              data-bs-target="#aboutMe"
              type="button"
              role="tab"
              aria-controls="aboutMe"
              aria-selected="true"
            >
              自我介紹與經歷
            </button>
          </li>
        </ul>

        <div className="row">
          <div className="col">
            <div className="tab-content" id="tutorProfileTabContent">
              <div
                className="tab-pane fade show active"
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                <div className="row pt-2 pt-md-10">
                  <div className="col-md-5">
                    <ResetPassword
                      userData={userData}
                      setLoadingState={setLoadingState}
                    />
                  </div>
                  <div className="col-md-7">
                    <ProfileContent
                      userData={userData}
                      setLoadingState={setLoadingState}
                    />
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="aboutMe"
                role="tabpanel"
                aria-labelledby="aboutMe-tab"
              >
                <div className="row pt-2 pt-md-10">
                  <div className="col-xxl-5">
                    {/* 關於我 */}
                    <section className="bg-white rounded-3 px-4 px-md-10 py-4 py-md-6">
                      <h2 className="fs-6 fs-md-5 fw-bold">關於我</h2>
                      <form>
                        <div>
                          <div className="fs-6 mt-2 mt-md-4">
                            <label className="form-label" htmlFor="expertise">
                              專長
                            </label>
                            {!isEditingAboutMe ? (
                              <p className="fs-5 mb-2 fw-medium">
                                {tutorData.expertise}
                              </p>
                            ) : (
                              <input
                                id="expertise"
                                type="text"
                                name="expertise"
                                className="form-control fw-bold"
                                placeholder="請輸入專長，以半形逗號隔開 (ex.Vue,React,JavaScript)"
                                value={temTutorData.expertise}
                                onChange={(e) =>
                                  handleAboutChange(e, "expertise")
                                }
                              />
                            )}
                          </div>
                          <div className="fs-6 mt-2 mt-md-4">
                            <label className="form-label" htmlFor="about">
                              關於我
                            </label>
                            {!isEditingAboutMe ? (
                              <p className="fs-5 mb-2 fw-medium">
                                {tutorData.about}
                              </p>
                            ) : (
                              <textarea
                                className="form-control fw-bold"
                                id="about"
                                rows="5"
                                name="about"
                                placeholder="請介紹一下自己 (ex. 經歷、教學風格等)"
                                value={temTutorData.about}
                                onChange={(e) => handleAboutChange(e, "about")}
                              ></textarea>
                            )}
                          </div>
                        </div>

                        <button
                          className={`btn btn-brand-03 rounded-2 mt-md-4 ${
                            isEditingAboutMe && "d-none"
                          }`}
                          type="button"
                          onClick={handleEditAboutMe}
                        >
                          編輯
                        </button>
                        <div>
                          <button
                            className={`btn btn-brand-03 rounded-2 mt-md-4 ${
                              !isEditingAboutMe && "d-none"
                            }`}
                            type="button"
                            onClick={updateAboutData}
                          >
                            更新個人資料
                          </button>
                          <button
                            type="submit"
                            className={`btn btn-outline-none rounded-2 mt-2 mt-md-4 ms-2 ${
                              !isEditingAboutMe && "d-none"
                            }`}
                            onClick={handleEditAboutMe}
                          >
                            取消
                          </button>
                        </div>
                      </form>
                    </section>
                  </div>
                  <div className="col-xxl-7">
                    {/* 工作經歷 */}
                    <WorkExperienceSection
                      userData={userData}
                      setLoadingState={setLoadingState}
                    />

                    {/* 學歷 */}
                    <EducationSection
                      userData={userData}
                      setLoadingState={setLoadingState}
                    />

                    {/* 證書 */}
                    <CertificatesSection
                      userData={userData}
                      setLoadingState={setLoadingState}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
