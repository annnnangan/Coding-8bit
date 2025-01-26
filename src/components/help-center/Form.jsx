import { useForm } from "react-hook-form";

import FormInput from "../common/FormInput";

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: "",
      tel: "",
      email: "",
      message: "",
    },
    mode: 'onTouched'
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form
      className="row g-3 bg-brand-05 p-3 px-sm-6 py-sm-8 mt-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="col-md-6">
        <FormInput
          register={register}
          errors={errors}
          id="name"
          labelText="姓名"
          type="text"
          rules={{
            required: {
              value: true,
              message: "姓名為必填",
            },
          }}
        />
      </div>
      <div className="col-md-6">
        <FormInput
          register={register}
          errors={errors}
          id="tel"
          labelText="電話"
          type="tel"
          rules={{
            required: {
              value: true,
              message: "電話為必填",
            },
            minLength: {
              value: 8,
              message: "電話不少於 8 碼",
            },
            maxLength: {
              value: 12,
              message: "電話不多於 12 碼",
            },
          }}
        />
      </div>
      <div className="col-12">
        <FormInput
          register={register}
          errors={errors}
          id="email"
          labelText="信箱"
          type="email"
          rules={{
            required: {
              value: true,
              message: "信箱為必填",
            },
            pattern: {
              value: /^\S+@\S+$/i,
              message: "信箱格式不正確",
            },
          }}
        />
      </div>
      <div className="col-12">
        <label htmlFor="message" className="form-label">
          聯繫內容
        </label>
        <textarea
          className={`form-control ${errors.email && "is-invalid"}`}
          id="message"
          rows="5"
          placeholder="請輸入想聯繫我們的內容"
          {...register("message", {
            required: {
              value: true,
              message: "內容為必填",
            },
          })}
        ></textarea>
        {errors.message && (
          <div className="invalid-feedback">{errors?.message?.message}</div>
        )}
      </div>

      <div className="col-12 text-end">
        <button
          type="submit"
          className="btn btn-brand-03 rounded-1 slide-right-hover mt-4"
          disabled={!isValid}
        >
          送出表單
        </button>
      </div>
    </form>
  );
}
