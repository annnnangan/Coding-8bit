import { NavLink } from "react-router-dom";

import PropTypes from "prop-types";

export default function TutorCard({ tutor }) {
  return (
    <div
      className="card p-lg-5 p-md-4 p-4 img-hover-enlarge h-100"
      style={{ boxShadow: "0px 25px 50px -12px #0000001F" }}
    >
      <div className="card-body p-0 d-flex flex-column">
        <div className="mb-5 f-between-start">
          <div className="f-center">
            {/* dynamic tutor profile */}
            <img
              src={
                tutor.user.avatar_url
                  ? tutor.user.avatar_url
                  : "images/icon/user.png"
              }
              className="object-cover-fit rounded-circle me-2"
              width="45"
              height="45"
              alt="tutor-avatar"
            />
            <div>
              {/*  dynamic tutor name */}
              <h5 className="card-title fw-medium text-gray-01 fs-lg-6 fs-5 mb-1">
                {tutor.user.username}
              </h5>
              {/*  dynamic title */}
              <p className="text-gray-02 fs-8">{tutor.slogan}</p>
            </div>
          </div>
          <p className="f-center text-brand-03">
            <span className="material-symbols-outlined icon-fill text-brand-01 me-1">
              kid_star
            </span>
            {/*  dynamic score */}
            {Number(tutor.rating).toFixed(1)}
          </p>
        </div>

        {/*  dynamic tag loop*/}
        <div className="mb-5">
          {tutor.expertise
            .split(",")
            .slice(0, 3)
            .map((skill, index) => (
              <div className="d-inline-block me-1" key={index}>
                <span className="tag tag-brand-02 fs-8">{skill.trim()}</span>
              </div>
            ))}
        </div>

        <div className="mb-lg-6 mb-5 mt-auto">
          <p className="text-gray-02 fs-7 fs-lg-6">每小時收費</p>
          {/* dynamic price */}
          <h2 className="text-brand-03 fs-lg-2 fs-3">
            NT $ {Number(tutor.hourly_rate).toLocaleString("en-IN")}
          </h2>
        </div>
        <div className="position-relative">
          {/* dynamic favorite status */}
          <span
            className={`favorite material-symbols-outlined icon-fill p-2 mb-2 rounded-circle align-middle ${
              tutor.isFavorite ? "text-brand-01" : "text-gray-03"
            }`}
            role="button"
            style={{ backgroundColor: "#1e1e1e66" }}
          >
            favorite
          </span>
        </div>

        <NavLink
          to={`/tutor/${tutor.id}`}
          className="btn btn-brand-03 w-100 slide-right-hover"
        >
          <p className="f-center me-1">
            立即預約
            <span className="material-symbols-outlined">arrow_forward</span>
          </p>
        </NavLink>
      </div>
    </div>
  );
}
TutorCard.propTypes = {
  tutor: PropTypes.shape({
    id: PropTypes.string.isRequired,
    slogan: PropTypes.string.isRequired,
    expertise: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    hourly_rate: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      avatar_url: PropTypes.string,
    }),
  }).isRequired,
};
