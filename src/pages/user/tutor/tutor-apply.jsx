import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useSelector, useDispatch } from "react-redux";
import { loginCheck, getUserData } from "@/utils/slice/authSlice";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";

import tutorApi from "@/api/tutorApi";
import userApi from "@/api/userApi";

import FormInput from "@/components/common/FormInput";
import Loader from "@/components/common/Loader";

export default function TutorApply() {
  // loading
  const [loadingState, setLoadingState] = useState(false);

  // 切換步驟
  const [currentStep, setCurrentStep] = useState(1);
  const toNextStep = async () => {
    if (currentStep === 1) {
      setCurrentStep((currentStep) => currentStep + 1);
    }
  };
  const toPrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((step) => step - 1);
    }
  };

  // Zod 驗證規則
  const schema = z.object({
    expertise: z.string().min(1, "專長為必填"),
    slogan: z.string().min(1, "標語為必填"),
    hourly_rate: z.string().min(1, "預約價格 / 小時為必填"),
    about: z.string().min(1, "關於我為必填"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  // 送出講師申請表單
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    setLoadingState(true);
    try {
      await Promise.all([
        userApi.addRole(userData.id, "tutor"),
        userApi.changeUserRole("tutor"),
        tutorApi.applyTutor({ user_id: userData.id, ...data, rating: 5.0 }),
      ]);

      Swal.fire({
        title: "申請成功",
        icon: "success",
      });
      navigate("/tutor-panel");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "申請失敗",
        text: error?.response?.data || "申請失敗",
      });
    } finally {
      setLoadingState(false);
    }
  };

  // auth
  const { isAuth, userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)authToken\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  const subscriptions = userData?.subscriptions || [];
  const hasPremium = subscriptions.some(
    (item) => item.plan_name === "premium" && item.status === "active"
  );
  const hasBasic = subscriptions.some(
    (item) => item.plan_name === "basic" && item.status === "active"
  );

  // 初始化 - 取得使用者資料
  useEffect(() => {
    if (token) {
      dispatch(getUserData());
      setLoadingState(false);
    }
  }, [isAuth]);

  // 初始化 - 驗證身分
  useEffect(() => {
    if (token) {
      dispatch(loginCheck());
    } else {
      setLoadingState(false);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Coding∞bit ｜ 成為講師</title>
      </Helmet>
      {loadingState && <Loader />}

      <main className="tutor-apply-section">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <NavLink to="/" className="underline-hover">
                  首頁
                </NavLink>
              </li>
              <li
                className="breadcrumb-item active fw-semibold"
                aria-current="page"
              >
                申請成為講師
              </li>
            </ol>
          </nav>
          {currentStep === 1 && (
            <>
              <h1 className="text-brand-03 mt-8">成為講師</h1>
              <p className="fs-5 mt-3">
                如果您是基本會員，即可加入講師，享有以下功能
              </p>
              <div className="tutor-apply-info-wrap">
                <ul className="fs-6 fs-md-5 mt-8 mt-lg-12">
                  <li className="f-align-center mt-4 mt-lg-4">
                    <span className="material-symbols-outlined icon-fill text-brand-03">
                      check_circle
                    </span>
                    <p className="fw-medium lh-sm ms-4">專屬的講師後台</p>
                  </li>
                  <li className="f-align-center mt-4 mt-lg-4">
                    <span className="material-symbols-outlined icon-fill text-brand-03">
                      check_circle
                    </span>
                    <p className="fw-medium lh-sm ms-4">
                      可上傳及發佈課程影片，將您的知識分享給更多學員
                    </p>
                  </li>
                  <li className="f-align-center mt-4 mt-lg-4">
                    <span className="material-symbols-outlined icon-fill text-brand-03">
                      check_circle
                    </span>
                    <p className="fw-medium lh-sm ms-4">
                      可開啟預約功能，讓其他學員預約您的一對一教學和程式碼檢視服務
                    </p>
                  </li>
                  <li className="f-align-center mt-4 mt-lg-4">
                    <span className="material-symbols-outlined icon-fill text-brand-03 flex-shrink-1">
                      check_circle
                    </span>
                    <p className="fw-medium lh-sm ms-4 flex-grow-1">
                      可回應其他學員的客製化需求
                    </p>
                  </li>
                </ul>
                <div className="mt-8 mt-lg-13">
                  {!hasPremium && !hasBasic && (
                    <div className="text-end mb-1">
                      <small className="fs-7 text-brand-03">
                        訂閱基本會員後即可申請成為講師
                      </small>
                    </div>
                  )}
                  <div className="f-end-center">
                    <NavLink
                      to="/"
                      className="btn btn-outline-brand-03 border-1 rounded-2 f-align-center px-md-11"
                    >
                      取消
                    </NavLink>
                    <button
                      className="btn btn-brand-03 rounded-2 slide-right-hover f-align-center ms-4 px-md-10"
                      disabled={!hasPremium && !hasBasic}
                      onClick={toNextStep}
                    >
                      前往填寫講師個人資料
                      <span className="material-symbols-outlined icon-fill fs-4 ms-1">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
          {currentStep === 2 && (
            <>
              <h1 className="fs-4 fs-lg-1 text-brand-03 mt-8">填寫講師資料</h1>
              <p className="fs-6 fs-lg-5 mt-3">
                成為講師前，請填寫相關資料，讓其他學員認識您
              </p>
              <form
                className="row pt-6 pt-md-8 f-center"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="col-lg-8">
                  <div>
                    <div className="fs-6 mt-2 mt-md-4">
                      <FormInput
                        register={register}
                        errors={errors}
                        id="expertise"
                        labelText="專長 (以半形逗號隔開 ex.Vue,React,JavaScript)"
                        type="text"
                      />
                    </div>
                    <div className="fs-6 mt-2 mt-md-4">
                      <FormInput
                        register={register}
                        errors={errors}
                        id="slogan"
                        labelText="標語 (請以一句話形容自己 ex.熱愛學習的前端工程師)"
                        type="text"
                      />
                    </div>
                    <div className="fs-6 mt-2 mt-md-4">
                      <FormInput
                        register={register}
                        errors={errors}
                        id="hourly_rate"
                        labelText="預約價格 / 小時 (請輸入給學員預約時的金額 / 小時 ex. 50)"
                        type="text"
                      />
                    </div>
                    <div className="fs-6 mt-2 mt-md-4">
                      <label className="form-label" htmlFor="about">
                        關於我
                        <span className="text-danger">*</span>
                      </label>
                      <textarea
                        className={`form-control ${
                          errors.about && "is-invalid"
                        }`}
                        id="about"
                        rows="5"
                        placeholder="請介紹一下自己 (ex. 經歷、教學風格等)"
                        {...register("about")}
                      ></textarea>
                      {errors.about && (
                        <div className="invalid-feedback">
                          {errors?.about.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="f-end-center mt-8 mt-lg-13">
                  <button
                    type="button"
                    className="btn btn-outline-brand-03 border-1 rounded-2 f-align-center px-md-11"
                    onClick={toPrevStep}
                  >
                    上一步
                  </button>
                  <button
                    type="submit"
                    className="btn btn-brand-03 rounded-2 slide-right-hover f-align-center ms-4 px-md-10"
                    disabled={!isValid}
                  >
                    確認申請
                    <span className="material-symbols-outlined icon-fill fs-4 ms-1">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </main>
    </>
  );
}
