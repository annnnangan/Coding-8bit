import PropTypes from "prop-types";

export default function AvatarWithFallback({ image, name, fontSize = "fs-6", children }) {
  return (
    <div className="d-flex align-items-center mt-auto">
      <div className="flex-shrink-0">
        {image !== "" ? (
          <img src={image} alt="profile" className="object-fit-cover rounded-circle me-4" style={{ height: "48px", width: "48px" }} />
        ) : (
          <span
            className="material-symbols-outlined rounded-circle bg-secondary d-flex justify-content-center align-items-center me-4"
            style={{ height: "48px", width: "48px", color: "white", fontSize: "24px" }}
          >
            person
          </span>
        )}
      </div>
      <div className="flex-grow-1">
        <p className={fontSize}>{name}</p>
        {children}
      </div>
    </div>
  );
}

// Define PropTypes
AvatarWithFallback.propTypes = {
  image: PropTypes.string, // Optional, can be undefined
  children: PropTypes.node,
  name: PropTypes.string.isRequired,
  fontSize: PropTypes.string,
};
