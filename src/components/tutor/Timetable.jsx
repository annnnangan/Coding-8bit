import { useState } from "react";
import PropTypes from "prop-types";

import { getDayOfWeekFromStringDate, formatHour, formatDate, removeYearFromDate } from "@/utils/timeFormatted-utils";

export default function Timetable({ availability, weekOffset, toNextWeek, toPrevWeek, isLoading, handleBookingTimeslotsSelect, selectedBookingTimeslots, isModal, openBookingModal }) {
  const MAX_VISIBLE_TIMES = 7; // Default number of time slots to show
  const [showAll, setShowAll] = useState(false); // Single toggle for all dates

  const handleClick = (date, hour) => {
    handleBookingTimeslotsSelect(date, hour);
    if (!isModal && openBookingModal) {
      openBookingModal();
    }
  };

  return (
    <>
      <div className="f-between-center mb-5">
        <button
          className={`border-0 prev material-symbols-outlined icon-fill rounded-circle p-2 align-middle ${(weekOffset === 0 || isLoading) && "disabled"}`}
          disabled={weekOffset === 0}
          onClick={toPrevWeek}
        >
          arrow_back
        </button>
        <h5 className="text-brand-03 week fw-medium">
          {formatDate(availability[0].date)} - {formatDate(availability[6].date)}
        </h5>
        <button className={`border-0 next material-symbols-outlined icon-fill rounded-circle p-2 align-middle  ${isLoading && "disabled"}`} onClick={toNextWeek}>
          arrow_forward
        </button>
      </div>

      <div className="overflow-x-auto position-relative">
        {isLoading && (
          <>
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-white opacity-50 backdrop-blur"></div> {/* Blur effect */}
            <div className="position-absolute top-50 start-50 translate-middle">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </>
        )}

        <div className="row row-cols-7 available-date-time g-0 flex-nowrap">
          {availability.map((item) => {
            const availableTimes = item.hours.filter((time) => time.available); // Only available times

            return (
              <div className="col" key={item.date}>
                <div className={`date f-center flex-column${availableTimes.length === 0 ? " disabled" : ""}`}>
                  <h6>{getDayOfWeekFromStringDate(item.date)}</h6>
                  <p>{removeYearFromDate(item.date)}</p>
                </div>

                <div>
                  <ul className="booking-times f-center flex-column">
                    {availableTimes.slice(0, showAll ? availableTimes.length : MAX_VISIBLE_TIMES).map((time) => (
                      <li
                        className={`booking-time${time.isBooked ? " disabled" : ""}${
                          selectedBookingTimeslots?.date === item.date && selectedBookingTimeslots?.hours?.includes(time.hour) ? " selected" : ""
                        }`}
                        key={`${item.date}-${time.hour}`}
                        onClick={() => handleClick(item.date, time.hour)}
                      >
                        {formatHour(time.hour)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Show More Button */}
      <div className="position-relative">
        {availability.some((item) => item.hours.filter((time) => time.available).length > MAX_VISIBLE_TIMES) && (
          <div className="f-center">
            {!showAll && <div className="see-more"></div>}
            <div className="d-flex align-items-center py-3 see-more-button" role="button" onClick={() => setShowAll(!showAll)}>
              <p className="text-brand-03 fs-7 fs-md-6">{showAll ? "查看更少" : "查看更多"}</p>
              <span className="material-symbols-outlined icon-fill text-brand-03 align-middle">{showAll ? "keyboard_arrow_up" : "expand_more"}</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

Timetable.propTypes = {
  availability: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      hours: PropTypes.arrayOf(
        PropTypes.shape({
          hour: PropTypes.number.isRequired,
          available: PropTypes.bool.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  weekOffset: PropTypes.number.isRequired,
  toNextWeek: PropTypes.func.isRequired,
  toPrevWeek: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleBookingTimeslotsSelect: PropTypes.func,
  selectedBookingTimeslots: PropTypes.shape({
    date: PropTypes.string,
    hours: PropTypes.arrayOf(PropTypes.number),
  }),
  isModal: PropTypes.bool,
  openBookingModal: PropTypes.func,
};
