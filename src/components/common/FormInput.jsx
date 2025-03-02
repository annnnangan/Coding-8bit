import PropTypes from "prop-types";

export default function FormInput({
  style = "",
  inputIcon = "",
  errors,
  register,
  id,
  labelText,
  type,
}) {
  return (
    <>
      {style === "" && (
        <>
          <label htmlFor={id} className="form-label">
            {labelText}
          </label>
          <span className="text-danger">*</span>
        </>
      )}
      {style === "payInput" && (
        <label htmlFor="buyerEmail" className="form-label">
          <h3 className="fs-6 fw-medium">
            {labelText}
            <span className="text-danger ms-1">*</span>
          </h3>
        </label>
      )}

      <input
        type={type}
        className={`form-control ${errors[id] && "is-invalid"} ${
          style === "underline" && "underline-input"
        } ${style === "payInput" && "rounded-1 border-0 bg-light"}`}
        id={id}
        placeholder={
          id === "checkPassword"
            ? "請再次輸入您的密碼"
            : `請輸入您的${labelText}`
        }
        {...register(id)}
      />

      {style === "underline" && (
        <span className="material-symbols-outlined position-absolute top-0 text-gray-03 ms-1 mt-1">
          {inputIcon}
        </span>
      )}

      {errors[id] && (
        <div className="invalid-feedback">{errors?.[id]?.message}</div>
      )}
    </>
  );
}

FormInput.propTypes = {
  style: PropTypes.string,
  inputIcon: PropTypes.string,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object,
  id: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  type: PropTypes.string,
};
