import BusinessHour from "./BusinessHour";
import { DayPicker } from "react-day-picker";

import "react-day-picker/dist/style.css";

const daysOfWeekMap = [
  { value: "Monday", label: "星期一" },
  { value: "Tuesday", label: "星期二" },
  { value: "Wednesday", label: "星期三" },
  { value: "Thursday", label: "星期四" },
  { value: "Friday", label: "星期五" },
  { value: "Saturday", label: "星期六" },
  { value: "Sunday", label: "星期日" },
];

export default function AvailableTimeSection() {
  return (
    <div className="row tutor-booking">
      <div className="pb-6 pb-xxl-0 pe-xxl-8 col-12 col-xxl-6 sub-section">
        <h4 className="mb-3">設定每週可預約時間</h4>
        <p className="text-gray-02 mb-6">在此設定每週恆常可預約時間。</p>
        <div className="d-flex flex-column gap-5">
          {daysOfWeekMap.map((day) => {
            return <BusinessHour type="week" day={day} key={day.value} />;
          })}
        </div>
      </div>
      <div className="pt-6 pt-xxl-0 ps-xxl-8 col-12 col-xxl-6 sub-section">
        <div className="d-flex justify-content-between align-items-center mb-6">
          <div>
            <h4 className="mb-3">設定特定日期可預約時間</h4>
            <p className="text-gray-02">針對特定日期設定不同的時間 / 關閉時段。</p>
          </div>

          <div className="dropdown">
            <button
              className="dropdown-toggle rounded-circle btn btn-brand-02 p-8 f-center add-btn"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              data-bs-config='{"autoClose": "outside"}'
              style={{ width: "44px", height: "44px" }}
            >
              <span className="material-symbols-outlined icon-fill text-brand-01 fs-2">add</span>
            </button>
            <ul className="dropdown-menu">
              <DayPicker mode="single" showOutsideDays />
            </ul>
          </div>
        </div>

        <div className="d-flex flex-column gap-5">
          <BusinessHour type="specific" day={"2025-03-02"} />
          <BusinessHour type="specific" day={"2025-03-03"} />
          <BusinessHour type="specific" day={"2025-03-04"} />
        </div>
      </div>
    </div>
  );
}
