import PropTypes from "prop-types";
import { utils } from "../../../custom-course/utils";

import BookingStatusBadge from "./BookingStatusBadge";
import { determineMeetingLinkMessage } from "../../../../utils/booking-record-utils";

export default function BookingCard({ booking, handleClick }) {
  return (
    <>
      <div className="col-12 col-lg-6 col-xl-4">
        <div className="card cursor-pointer" onClick={handleClick}>
          <div className="card-body p-3">
            <div className="d-flex gap-3 gap-md-2">
              <div className="col-3 d-flex flex-column justify-content-center align-items-center bg-gray-04 p-2 p-lg-5 rounded-2">
                <h2 className="text-brand-03 text-center">{new Date(booking.start_time).getDate()}</h2>
                <p className="fs-7 text-center">{new Intl.DateTimeFormat("zh-CN", { weekday: "long" }).format(new Date(booking.start_time))}</p>
              </div>
              <div className="col-8">
                <ul>
                  <li className="d-flex flex-wrap justify-content-between align-items-center mb-1">
                    <p>{booking.student}</p>

                    <BookingStatusBadge status={booking.status} />
                  </li>
                  <li className="d-flex flex-wrap justify-content-between align-items-center mb-1">
                    <p className="fs-7 text-gray-03">時間</p>
                    <p className="text-gray-01">
                      {utils.formatOnlyTime(new Date(booking.start_time))} - {utils.formatOnlyTime(new Date(booking.end_time))}{" "}
                    </p>
                  </li>
                  <li className="d-flex flex-wrap justify-content-between align-items-center mb-1">
                    <p className="fs-7 text-gray-03">會議連結</p>
                    <p className="text-gray-01">{determineMeetingLinkMessage(booking.type, booking.status, booking.meeting_link)}</p>
                  </li>
                  <li className="d-flex flex-wrap justify-content-between align-items-center mb-1">
                    <p className="fs-7 text-gray-03">預約類型</p>
                    <p className="text-gray-01">{booking.type}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

BookingCard.propTypes = {
  booking: PropTypes.shape({
    id: PropTypes.number.isRequired,
    student: PropTypes.string.isRequired,
    student_avatar: PropTypes.string,
    status: PropTypes.oneOf(["in_progress", "completed", "canceled"]).isRequired, // Adjust based on possible statuses
    start_time: PropTypes.string.isRequired,
    end_time: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    meeting_link: PropTypes.string, // Can be null, so not required
    source_code_url: PropTypes.string, // Can be null, so not required
    details: PropTypes.string.isRequired,
    tutor_notes: PropTypes.string, // Can be null, so not required
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
};
