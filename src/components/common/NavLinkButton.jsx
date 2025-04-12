import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

export default function NavLinkButton({
  type = "text",
  text = "更多",
  href,
  withIcon = true,
  icon = "arrow_forward",
  buttonWidth = "w-100",
}) {
  return (
    <>
      {type === "text" && (
        <NavLink to={href} className="text-brand-03 d-flex align-items-center slide-right-hover">
          <p className="me-1">{text}</p>
          {withIcon && <span className="material-symbols-outlined icon-fill fs-5">{icon}</span>}
        </NavLink>
      )}

      {type === "button" && (
        <NavLink to={href} className="slide-right-hover">
          <button
            className={`btn btn-brand-03 d-flex align-items-center justify-content-center ${buttonWidth}`}
          >
            <p className="me-1">{text}</p>
            {withIcon && <span className="material-symbols-outlined icon-fill fs-5">{icon}</span>}
          </button>
        </NavLink>
      )}
    </>
  );
}
NavLinkButton.propTypes = {
  type: PropTypes.oneOf(["text", "button"]),
  text: PropTypes.string,
  href: PropTypes.string.isRequired,
  withIcon: PropTypes.bool,
  icon: PropTypes.string,
  buttonWidth: PropTypes.string,
};
