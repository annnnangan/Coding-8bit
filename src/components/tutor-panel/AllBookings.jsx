import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BookingCard from "./BookingCard";

const bookingTypeList = [
  { name: "所有種類", value: "all" },
  { name: "一對一教學", value: "1on1" },
  { name: "程式碼檢視", value: "code-review" },
];

export default function AllBookings() {
  const [bookingType, setBookingType] = useState("all");
  const [range, setRange] = useState(null);
  const [activeTab, setActiveTab] = useState("in_progress");

  const handleSelect = (selectedRange) => {
    setRange(selectedRange);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName); // Update active tab based on clicked tab name
  };

  return (
    <div>
      {/* Filter */}
      <div className="row flex-wrap">
        <div className="col-6 col-md-4">
          <label className="form-label">預約日期</label>
          <div className="dropdown">
            <button
              className="btn btn-outline-gray-03 border-1 dropdown-toggle d-block w-100 text-start px-4"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              data-bs-config='{"autoClose": "outside"}'
            >
              {range?.from && range?.to ? `${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}` : "選擇日期範圍"}
            </button>
            <ul className="dropdown-menu">
              <DayPicker mode="range" selected={range} onSelect={handleSelect} showOutsideDays />
            </ul>
          </div>
        </div>

        <div className="col-6 col-md-4">
          <label className="form-label">預約類別</label>
          <div className="dropdown">
            <button type="button" className="btn btn-outline-gray-03 border-1 dropdown-toggle d-block w-100 text-start px-4" data-bs-toggle="dropdown" aria-expanded="false">
              {bookingType ? bookingTypeList.find((item) => item.value === bookingType)?.name : "請選擇類別"}
            </button>
            <ul className="dropdown-menu w-100 mt-1">
              {bookingTypeList.map((item) => (
                <li key={item.value}>
                  <button type="button" className="dropdown-item" onClick={() => setBookingType(item.value)}>
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Status Tabs */}
      <ul className="nav nav-tabs mt-8 border-bottom border-gray-03">
        <li className="nav-item cursor-pointer">
          <p className={`nav-link ${activeTab === "in_progress" ? "active bg-gray-04 rounded-top-3" : ""}`} onClick={() => handleTabClick("in_progress")}>
            未完成
          </p>
        </li>

        <li className="nav-item cursor-pointer">
          <p className={`nav-link ${activeTab === "completed" ? "active bg-gray-04 rounded-top-3" : ""}`} onClick={() => handleTabClick("completed")}>
            已完成
          </p>
        </li>

        <li className="nav-item cursor-pointer">
          <p className={`nav-link ${activeTab === "canceled" ? "active bg-gray-04 rounded-top-3" : ""}`} onClick={() => handleTabClick("canceled")}>
            已取消
          </p>
        </li>
      </ul>

      {/* Booking List based on the tab name*/}
      <div>
        <div className="mt-8">
          <h4 className="mb-6">2025年01月</h4>
          <div className="row flex-wrap g-2">
            <BookingCard />
            <BookingCard />
            <BookingCard />
          </div>
        </div>
        <div className="mt-8">
          <h4 className="mb-6">2024年12月</h4>
          <div className="row flex-wrap row-cols-xl-2 row-cols-xxl-3 g-2">
            <BookingCard />
            <BookingCard />
            <BookingCard />
          </div>
        </div>
      </div>
    </div>
  );
}
