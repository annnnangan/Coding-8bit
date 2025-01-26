import { forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";

import PropTypes from "prop-types";

import FormInput from "../common/FormInput";

export const BuyerForm = forwardRef(({ setFormData }, ref) => {
  {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      defaultValues: {
        buyerEmail: "",
        buyerName: "",
        buyerTel: "",
      },
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
        <div className="row mt-4">
          <div className="col-lg-6">
            <FormInput
              style="payInput"
              register={register}
              errors={errors}
              id="buyerName"
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
          <div className="col-lg-6">
            <FormInput
              style="payInput"
              register={register}
              errors={errors}
              id="buyerTel"
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
