import { forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";

import PropTypes from "prop-types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import FormInput from "../common/FormInput";

export const BuyerForm = forwardRef(({ setFormData }, ref) => {
  // Zod 驗證規則
  const schema = z.object({
    buyerEmail: z.string().min(1, "信箱為必填").email("請輸入有效的 Email"),
    buyerName: z.string().min(1, "姓名為必填"),
    buyerTel: z.string().min(1, "電話號碼為必填").min(8, "電話不少於 8 碼").max(12, "電話不多於 12 碼"),
  });

  {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: zodResolver(schema),
      mode: "onTouched",
    });

    // 使用 useImperativeHandle 將 handleSubmit 傳給父元件
    useImperativeHandle(ref, () => ({
      submitForm: handleSubmit(onSubmit),
    }));

    const onSubmit = (data) => {
      if (Object.keys(errors).length === 0) {
        setFormData((prevData) => ({
          ...prevData,
          buyerForm: data,
        }));
      } else {
        console.log("表單有錯誤:", errors);
      }
    };

    return (
      <form className="mt-6">
        <div>
          <FormInput
            style="payInput"
            register={register}
            errors={errors}
            id="buyerEmail"
            labelText="電子信箱"
            type="email"
          />
        </div>
        <div className="row mt-4">
          <div className="col-lg-6">
            <FormInput
              style="payInput"
              register={register}
              errors={errors}
              id="buyerName"
              labelText="姓名"
              type="text"
            />
          </div>
          <div className="col-lg-6">
            <FormInput
              style="payInput"
              register={register}
              errors={errors}
              id="buyerTel"
              labelText="電話"
              type="tel"
            />
          </div>
        </div>
        <div className="form-check mt-6">
          <input
            type="checkbox"
            className="form-check-input"
            id="rememberMeCheckbox"
          />
          <label className="form-check-label" htmlFor="rememberMeCheckbox">
            記住我的資訊
          </label>
        </div>
      </form>
    );
  }
});

BuyerForm.displayName = "BuyerForm";
BuyerForm.propTypes = {
  setFormData: PropTypes.func.isRequired,
};
