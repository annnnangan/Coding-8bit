import { useFormContext } from "react-hook-form";
import FormInput from "@/components/common/FormInput";

export const BuyerForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="mt-6">
      <div>
        <FormInput style="payInput" register={register} errors={errors} id="buyerEmail" labelText="電子信箱" type="email" />
      </div>
      <div className="row mt-4">
        <div className="col-lg-6">
          <FormInput style="payInput" register={register} errors={errors} id="buyerName" labelText="姓名" type="text" />
        </div>
        <div className="col-lg-6">
          <FormInput style="payInput" register={register} errors={errors} id="buyerTel" labelText="電話" type="tel" />
        </div>
      </div>
      <div className="form-check mt-6">
        <input type="checkbox" className="form-check-input" id="rememberMeCheckbox" />
        <label className="form-check-label" htmlFor="rememberMeCheckbox">
          記住我的資訊
        </label>
      </div>
    </div>
  );
};
