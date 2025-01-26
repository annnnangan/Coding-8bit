import { NavLink } from "react-router-dom";

import PropTypes from "prop-types";

export default function TutorsCard({ tutorList, cardsNum }) {
  if (cardsNum === 2 || cardsNum === 3) {
    return (
      <ul
        className={`${
          cardsNum === 3
            ? "row row-cols-lg-3 row-cols-md-2 row-cols-1 g-4"
            : "row row-cols-lg-2 g-lg-4 d-none d-lg-flex"
        }`}
      >
        {tutorList.map((tutor) => (
          <li className="tutor-card col" key={tutor.id}>
            <div
              className="card p-lg-5 p-md-4 p-4 img-hover-enlarge h-100"
              style={{ boxShadow: "0px 25px 50px -12px #0000001F" }}
            >
              <div className="position-relative mb-lg-5 mb-4">
                <div className="img-wrapper rounded-2">
                  {/* dynamic image path */}
                  <img
                    src={tutor.profileImage}
                    className="card-img-top cover-img rounded-2 object-fit-cover"
                    alt="tutor-profileImage"
                  />
                </div>
                {/* dynamic favorite status */}
                <span
                  className={`favorite material-symbols-outlined icon-fill p-2 rounded-circle align-middle ${
                    tutor.isFavorite ? "text-brand-01" : "text-gray-03"
                  }`}
                  role="button"
                  style={{ backgroundColor: "#1e1e1e66" }}
                >
                  favorite
                </span>
              </div>
              <div className="card-body p-0 d-flex flex-column">
                <div className="mb-5 f-between-start">
                  <div className="f-center">
                    {/* dynamic tutor profile */}
                    <img
                      src={tutor.avatar}
                      className="object-cover-fit rounded-circle me-2"
                      width="45"
                      height="45"
                      alt="tutor-avatar"
                    />
                    <div>
                      {/*  dynamic tutor name */}
                      <h5 className="card-title fw-medium text-gray-01 fs-lg-6 fs-5 mb-1">
                        {tutor.name}
                      </h5>
                      {/*  dynamic title */}
                      {/* <p className="text-gray-02 fs-8"><%= title %></p> */}
                    </div>
                  </div>
                  <p className="f-center text-brand-03">
                    <span className="material-symbols-outlined icon-fill text-brand-01 me-1">
                      kid_star
                    </span>
                    {/*  dynamic score */}
                    {tutor.rating}
                  </p>
                </div>

                {/*  dynamic tag loop*/}
                <div className="mb-5">
                  {tutor.skills.map((skill, index) => (
                    <div className="d-inline-block me-1" key={index}>
                      <a href="#" className="tag tag-brand-02 fs-8">
                        {skill}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="mb-lg-6 mb-5 mt-auto">
                  <p className="text-gray-02 fs-7 fs-lg-6">每小時收費</p>
                  {/* dynamic price */}
                  <h2 className="text-brand-03 fs-lg-2 fs-3">
                    NT $ {tutor.pricePerHour.toLocaleString("en-IN")}
                  </h2>
                </div>

                <NavLink
                  to={`/tutor/${tutor.id}`}
                  className="btn btn-brand-03 w-100 slide-right-hover"
                >
                  <p className="f-center me-1">
                    立即預約
                    <span className="material-symbols-outlined">
                      {" "}
                      arrow_forward{" "}
                    </span>
                  </p>
                </NavLink>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  } else {
    return (
      <div
      className="card p-lg-5 p-md-4 p-4 img-hover-enlarge h-100"
      style={{ boxShadow: "0px 25px 50px -12px #0000001F" }}
    >
      <div className="position-relative mb-lg-5 mb-4">
        <div className="img-wrapper rounded-2">
          {/* dynamic image path */}
          <img
            src={tutorList.profileImage}
            className="card-img-top cover-img rounded-2 object-fit-cover"
            alt="tutor-profileImage"
          />
        </div>
        {/* dynamic favorite status */}
        <span
          className={`favorite material-symbols-outlined icon-fill p-2 rounded-circle align-middle ${
            tutorList.isFavorite ? "text-brand-01" : "text-gray-03"
          }`}
          role="button"
          style={{ backgroundColor: "#1e1e1e66" }}
        >
          favorite
        </span>
      </div>
      <div className="card-body p-0 d-flex flex-column">
        <div className="mb-5 f-between-start">
          <div className="f-center">
            {/* dynamic tutor profile */}
            <img
              src={tutorList.avatar}
              className="object-cover-fit rounded-circle me-2"
              width="45"
              height="45"
              alt="tutor-avatar"
            />
            <div>
              {/*  dynamic tutor name */}
              <h5 className="card-title fw-medium text-gray-01 fs-lg-6 fs-5 mb-1">
                {tutorList.name}
              </h5>
              {/*  dynamic title */}
              {/* <p className="text-gray-02 fs-8"><%= title %></p> */}
            </div>
          </div>
          <p className="f-center text-brand-03">
            <span className="material-symbols-outlined icon-fill text-brand-01 me-1">
              kid_star
            </span>
            {/*  dynamic score */}
            {tutorList.rating}
          </p>
        </div>

        {/*  dynamic tag loop*/}
        <div className="mb-5">
          {tutorList.skills.map((tag, index) => (
            <div className="d-inline-block me-1" key={index}>
              <a href="#" className="tag tag-brand-02 fs-8">
                {tag}
              </a>
            </div>
          ))}
        </div>

        <div className="mb-lg-6 mb-5 mt-auto">
          <p className="text-gray-02 fs-7 fs-lg-6">每小時收費</p>
          {/* dynamic price */}
          <h2 className="text-brand-03 fs-lg-2 fs-3">
            NT $ {tutorList.pricePerHour.toLocaleString("en-IN")}
          </h2>
        </div>

        <NavLink
          to={`/tutor/${tutorList.id}`}
          className="btn btn-brand-03 w-100 slide-right-hover"
        >
          <p className="f-center me-1">
            立即預約
            <span className="material-symbols-outlined">
              {" "}
              arrow_forward{" "}
            </span>
          </p>
        </NavLink>
      </div>
    </div>
    )
  }
}
TutorsCard.propTypes = {
  tutorList: PropTypes.oneOfType([
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      profileImage: PropTypes.string.isRequired,
      skills: PropTypes.arrayOf(PropTypes.string).isRequired,
      rating: PropTypes.number.isRequired,
      pricePerHour: PropTypes.number.isRequired,
      isFavorite: PropTypes.bool.isRequired,
    }),
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        profileImage: PropTypes.string.isRequired,
        skills: PropTypes.arrayOf(PropTypes.string).isRequired,
        rating: PropTypes.number.isRequired,
        pricePerHour: PropTypes.number.isRequired,
        isFavorite: PropTypes.bool.isRequired,
      })
    ),
  ]).isRequired,
  cardsNum: PropTypes.oneOf([1, 2, 3]),
};