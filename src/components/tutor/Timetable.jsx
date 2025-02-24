import PropTypes from "prop-types";

import { getDayOfWeekFromStringDate, formatHour, formatDate } from "@/utils/timeFormatted-utils";
export default function Timetable({ availability }) {
  return (
    <>
      <div className="f-between-center mb-5">
        <span className="prev material-symbols-outlined icon-fill bg-brand-02 text-brand-01 rounded-circle p-2 align-middle">arrow_back</span>
        <h5 className="text-brand-03 week fw-medium">
          {formatDate(availability[0].date)} - {formatDate(availability[6].date)}
        </h5>
        <span className="next material-symbols-outlined icon-fill bg-brand-02 text-brand-01 rounded-circle p-2 align-middle">arrow_forward</span>
      </div>

      <div>
        <div className="row row-cols-7 available-date-time g-0">
          {availability.map((item) => {
            const availableTimes = item.hours.filter((time) => time.available); // Filter available times once here

            return (
              <div className="col" key={item.date}>
                <div className={`date f-center flex-column ${availableTimes.length === 0 && "disabled"}`}>
                  <h6>{getDayOfWeekFromStringDate(item.date)}</h6>
                  <p>{formatDate(item.date)}</p>
                </div>

                <div>
                  <ul className="times f-center flex-column">
                    {availableTimes.length > 0 &&
                      availableTimes.map((time) => (
                        <li className="time" key={`${item.date}-${time.hour}`}>
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
};
