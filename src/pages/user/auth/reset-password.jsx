import { useState, useEffect } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";

import Swal from "sweetalert2";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import authApi from "@/api/authApi";

import FormInput from "@/components/common/FormInput";

export default function ResetPassword() {
  // loading
  const [loadingState, setLoadingState] = useState(false);

  // 從路由找出 token
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const navigate = useNavigate();

  // Zod 驗證規則
  const schema = z
    .object({
      newPassword: z
        .string()
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?~-])/,
          "密碼必須包含 1 個特殊符號、1 個大寫英文字母、1 個小寫英文字母與 1 個數字"
        )
        .min(9, "密碼必須至少超過 8 碼"),

      checkPassword: z.string(),
    })
    .superRefine(({ newPassword, checkPassword }, ctx) => {
      if (newPassword !== checkPassword) {
        ctx.addIssue({
          path: ["checkPassword"],
          message: "兩次密碼輸入不一致",
          code: "custom",
        });
      }
    });

  // 驗證
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  // 重設密碼函式
  const onSubmit = async (data) => {
    const { newPassword } = data;
    setLoadingState(true);
    try {
      await authApi.resetPassword({ token: token, newPassword: newPassword });
      Swal.fire({
        title: "密碼重設成功",
        icon: "success",
      });
      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "密碼重設失敗",
        text: error.response?.data?.message || "發生錯誤，請稍後再試",
      });
    } finally {
      setLoadingState(false);
    }
  };

  // 隱碼按鈕邏輯
  const [showPasswordList, setShowPasswordList] = useState([false, false]);

  const handleShowPassword = (index) => {
    setShowPasswordList((prevState) =>
      prevState.map((show, i) => (i === index ? !show : show))
    );
  };

  // 初始化 - 確認有無 token
  useEffect(() => {
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "請重新傳送連結",
        text: "重設密碼連結錯誤，請重新傳送",
      });
      navigate("/forgot-password");
    }
  }, [navigate, token]);

  return (
    <>
      <Helmet>
        <title>Coding∞bit ｜ 重設密碼</title>
      </Helmet>

      <style>{`body { background-color: #c0c4df; }`}</style>
      <main className="forgot-password-section bg">
        <div className="container">
          <NavLink to="/" className="navbar-brand">
            <picture>
              <source
                srcSet="images/logo-sm.svg"
                media="(max-width: 575.98px)"
              />
              <img src="images/logo.svg" alt="logo-image" />
            </picture>
          </NavLink>
          <div className="row f-end-center my-9 my-lg-13">
            <div className="col-lg-6">
              <div className="user-auth-card card border-0 rounded-2">
                <div className="card-body px-6 py-10 p-lg-13">
                  <h1 className="fs-4 fs-lg-3 text-brand-03">重設密碼</h1>
                  <form
                    className="mt-6 mt-lg-8"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="position-relative">
                      <FormInput
                        style="underline"
                        inputIcon="lock"
                        register={register}
                        errors={errors}
                        id="newPassword"
                        labelText="密碼"
                        type={showPasswordList[0] ? "text" : "password"}
                      />
                      <span className="material-symbols-outlined position-absolute top-0 text-gray-03 ms-1 mt-1">
                        lock
                      </span>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleShowPassword(0);
                        }}
                      >
                        <span className="material-symbols-outlined position-absolute top-0 end-0 text-gray-03 ms-1 mt-1">
                          {showPasswordList[0]
                            ? "visibility"
                            : "visibility_off"}
                        </span>
                      </a>
                    </div>
                    <div className="position-relative mt-9">
                      <FormInput
                        style="underline"
                        inputIcon="lock"
                        register={register}
                        errors={errors}
                        id="checkPassword"
                        labelText="密碼"
                        type={showPasswordList[1] ? "text" : "password"}
                      />
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleShowPassword(1);
                        }}
                      >
                        <span className="material-symbols-outlined position-absolute top-0 end-0 text-gray-03 ms-1 mt-1">
                          {showPasswordList[1]
                            ? "visibility"
                            : "visibility_off"}
                        </span>
                      </a>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-brand-03 rounded-2 slide-right-hover w-100 f-center mt-6 mt-lg-10"
                      id="resetPasswordBtn"
                      disabled={!isValid}
                    >
                      確認修改
                      <span className="material-symbols-outlined icon-fill fs-6 fs-md-5 mt-1 ms-1">
                        arrow_forward
                      </span>
                      {loadingState && (
                        <span
                          className="spinner-border text-brand-01 ms-2"
                          style={{ width: "20px", height: "20px" }}
                          role="status"
                        ></span>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
