import PropTypes from "prop-types";

export default function FormSubmitButton({
  isLoading,
  buttonText,
  loadingText,
  roundedRadius,
  withIcon = false,
  materialIconName = "arrow_forward",
  withSlideRightAnimation = false,
  handleClick,
  buttonStyle,
}) {
  return (
    <button
      type="submit"
      className={`btn btn-brand-03 f-center rounded-${roundedRadius}${withSlideRightAnimation ? " slide-right-hover" : ""} ${buttonStyle}`}
      disabled={isLoading}
      {...(handleClick ? { onClick: handleClick } : {})} // Conditionally add onClick if handleClick exists
    >
      {isLoading ? (
        <>
          <span role="status">{loadingText}</span>
          <span className="ms-1 spinner-border spinner-border-sm" aria-hidden="true"></span>
        </>
      ) : (
        <>
          {buttonText}
          {withIcon && <span className="material-symbols-outlined icon-fill fs-6 fs-md-5 mt-1 ms-1"> {materialIconName} </span>}
        </>
      )}
    </button>
  );
}

// Prop validation
FormSubmitButton.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  buttonText: PropTypes.string.isRequired,
  loadingText: PropTypes.string.isRequired,
  roundedRadius: PropTypes.number.isRequired,
  withIcon: PropTypes.bool,
  materialIconName: PropTypes.string,
  withSlideRightAnimation: PropTypes.bool,
  handleClick: PropTypes.func,
  buttonStyle: PropTypes.string,
};
