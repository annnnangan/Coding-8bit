import PropTypes from "prop-types";
import NavLinkButton from "./NavLinkButton";

export default function DashboardSection({
  title,
  children,
  description,
  className,
  withNavLink = false,
  navLinkText,
  navLinkHref,
}) {
  return (
    <section className={`bg-gray-04 rounded-4 p-8 ${className}`}>
      {withNavLink && (
        <div className="d-flex justify-content-between mb-4 mb-md-6">
          <div>
            <h4 className={`${description !== "" ? "mb-3" : ""}`}>{title}</h4>
            <p>{description}</p>
          </div>

          <NavLinkButton text={navLinkText} href={navLinkHref} />
        </div>
      )}
      {!withNavLink && (
        <>
          <h4 className={`${description ? "mb-3" : "mb-4 mb-md-6"}`}>{title}</h4>
          {description && <p className="fs-7 mb-4 mb-md-6">{description}</p>}
        </>
      )}
      {children}
    </section>
  );
}

// Define PropTypes
DashboardSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  description: PropTypes.string,
  className: PropTypes.string,
  withNavLink: PropTypes.bool,
  navLinkText: PropTypes.string,
  navLinkHref: PropTypes.string,
};
