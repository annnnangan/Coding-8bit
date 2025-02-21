import { useState, useRef } from "react";
import { Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ReactQuill from "react-quill-new";
import Swal from "sweetalert2";
import axios from "axios";
import PropTypes from "prop-types";

import courseApi from "../../../../api/courseApi";

import FormInput from "../../../common/FormInput";

export default function AddContent({
  submitApiRequest,
  setLoadingState,
  setIsAddingChapter,
}) {
  // 返回上一頁
  const navigate = useNavigate();
  const toPrevPage = () => {
    navigate(-1);
  };
  const categories = [
    { id: 1, name: "HTML / CSS" },
    { id: 2, name: "JavaScript" },
    { id: 3, name: "React" },
    { id: 4, name: "Vue" },
    { id: 5, name: "UI / UX" },
    { id: 6, name: "Python" },
    { id: 7, name: "Node.js" },
  ];

  // 上傳圖片函式
  const [temData, setTemData] = useState({});
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
    const MAX_FILE_SIZE_MB = 50;
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
        "https://coding-bit-backend.onrender.com/api/v1/upload/get-upload-url",
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
      setTemData((prevData) => {
        return {
          ...prevData,
          cover_image: downloadUrl || filePath,
        };
      });
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

  // 驗證規則
  const schema = z.object({
    title: z.string().min(1, "請輸入系列課程標題"),
    description: z
      .string()
      .min(1, "請輸入課程描述")
      .max(500, "課程描述長度不能超過500字符"),
    is_public: z.boolean().refine((value) => typeof value === "boolean", {
      message: "請選擇瀏覽權限",
    }),
    category: z.string().min(1, "請選擇工具與語言"),
    tags: z.string().min(1, "請輸入關鍵字"),
  });

  // 表單驗證
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      is_public: true,
    },
    mode: "onTouched",
  });

  // 表單提交
  const quillRef = useRef(null);
  const onSubmit = async (data) => {
    if (temData.cover_image) {
      const descriptionText = quillRef.current?.getEditor().getText();

      if (descriptionText) {
        setValue("description", descriptionText);
      }

      const requestData = { ...data, ...temData, is_free: false };

      await submitApiRequest(courseApi.addCourse, requestData);
      setIsAddingChapter(true);
    } else {
      Swal.fire({
        icon: "error",
        title: "請確認封面圖片是否已上傳",
      });
    }
  };

  return (
    <div className="col-lg-8">
      <div className="course-content-wrap card-column pe-10">
        <form className="mt-6 mt-lg-8" onSubmit={handleSubmit(onSubmit)}>
          <h4 className="fs-7 fw-normal text-gray-01 lh-base">圖片</h4>
          <div className="image-upload-wrapper mt-1">
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              className="form-control p-0"
              id="cover_image"
              onChange={imgUpload}
            />
            <label
              htmlFor="cover_image"
              className="form-label image-upload-label mb-0"
            >
              <span className="material-symbols-outlined mb-2">imagesmode</span>
              上傳課程封面圖片
            </label>

            {/* 上傳圖片後的樣子 */}
            {temData.cover_image && (
              <div className="img-wrapper border-0 p-0">
                <img
                  src={temData.cover_image}
                  alt="course-cover_image"
                  className="w-100 object-fit"
                />
                <button
                  type="button"
                  onClick={() =>
                    setTemData((prevData) => {
                      return {
                        ...prevData,
                        cover_image: "",
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
          </div>

          <div className="mt-6 mt-lg-8">
            <FormInput
              register={register}
              errors={errors}
              id="title"
              labelText="系列課程標題"
              type="text"
            />
          </div>

          <div className="mt-6 mt-lg-8">
            <div className="row">
              <div className="col">
                <label className="form-label">瀏覽權限</label>
                <div className="dropdown">
                  <button
                    type="button"
                    className="btn btn-outline-gray-03 text-gray-01 border-1 dropdown-toggle d-block w-100 text-start px-4"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {watch("is_public") ? "公開" : "不公開"}
                    <span className="material-symbols-outlined position-absolute end-0 pe-3">
                      keyboard_arrow_down
                    </span>
                  </button>
                  <ul className="dropdown-menu w-100 mt-1">
                    <li>
                      <button
                        type="button"
                        className="dropdown-item"
                        onClick={() => setValue("is_public", true)}
                      >
                        公開
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="dropdown-item"
                        onClick={() => setValue("is_public", false)}
                      >
                        不公開
                      </button>
                    </li>
                  </ul>
                </div>
                {errors.is_public && (
                  <p className="text-danger">{errors.is_public.message}</p>
                )}
              </div>

              <div className="col">
                <label className="form-label" htmlFor="tech_stack">
                  開發工具與語言
                </label>
                <div className="dropdown">
                  <button
                    type="button"
                    className="btn btn-outline-gray-03 text-gray-01 border-1 dropdown-toggle d-block w-100 text-start px-4 position-relative"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {watch("category") || "請選擇工具與語言"}
                    <span className="material-symbols-outlined position-absolute end-0 pe-3">
                      keyboard_arrow_down
                    </span>
                  </button>
                  <ul className="dropdown-menu w-100 mt-1">
                    {categories.map((category) => (
                      <li key={category.id}>
                        <button
                          type="button"
                          className="dropdown-item"
                          onClick={() => setValue("category", category.name)}
                        >
                          {category.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 mt-lg-8">
            <FormInput
              register={register}
              errors={errors}
              id="tags"
              labelText="關鍵字 (請用半型逗號隔開)"
              type="text"
            />
          </div>

          <div className="pb-8 mt-6 mt-lg-8">
            <label htmlFor="description" className="form-label">
              課程描述
            </label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <ReactQuill
                  {...field}
                  value={field.value || ""}
                  ref={quillRef}
                  onChange={field.onChange}
                  placeholder="請描述課程目標、課程大綱等內容，幫助學習者快速了解。"
                />
              )}
            />
            {errors.description && (
              <p className="fs-7 text-danger">{errors?.description?.message}</p>
            )}
          </div>

          <div className="btn-container text-end mt-auto">
            <button
              type="button"
              className="btn btn-outline-brand-03 rounded-2 border-3"
              style={{ padding: "9px 24px" }}
              onClick={toPrevPage}
            >
              取消
            </button>
            <button
              type="submit"
              className="btn btn-brand-03 rounded-2 ms-4"
              disabled={!isValid}
            >
              新增課程
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

AddContent.propTypes = {
  submitApiRequest: PropTypes.func.isRequired,
  setLoadingState: PropTypes.func.isRequired,
  setIsAddingChapter: PropTypes.func,
  setNewCourseId: PropTypes.func,
};
