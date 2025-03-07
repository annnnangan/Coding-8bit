import PropTypes from "prop-types";

import BookingStatusBadge from "./BookingStatusBadge";

import { determineMeetingLinkMessage } from "@/utils/booking-record-utils";
import { serviceTypeMap } from "@/utils/schema/booking-schema";
import { getDayOfWeekFromStringDate, formatHour } from "@/utils/timeFormatted-utils";

export default function BookingCard({ role, booking, handleClick }) {
  return (
    <>
      <div className="card cursor-pointer" onClick={handleClick}>
        <div className="card-body p-3">
          <div className="d-flex gap-3 gap-md-2">
            <div className="col-3 d-flex flex-column justify-content-center align-items-center bg-gray-04 p-2 p-lg-5 rounded-2">
              <h2 className="text-brand-03 text-center">{new Date(booking.booking_date).getDate()}</h2>
              <p className="fs-7 text-center">{getDayOfWeekFromStringDate(booking.booking_date)}</p>
            </div>
            <div className="col-8">
              <ul>
                <li className="d-flex flex-wrap justify-content-between align-items-center mb-1">
                  <p>{role === "tutor" ? booking.student_name : booking.tutor_name}</p>

                  <BookingStatusBadge status={booking.status} />
                </li>
                <li className="d-flex flex-wrap justify-content-between align-items-center mb-1">
                  <p className="fs-7 text-gray-03">時間</p>
                  <p className="text-gray-01 d-none d-md-block">
                    {booking.timeslots
                      .slice(0, 2)
                      .map((time) => `${formatHour(time)}`)
                      .join("/")}
                    {booking.timeslots.length > 2 && <span>...</span>}
                  </p>

                  <p className="text-gray-01 d-block d-md-none">{booking.timeslots.map((time) => `${formatHour(time)}`).join("/")}</p>
                </li>
                <li className="d-flex flex-wrap justify-content-between align-items-center mb-1">
                  <p className="fs-7 text-gray-03">會議連結</p>
                  <p className="text-gray-01">{determineMeetingLinkMessage(booking.service_type, booking.status, booking.meeting_link)}</p>
                </li>
                <li className="d-flex flex-wrap justify-content-between align-items-center mb-1">
                  <p className="fs-7 text-gray-03">預約類型</p>
                  <p className="text-gray-01">{serviceTypeMap[booking.service_type]}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

BookingCard.propTypes = {
  role: PropTypes.oneOf(["tutor", "student"]),
  booking: PropTypes.shape({
    booking_date: PropTypes.string.isRequired,
    tutor_name: PropTypes.string,
    student_name: PropTypes.string,
    status: PropTypes.oneOf(["in_progress", "completed", "cancelled"]).isRequired,
    timeslots: PropTypes.arrayOf(PropTypes.number),
    service_type: PropTypes.oneOf(["courseSession", "codeReview"]).isRequired,
    meeting_link: PropTypes.string,
  }).isRequired,
  handleClick: PropTypes.func,
};
