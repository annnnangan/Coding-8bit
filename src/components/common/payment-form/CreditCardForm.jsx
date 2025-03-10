import { useFormContext } from "react-hook-form";
export const CreditCardForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="mt-6">
      <div className="form-check">
        <input className="form-check-input" type="radio" name="pay-with" id="creditCard" defaultChecked />
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
          className={`form-control rounded-1 border-0 bg-light mt-1 ${errors?.userCreditCardNumber && "is-invalid"}`}
          id="userCreditCardNumber"
          placeholder="**** **** **** ****"
          maxLength="19"
          {...register("userCreditCardNumber")}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, ""); // 移除所有非數字字符
            e.target.value = value.replace(/(\d{4})(?=\d)/g, "$1 "); // 每4位數添加空格
          }}
        />
        {errors?.userCreditCardNumber && <div className="invalid-feedback">{errors?.userCreditCardNumber?.message}</div>}
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
            className={`form-control rounded-1 border-0 bg-light mt-1 ${errors?.creditCardExpiration && "is-invalid"}`}
            id="creditCardExpiration"
            placeholder="MM / YY"
            maxLength="5"
            required=""
            {...register("creditCardExpiration")}
          />
          {errors?.creditCardExpiration && <div className="invalid-feedback">{errors?.creditCardExpiration?.message}</div>}
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
            className={`form-control rounded-1 border-0 bg-light mt-1 ${errors?.creditCardCvc && "is-invalid"}`}
            id="creditCardCvc"
            placeholder="CVC / CVV"
            maxLength="3"
            required=""
            {...register("creditCardCvc")}
          />
          {errors?.creditCardCvc && <div className="invalid-feedback">{errors?.creditCardCvc?.message}</div>}
        </div>
      </div>
      <div className="form-check mt-6">
        <input type="checkbox" className="form-check-input" id="rememberCardCheckbox" />
        <label className="form-check-label" htmlFor="rememberCardCheckbox">
          記住卡片資訊
        </label>
      </div>
    </div>
  );
};
