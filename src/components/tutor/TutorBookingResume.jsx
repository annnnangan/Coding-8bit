import PropTypes from "prop-types";

import SectionFallback from "@/components/common/SectionFallback";

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
            {resume.work_experience.length === 0 && (
              <div className="my-8">
                <SectionFallback materialIconName="work" fallbackText="講師暫無填寫工作經歷" />
              </div>
            )}

            {resume.work_experience.map((item) => (
              <div className="d-md-flex mb-5" key={item.id}>
                <p className="date me-5 ">
                  {item.end_year == "9999"
                    ? `${item.start_year} - 現在`
                    : `${item.start_year} - ${item.end_year}`}
                </p>

                <div>
                  <p className="fw-bold ">{item.position}</p>
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
            {resume.education.length === 0 ? (
              <div className="my-8">
                <SectionFallback materialIconName="school" fallbackText="講師暫無填寫學歷" />
              </div>
            ) : (
              resume.education.map((item) => (
                <div className="d-md-flex mb-5" key={item.id}>
                  <p className="date me-5">
                    {item.start_year} - {item.end_year}
                  </p>
                  <div>
                    <p className="fw-bold">{item.school_name}</p>
                    <p className="text-gray-03 ">
                      {item.major}
                      {item.degree}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
          <div
            className="tab-pane fade"
            id="list-certificate"
            role="tabpanel"
            aria-labelledby="list-certificate-list"
          >
            {resume.certificates.length === 0 && (
              <div className="my-8">
                <SectionFallback materialIconName="license" fallbackText="講師暫無填寫證書" />
              </div>
            )}
            {resume.certificates.map((item, index) => (
              <div className="d-md-flex mb-5" key={index}>
                <p className="date me-5">{item.issued_date}</p>
                <div>
                  <p className="fw-bold">{item.title}</p>
                  <p className="text-gray-03">{item.issuer}</p>
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
  resume: PropTypes.shape({
    work_experience: PropTypes.arrayOf(PropTypes.object).isRequired,
    education: PropTypes.arrayOf(PropTypes.object).isRequired,
    certificates: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};
