import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

import userApi from "@/api/userApi";

const { VITE_API_BASE } = import.meta.env;

export default function ProfileContent({ userData, setLoadingState }) {
  const navigate = useNavigate();

  const [temProfile, setTemProfile] = useState({
    username: "",
    avatar_url: "",
  });

  // 上傳圖片函式
  const imgUpload = async (e) => {
    const file = e.target.files?.[0];

    // 如果沒有選擇圖片檔案
    if (!file) {
      Swal.fire({
        icon: "warning",
        title: "請選擇檔案",
      });
      return;
    }

    // 如果檔案大小大於 50MB
    const MAX_FILE_SIZE_MB = 5;
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      Swal.fire({
        icon: "error",
        title: `檔案過大，請選擇小於 ${MAX_FILE_SIZE_MB}MB 的檔案`,
      });
      return;
    }

    setLoadingState(true);
    try {
      const token =
        document.cookie.replace(
          /(?:(?:^|.*;\s*)authToken\s*=\s*([^;]*).*$)|^.*$/,
          "$1"
        ) || null;

      // 1. 取得上傳用的預簽名 url
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      const uploadData = await axios.post(
        `${VITE_API_BASE}/upload/get-upload-url`,
        { fileName: file.name, fileType: file.type }
      );

      if (!uploadData.data.uploadUrl) {
        throw new Error("無法取得上傳 URL");
      }

      const { uploadUrl, filePath, downloadUrl } = uploadData.data;

      // 2. 將檔案上傳到取得的預簽名
      await axios.put(uploadUrl, file, {
        headers: { "Content-Type": file.type },
      });

      // 3. 更新狀態顯示圖片
      setTemProfile((prevData) => {
        return {
          ...prevData,
          avatar_url: downloadUrl || filePath,
        };
      });

      Swal.fire({
        icon: "success",
        title: "上傳成功！",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response?.data?.message || "圖片上傳失敗，請稍後再試",
      });
    } finally {
      setLoadingState(false);
    }
  };

  // 更新個人資料
  const updateProfile = async () => {
    setLoadingState(true);
    try {
      await userApi.updateUserData(temProfile);
      Swal.fire({
        title: "更新成功",
        icon: "success",
      });
      navigate(0);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "更新失敗",
        text: error,
      });
    } finally {
      setLoadingState(false);
    }
  };

  // 更新個人資料狀態
  const handleProfile = (e) => {
    setTemProfile((prevData) => {
      return { ...prevData, username: e.target.value };
    });
  };

  // 切換個人資料編輯狀態
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const handleEditProfile = () => {
    setTemProfile({
      username: userData.username,
      avatar_url: userData.avatar_url,
    })
    setIsEditingProfile((prev) => (prev = !prev));
  };

  // 取消個人資料編輯狀態
  const resetTemProfile = () => {
    handleEditProfile();
    setTemProfile({
      username: "",
      avatar_url: "",
    });
  };

  return (
    <section className="bg-white rounded-3 px-4 px-md-10 py-4 py-md-6">
      <h2 className="fs-6 fs-md-5 fw-bold">基本資料</h2>
      <form className="pt-4 pt-md-6">
        <div>
          <div
            className="image-upload-wrapper rounded-circle"
            style={{ width: "200px", height: "200px" }}
          >
            {/* 正在編輯的樣子 */}
            {isEditingProfile && !temProfile.avatar_url && (
              <>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  className="form-control rounded-circle h-100 p-0"
                  id="avatar_url"
                  onChange={imgUpload}
                />
                <label
                  htmlFor="avatar_url"
                  className="form-label image-upload-label rounded-circle h-100 mb-0"
                >
                  <span className="material-symbols-outlined mb-2">
                    imagesmode
                  </span>
                  上傳大頭貼
                </label>
              </>
            )}

            {/* 預覽圖片 */}
            {temProfile.avatar_url && (
              <div className="img-wrapper rounded-circle border-0 p-0">
                <img
                  src={temProfile.avatar_url}
                  alt="profile-avatar_url"
                  className="object-fit h-100"
                />
                <button
                  type="button"
                  onClick={() =>
                    setTemProfile((prevData) => {
                      return {
                        ...prevData,
                        avatar_url: "",
                      };
                    })
                  }
                >
                  <span className="material-symbols-outlined delete-icon">
                    delete
                  </span>
                </button>
              </div>
            )}

            {/* 未編輯的樣子 */}
            {!isEditingProfile && (
              <>
                {userData.avatar_url ? (
                  <img
                    src={userData.avatar_url}
                    alt="profile-avatar_url"
                    className="w-100 object-fit rounded-circle"
                  />
                ) : (
                  <img
                    src="images/icon/user.png"
                    alt="profile-avatar_url"
                    className="w-100 object-fit rounded-circle"
                  />
                )}
              </>
            )}
          </div>
          <div className="fs-6 mt-2 mt-md-4">
            <label className="form-label" htmlFor="username">
              暱稱
              <span className="text-danger">*</span>
            </label>
            {!isEditingProfile ? (
              <p className="fs-5 mb-2 fw-medium">{userData.username}</p>
            ) : (
              <input
                id="username"
                type="text"
                name="暱稱"
                className="form-control fw-bold"
                defaultValue={temProfile.username}
                placeholder="請輸入暱稱"
                onChange={handleProfile}
              />
            )}
          </div>
        </div>

        <button
          className={`btn btn-brand-03 rounded-2 mt-md-4 ${
            isEditingProfile && "d-none"
          }`}
          type="button"
          onClick={handleEditProfile}
        >
          編輯
        </button>
        <div>
          <button
            className={`btn btn-brand-03 rounded-2 mt-md-4 ${
              !isEditingProfile && "d-none"
            }`}
            type="button"
            onClick={updateProfile}
          >
            更新個人資料
          </button>
          <button
            type="submit"
            className={`btn btn-outline-none rounded-2 mt-2 mt-md-4 ms-2 ${
              !isEditingProfile && "d-none"
            }`}
            onClick={resetTemProfile}
          >
            取消
          </button>
        </div>
      </form>
    </section>
  );
}
ProfileContent.propTypes = {
  userData: PropTypes.object.isRequired,
  setLoadingState: PropTypes.func.isRequired,
};
