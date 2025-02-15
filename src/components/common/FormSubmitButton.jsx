import PropTypes from "prop-types";

export default function FormSubmitButton({ isLoading, buttonText, loadingText, roundedRadius }) {
  return (
    <button type="submit" className={`btn btn-brand-03 rounded-${roundedRadius}`} disabled={isLoading}>
      {isLoading ? (
        <>
          <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
          <span role="status">{loadingText}</span>
        </>
      ) : (
        buttonText
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
};
