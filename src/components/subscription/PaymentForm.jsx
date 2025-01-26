import { forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";

import PropTypes from "prop-types";

export const PaymentForm = forwardRef(({ setFormData }, ref) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userCreditCardNumber: "",
      creditCardExpiration: "",
      creditCardCvc: "",
    },
    mode: "onTouched",
  });

  // 信用卡卡號驗證
  const luhnCheck = (cardNumber) => {
    // 移除空格和非數字字符
    const sanitizedNumber = cardNumber.replace(/\D/g, "");

    const digits = sanitizedNumber.split("").reverse().map(Number);

    const checkDigit = digits.splice(0, 1)[0];
    const sum = digits
      .map((digit, index) => (index % 2 === 0 ? digit * 2 : digit))
      .map((digit) => (digit > 9 ? digit - 9 : digit))
      .reduce((total, current) => total + current, 0);

    return (sum + checkDigit) % 10 === 0;
  };

  // 使用 useImperativeHandle 將 handleSubmit 傳給父元件
  useImperativeHandle(ref, () => ({
    submitForm: handleSubmit(onSubmit),
  }));

  const onSubmit = (data) => {
    if (Object.keys(errors).length === 0) {
      setFormData((prevData) => ({
        ...prevData,
        creditCardForm: data,
      }));
    } else {
      console.log("表單有錯誤:", errors);
    }
  };

  return (
    <form className="mt-6">
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="pay-with"
          id="creditCard"
          defaultChecked
        />
        <label className="form-check-label" htmlFor="creditCard">
          信用卡
        </label>
      </div>
      <div className="mt-6">
        <label htmlFor="userCreditCardNumber" className="form-label">
          <h3 className="fs-6 fw-medium">
            信用卡號碼
            <span className="text-danger ms-1">*</span>
          </h3>
        </label>
        <input
          type="text"
          inputMode="numeric"
          className={`form-control rounded-1 border-0 bg-light mt-1 ${
            errors.userCreditCardNumber && "is-invalid"
          }`}
          id="userCreditCardNumber"
          placeholder="**** **** **** ****"
          maxLength="19"
          {...register("userCreditCardNumber", {
            required: {
              value: true,
              message: "信用卡號碼為必填",
            },
            validate: {
              luhnCheck: (value) => luhnCheck(value) || "無效的信用卡號碼",
            },
          })}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, ""); // 移除所有非數字字符
            e.target.value = value.replace(/(\d{4})(?=\d)/g, "$1 "); // 每4位數添加空格
          }}
        />
        {errors.userCreditCardNumber && (
          <div className="invalid-feedback">
            {errors?.userCreditCardNumber?.message}
          </div>
        )}
      </div>
      <div className="row mt-4">
        <div className="col-6">
          <label htmlFor="creditCardExpiration" className="form-label">
            <h3 className="fs-6 fw-medium">
              過期日<span className="text-danger ms-1">*</span>
            </h3>
          </label>
          <input
            type="text"
            inputMode="numeric"
            className={`form-control rounded-1 border-0 bg-light mt-1 ${
              errors.creditCardExpiration && "is-invalid"
            }`}
            id="creditCardExpiration"
            placeholder="MM / YY"
            maxLength="5"
            required=""
            {...register("creditCardExpiration", {
              required: {
                value: true,
                message: "過期日為必填",
              },
              pattern: {
                value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                message: "過期日格式錯誤 (MM / YY)",
              },
            })}
          />
          {errors.creditCardExpiration && (
            <div className="invalid-feedback">
              {errors?.creditCardExpiration?.message}
            </div>
          )}
        </div>
        <div className="col-6">
          <label htmlFor="creditCardCvc" className="form-label">
            <h3 className="fs-6 fw-medium">
              卡片背面後三碼
              <span className="text-danger ms-1">*</span>
            </h3>
          </label>
          <input
            type="text"
            inputMode="numeric"
            className={`form-control rounded-1 border-0 bg-light mt-1 ${
              errors.creditCardCvc && "is-invalid"
            }`}
            id="creditCardCvc"
            placeholder="CVC / CVV"
            pattern="\d{3,4}/"
            maxLength="3"
            required=""
            {...register("creditCardCvc", {
              required: {
                value: true,
                message: "卡片背面後三碼為必填",
              },
              pattern: {
                value: /^\d{3,4}$/,
                message: "CVC / CVV 格式錯誤",
              },
            })}
          />
          {errors.creditCardCvc && (
            <div className="invalid-feedback">
              {errors?.creditCardCvc?.message}
            </div>
          )}
        </div>
      </div>
      <div className="form-check mt-6">
        <input
          type="checkbox"
          className="form-check-input"
          id="rememberCardCheckbox"
        />
        <label className="form-check-label" htmlFor="rememberCardCheckbox">
          記住卡片資訊
        </label>
      </div>
    </form>
  );
});

PaymentForm.displayName = "PaymentForm";
PaymentForm.propTypes = {
  setFormData: PropTypes.func.isRequired,
};
