import { useState } from "react";
import { useForm } from "react-hook-form";

import FormInput from "../common/FormInput";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      checkPassword: "",
    },
    mode: "onTouched",
  });
  const onSubmit = (data) => {
    console.log(data);
  };

  // 隱碼按鈕邏輯
  const [showPasswordList, setShowPasswordList] = useState([false, false]);

  const handleShowPassword = (index) => {
    setShowPasswordList((prevState) =>
      prevState.map((show, i) => (i === index ? !show : show))
    );
  };

  return (
    <form className="mt-6 mt-lg-11" onSubmit={handleSubmit(onSubmit)}>
      <div className="position-relative">
        <FormInput
          style="underline"
          inputIcon="person"
          register={register}
          errors={errors}
          id="username"
          labelText="暱稱"
          type="text"
          rules={{
            required: {
              value: true,
              message: "暱稱為必填",
            },
          }}
        />
      </div>
      <div className="position-relative mt-9">
        <FormInput
          style="underline"
          inputIcon="mail"
          register={register}
          errors={errors}
          id="email"
          labelText="電子信箱"
          type="email"
          rules={{
            required: {
              value: true,
              message: "電子信箱為必填",
            },
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Email 格式不正確",
            },
          }}
        />
      </div>
      <div className="position-relative mt-9">
        <FormInput
          style="underline"
          inputIcon="lock"
          register={register}
          errors={errors}
          id="password"
          labelText="密碼"
          type={showPasswordList[0] ? "text" : "password"}
          rules={{
            required: {
              value: true,
              message: "密碼為必填",
            },
            pattern: {
              value: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
              message: "密碼必須至少超過8碼，且包含英文字母與數字",
            },
          }}
        />
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleShowPassword(0);
          }}
        >
          <span className="material-symbols-outlined position-absolute top-0 end-0 text-gray-03 ms-1 mt-1">
            {showPasswordList[0] ? "visibility" : "visibility_off"}
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
          rules={{
            required: {
              value: true,
              message: "再次輸入密碼為必填",
            },
            pattern: {
              value: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
              message: "密碼必須至少超過8碼，且包含英文字母與數字",
            },
          }}
        />
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleShowPassword(1);
          }}
        >
          <span className="material-symbols-outlined position-absolute top-0 end-0 text-gray-03 ms-1 mt-1">
            {showPasswordList[1] ? "visibility" : "visibility_off"}
          </span>
        </a>
      </div>
      <button
        type="submit"
        className="btn btn-brand-03 rounded-2 slide-right-hover w-100 f-center mt-6 mt-lg-10"
        id="signUpBtn"
        disabled={!isValid}
      >
        註冊帳號
        <span className="material-symbols-outlined icon-fill fs-6 fs-md-5 mt-1 ms-1">
          arrow_forward
        </span>
      </button>
    </form>
  );
}
