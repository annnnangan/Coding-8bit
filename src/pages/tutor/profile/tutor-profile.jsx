import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import axios from "axios";

import ResetPassword from "../../../components/common/profile/ResetPassword";
import ProfileContent from "../../../components/common/profile/ProfileContent";

import WorkExperienceSection from "../../../components/tutor-panel/booking/profile/WorkExperienceSection";
import EducationSection from "../../../components/tutor-panel/booking/profile/EducationSection";
import CertificatesSection from "../../../components/tutor-panel/booking/profile/CertificatesSection";

import Loader from "../../../components/common/Loader";

export default function TutorProfile() {
  // loading
  const [loadingState, setLoadingState] = useState(false);

  // 取得使用者資料
  const [userData, setUserData] = useState({});
  const getUserData = async (token) => {
    setLoadingState(true);
    try {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      const res = await axios.get(
        `https://service.coding-8bit.site/api/v1/user/users/me`
      );
      setUserData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingState(false);
    }
  };

  // 取得講師資料
  const [tutorData, setTutorData] = useState({
    id: "uuid",
    user_id: "uuid",
    about: "Experienced tutor in mathematics.",
    expertise: "Mathematics",
    hourly_rate: 50,
    rating: 4.5,
  });

  // 切換關於我編輯狀態
  const [isEditingAboutMe, setIsEditingAboutMe] = useState(false);
  const handleEditAboutMe = () => {
    setIsEditingAboutMe((prev) => (prev = !prev));
  };

  // 初始化 - 確認是否已登入
  useEffect(() => {
    const token =
      document.cookie.replace(
        /(?:(?:^|.*;\s*)authToken\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      ) || null;
    if (token) {
      getUserData(token);
    }
  }, []);

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
              className="nav-link"
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
              className="nav-link active"
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
                className="tab-pane fade"
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                <div className="row pt-2 pt-md-10">
                  <div className="col-12 col-md-5">
                    <ResetPassword
                      userData={userData}
                      setLoadingState={setLoadingState}
                    />
                  </div>
                  <div className="col-12 col-md-7">
                    <ProfileContent
                      userData={userData}
                      setLoadingState={setLoadingState}
                    />
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade show active"
                id="aboutMe"
                role="tabpanel"
                aria-labelledby="aboutMe-tab"
              >
                <div className="row pt-2 pt-md-10">
                  <div className="col-12 col-md-5">
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
                                name="專長"
                                className="form-control fw-bold"
                                placeholder="請輸入專長"
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
                                placeholder="請介紹一下自己 (ex. 經歷、教學風格等)"
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

                    {/* 教學風格 */}
                    {/* <section className="bg-white rounded-3 mt-4 mt-lg-6 px-4 px-md-10 py-4 py-md-6">
                      <h2 className="fs-6 fs-md-5 fw-bold">教學風格</h2>
                      <form className="pt-4 pt-md-6">
                        <div>
                          <div className="fs-6 mt-2 mt-md-4">
                            <label className="form-label" htmlFor="username">
                              暱稱
                            </label>
                            {!isEditingAboutMe ? (
                              <p className="fs-5 mb-2 fw-medium">
                                {userData.username}
                              </p>
                            ) : (
                              <input
                                id="username"
                                type="text"
                                name="暱稱"
                                className="form-control fw-bold"
                                placeholder="請輸入暱稱"
                              />
                            )}
                          </div>
                        </div>

                        <button
                          className={`btn btn-brand-03 rounded-2 mt-md-4 ${
                            isEditingAboutMe && "d-none"
                          }`}
                          type="button"
                          onClick={handleEditProfile}
                        >
                          編輯
                        </button>
                        <div>
                          <button
                            className={`btn btn-brand-03 rounded-2 mt-md-4 ${
                              !isEditingAboutMe && "d-none"
                            }`}
                            type="button"
                          >
                            更新個人資料
                          </button>
                          <button
                            type="submit"
                            className={`btn btn-outline-none rounded-2 mt-2 mt-md-4 ms-2 ${
                              !isEditingAboutMe && "d-none"
                            }`}
                          >
                            取消
                          </button>
                        </div>
                      </form>
                    </section> */}
                  </div>
                  <div className="col-12 col-md-7">
                    {/* 工作經歷 */}
                    <WorkExperienceSection />

                    {/* 學歷 */}
                    <EducationSection />

                    {/* 證書 */}
                    <CertificatesSection />
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
