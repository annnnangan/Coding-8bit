import PropTypes from "prop-types";

export default function TutorBookingResume({ resume }) {
  return (
    <div className="row tutor-booking-resume">
      <div className="col-md-3 col-5">
        <div className="list-group" id="list-resume-tab" role="tablist">
          <a
            className="list-group-item list-group-item-action active"
            id="list-work-experience-list"
            data-bs-toggle="list"
            href="#list-work-experience"
            role="tab"
            aria-controls="list-work-experience"
          >
            工作經歷
          </a>
          <a
            className="list-group-item list-group-item-action"
            id="list-education-list"
            data-bs-toggle="list"
            href="#list-education"
            role="tab"
            aria-controls="list-education"
          >
            學歷
          </a>
          <a
            className="list-group-item list-group-item-action"
            id="list-certificate-list"
            data-bs-toggle="list"
            href="#list-certificate"
            role="tab"
            aria-controls="list-certificate"
          >
            證書
          </a>
        </div>
      </div>
      <div className="col-md-9 col-7">
        <div className="tab-content" id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id="list-work-experience"
            role="tabpanel"
            aria-labelledby="list-work-experience-list"
          >
            {resume.workExperience.map((item, index) => (
              <div className="d-md-flex mb-5" key={index}>
                <p className="date me-5 ">{item.date}</p>
                <div>
                  <p className="fw-bold ">{item.title}</p>
                  <p className="text-gray-03 ">{item.company}</p>
                </div>
              </div>
            ))}
          </div>
          <div
            className="tab-pane fade"
            id="list-education"
            role="tabpanel"
            aria-labelledby="list-education-list"
          >
            {resume.education.map((item, index) => (
              <div className="d-md-flex mb-5" key={index}>
                <p className="date me-5">{item.date}</p>
                <div>
                  <p className="fw-bold">{item.institution}</p>
                  <p className="text-gray-03 ">{item.degree}</p>
                  {item.verified ? (
                    <p className="text-success d-flex verification fs-7 mt-1">
                      <span className="material-symbols-outlined icon-fill align-middle me-1 fs-5">
                        verified
                      </span>
                      學歷認證
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ))}
          </div>
          <div
            className="tab-pane fade"
            id="list-certificate"
            role="tabpanel"
            aria-labelledby="list-certificate-list"
          >
            {resume.certificates.map((item, index) => (
              <div className="d-md-flex mb-5" key={index}>
                <p className="date me-5">{item.date}</p>
                <div>
                  <p className="fw-bold">{item.title}</p>
                  <p className="text-gray-03">{item.issuer}</p>
                  {item.verified ? (
                    <p className="text-success d-flex verification fs-7 mt-1">
                      <span className="material-symbols-outlined icon-fill align-middle me-1 fs-5">
                        verified
                      </span>
                      學歷認證
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
TutorBookingResume.propTypes = {
  resume: PropTypes.object.isRequired,
};
