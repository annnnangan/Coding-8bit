import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";

import Swal from "sweetalert2";
import axios from "axios";

import AddCourseVideoContent from "@/components/tutor-panel/course/add/AddCourseVideoContent";
import AddContent from "@/components/tutor-panel/course/add/AddContent";
import Loader from "@/components/common/Loader";

export default function TutorManageAddVideo() {
  // loading
  const [loadingState, setLoadingState] = useState(false);

  // 依路由決定此頁顯示分類
  const { type } = useParams();

  // 影片上傳函式
  const [temVideoData, setTemVideoData] = useState("");
  const videoUpload = async (e) => {
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
    const MAX_FILE_SIZE_MB = 50;
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      Swal.fire({
        icon: "error",
        title: `檔案過大，請選擇小於 ${MAX_FILE_SIZE_MB}MB 的檔案`,
      });
      return;
    }

    // 讀取影片時長
    const getVideoDuration = (file) => {
      return new Promise((resolve, reject) => {
        const video = document.createElement("video");
        video.preload = "metadata";
        video.src = URL.createObjectURL(file);
        video.onloadedmetadata = () => {
          URL.revokeObjectURL(video.src);
          resolve(video.duration); // 回傳秒數
        };
        video.onerror = () => {
          reject(new Error("無法讀取影片時長"));
        };
      });
    };

    setLoadingState(true);
    try {
      // 取得影片時長
      const duration = await getVideoDuration(file);

      const token =
        document.cookie.replace(
          /(?:(?:^|.*;\s*)authToken\s*=\s*([^;]*).*$)|^.*$/,
          "$1"
        ) || null;

      // 1. 取得上傳用的預簽名 url
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      const uploadData = await axios.post(
        "https://coding-bit-backend.onrender.com/api/v1/upload/get-upload-url",
        { fileName: file.name, fileType: file.type }
      );

      if (!uploadData.data.uploadUrl) {
        throw new Error("無法取得上傳 URL");
      }

      const { filePath } = uploadData.data;

      // 2. 將檔案上傳到取得的預簽名
      const res = await axios.post(
        "https://coding-bit-backend.onrender.com/api/v1/upload/get-video-url",
        { filePath: filePath }
      );

      // 3. 更新狀態，儲存影片網址與時長
      if (res.data.videoUrl) {
        setTemVideoData((prevData) => ({
          ...prevData,
          video_url: res.data.videoUrl, // 影片的網址
          video_duration: duration, // 影片的時長
        }));
      }

      Swal.fire({
        icon: "success",
        title: "上傳成功",
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

  const navigate = useNavigate();
  // 處理新增影片的 api 邏輯
  const submitApiRequest = async (apiFunc, data) => {
    setLoadingState(true);
    try {
      const result = await apiFunc(data);
      Swal.fire({
        icon: "success",
        title: "影片新增成功",
      });
      navigate(-1);
      return result;
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: error.response?.message || "發生錯誤，請稍後再試",
      });
    } finally {
      setLoadingState(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Coding∞bit ｜ 新增影片</title>
      </Helmet>
      {loadingState && <Loader />}

      <main className="tutor-add-video-wrap container-fluid pt-4 pb-10 pb-lg-6 py-xxl-0">
        <h1 className="fs-4 fs-lg-2">
          {type === "topicSeries" && "新增章節影片"}
          {type === "customLearning" && "新增課程影片 - 客製化學習需求"}
          {type === "freeTipShorts" && "新增課程影片 - 實用技術短影片"}
        </h1>

        <div className="row">
          <div className="col-xxl-6">
            <div className="mt-6 mt-lg-8 px-xl-11">
              <div className="video-upload-wrapper w-100 mt-1">
                {/* 隱藏的影片上傳 Input */}
                <input
                  type="file"
                  accept="video/mp4,video/webm,video/ogg"
                  className="form-control w-100 p-0"
                  id="video"
                  onChange={videoUpload}
                />

                {/* 未上傳時的提示 */}
                {!temVideoData.video_url && (
                  <label
                    htmlFor="video"
                    className="form-label video-upload-label w-100 mb-0"
                  >
                    <span className="material-symbols-outlined mb-2">
                      video_file
                    </span>
                    上傳影片
                  </label>
                )}

                {/* 預覽上傳的影片 */}
                {temVideoData.video_url && (
                  <div className="video-preview">
                    <video
                      src={temVideoData.video_url}
                      controls
                      className="w-100"
                    ></video>
                  </div>
                )}
              </div>
              {temVideoData.video_url && (
                <div>
                  <button
                    type="button"
                    className="btn btn-none link-danger f-align-center ms-auto"
                    onClick={() => {
                      setTemVideoData((prevData) => ({
                        ...prevData,
                        video_url: "",
                      }));
                      document.getElementById("video").value = "";
                    }}
                  >
                    移除影片
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              )}

              <div className="bg-brand-05 rounded-4 mt-8 mt-lg-10 p-6 p-lg-8">
                <h2 className="fs-5 fs-lg-4 text-brand-03">影片上傳注意事項</h2>
                <ul className="py-4">
                  <li>
                    <p className="fs-6 mt-2">
                      1. 課程影片應以高畫質（HD）錄製並輸出，建議至少達到 720p
                      或 1080p 的解析度。
                    </p>
                  </li>
                  <li className="mt-4 mt-lg-5">
                    <p className="fs-6 mt-2">
                      2. 音訊需為立體聲（左右聲道），並與影片畫面完全同步。
                    </p>
                  </li>
                  <li className="mt-4 mt-lg-5">
                    <p className="fs-6 mt-2">
                      3.
                      音訊應保持清晰，避免回音和背景雜音，以確保學生能專注於學習內容。
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {type === "topicSeries" ? (
            <AddCourseVideoContent
              submitApiRequest={submitApiRequest}
              setLoadingState={setLoadingState}
              video_url={temVideoData.video_url}
              video_duration={temVideoData.video_duration}
            />
          ) : (
            <AddContent
              submitApiRequest={submitApiRequest}
              setLoadingState={setLoadingState}
              video_url={temVideoData.video_url}
              video_duration={temVideoData.video_duration}
              type={type}
            />
          )}
        </div>
      </main>
    </>
  );
}
