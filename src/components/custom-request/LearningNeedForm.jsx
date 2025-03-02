import { useState, useEffect, useRef, lazy, Suspense, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

const ReactQuill = lazy(() => import("react-quill-new"));
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../common/FormInput";
import Swal from "sweetalert2";
import axios from "axios";

import Loader from "@/components/common/Loader";

import { categories } from "@/data/courses";
import customRequestsApi from "../../api/customRequestsApi";

export default function LearningNeedForm() {
  // loading
  const [loadingState, setLoadingState] = useState(false);

  // 返回上一頁
  const navigate = useNavigate();
  const toPrevPage = () => {
    navigate(-1);
  };

  // 初始化 - 加載文字編輯器
  const [editorLoaded, setEditorLoaded] = useState(false);
  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  // level data
  const levels = useMemo(
    () => [
      { id: 1, name: "Lv.0 - 什麼都不會的小萌新" },
      { id: 2, name: "Lv.1 - 略懂略懂的小菜鳥" },
      { id: 3, name: "Lv.2 - 可獨立學習的勇者" },
      { id: 4, name: "Lv.3 - 有多年 coding 經驗的大神" },
    ],
    []
  );

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

  // 新增需求函式
  const addRequest = async (data) => {
    setLoadingState(true);
    try {
      console.log(data)
      const result = await customRequestsApi.addCustomRequest(data);
      console.log(result)
      await customRequestsApi.addCustomRequestImg({
        request_id: result.id,
        photo_url: temData.cover_image,
      });
      Swal.fire({
        icon: "success",
        title: "新增成功",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response?.data?.message,
      });
    } finally {
      setLoadingState(false);
    }
  };

  // 驗證規則
  const schema = z.object({
    title: z.string().min(1, "請輸入標題"),
    content: z
      .string()
      .min(1, "請輸學習需求描述")
      .max(1000, "課程描述長度不能超過 1000 字符"),
    level: z.string().min(1, "請選擇學習等級"),
    category: z.string().min(1, "請選擇工具與語言"),
    tag: z.string().min(1, "請輸入關鍵字"),
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
    mode: "onTouched",
  });

  // 表單提交
  const quillRef = useRef(null);
  const onSubmit = async (data) => {
    if (temData.cover_image) {
      const contentText = quillRef.current?.getEditor().getText();

      if (contentText) {
        setValue("content", contentText);
      }

      addRequest(data);
    } else {
      Swal.fire({
        icon: "error",
        title: "請確認封面圖片是否已上傳",
      });
    }
  };

  return (
    <>
      {loadingState && <Loader />}

      <div className="learning-need-form-wrap card-column">
        <h1>提出您的學習需求</h1>
        <form className="mt-6 mt-lg-8" onSubmit={handleSubmit(onSubmit)}>
          <h4 className="fs-7 fw-normal text-gray-01 lh-base">
            圖片<span className="text-danger">*</span>
          </h4>
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
              請上傳圖片，讓其他人更容易理解您的需求
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
              labelText={"學習需求標題"}
              type="text"
            />
          </div>

          <div className="mt-6 mt-lg-8">
            <div className="row">
              <div className="col-lg-7">
                <label className="form-label" htmlFor="level">
                  您的學習等級
                  <span className="text-danger">*</span>
                </label>
                <div className="dropdown">
                  <button
                    type="button"
                    className="btn btn-outline-gray-03 text-gray-01 border-1 dropdown-toggle d-block w-100 text-start px-4"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {watch("level") || "請選擇學習等級"}
                    <span className="material-symbols-outlined position-absolute end-0 pe-3">
                      keyboard_arrow_down
                    </span>
                  </button>
                  <ul className="dropdown-menu w-100 mt-1">
                    {levels.map((level) => (
                      <li key={level.id}>
                        <button
                          type="button"
                          className="dropdown-item"
                          onClick={() => setValue("level", level.name)}
                        >
                          {level.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="col-lg-5 mt-6 mt-lg-0">
                <label className="form-label" htmlFor="tech_stack">
                  開發工具與語言
                  <span className="text-danger">*</span>
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
              id="tag"
              labelText="關鍵字 (請用半型逗號隔開)"
              type="text"
            />
          </div>

          <div className="pb-8 mt-6 mt-lg-8">
            <label htmlFor="content" className="form-label">
              學習需求描述
              <span className="text-danger">*</span>
            </label>
            {editorLoaded && (
              <Suspense fallback={<Loader />}>
                <Controller
                  name="content"
                  control={control}
                  render={({ field }) => (
                    <ReactQuill
                      {...field}
                      value={field.value || ""}
                      ref={quillRef}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.content && (
                  <p className="fs-7 text-danger">{errors?.content?.message}</p>
                )}
              </Suspense>
            )}
          </div>

          {/*web button wrap */}
          <div className="btn-container text-end mt-lg-4 d-none d-lg-block">
            <button
              type="submit"
              className="btn btn-outline-brand-03 border-3 w-25"
              style={{ padding: "9px 24px" }}
              onClick={toPrevPage}
            >
              取消
            </button>
            <button
              type="submit"
              className="btn btn-brand-03 ms-4"
              disabled={!isValid}
            >
              提出學習需求
            </button>
          </div>

          {/* media button wrap */}
          <div className="text-end fixed-bottom bg-white shadow d-lg-none py-4">
            <div className="container">
              <div className="d-flex">
                <button
                  type="submit"
                  className="btn btn-outline-brand-03 w-100"
                  onClick={toPrevPage}
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="btn btn-brand-03 w-100 ms-4"
                  disabled={!isValid}
                >
                  提出學習需求
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
