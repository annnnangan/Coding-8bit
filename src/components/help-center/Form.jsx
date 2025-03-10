import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import FormInput from "@/components/common/FormInput";

export default function Form() {
  // Zod 驗證規則
  const schema = z.object({
    name: z.string().min(1, "姓名為必填"),
    tel: z
      .string()
      .min(1, "電話號碼為必填")
      .min(8, "電話不少於 8 碼")
      .max(12, "電話不多於 12 碼"),
    email: z.string().min(1, "信箱為必填").email("請輸入有效的 Email"),
    message: z.string().min(10, "內容為必填，最少須十個字以上"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onTouched",
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
        />
      </div>
      <div className="col-md-6">
        <FormInput
          register={register}
          errors={errors}
          id="tel"
          labelText="電話"
          type="tel"
        />
      </div>
      <div className="col-12">
        <FormInput
          register={register}
          errors={errors}
          id="email"
          labelText="信箱"
          type="email"
        />
      </div>
      <div className="col-12">
        <label htmlFor="message" className="form-label">
          聯繫內容
        </label>
        <textarea
          className={`form-control ${errors.message && "is-invalid"}`}
          id="message"
          rows="5"
          placeholder="請輸入想聯繫我們的內容"
          {...register("message")}
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
