import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import axios from "axios";

import ResetPassword from "../../components/common/ResetPassword";
import ProfileContent from "./profile/ProfileContent";
import Loader from "../../components/common/Loader";

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
                className="tab-pane fade"
                id="aboutMe"
                role="tabpanel"
                aria-labelledby="aboutMe-tab"
              >
                <div className="row"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
