import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import BookingCard from "./BookingCard";
import BookingDetailsModal from "./BookingDetailsModal";

import { tutorInProgressBookingData, tutorCompletedBookingData, tutorCanceledBookingData } from "../../../../data/bookings";

const bookingTypeList = [
  { name: "所有種類", value: "all" },
  { name: "一對一教學", value: "1on1" },
  { name: "程式碼檢視", value: "code-review" },
];

export default function AllBookingsSection() {
  const [bookingType, setBookingType] = useState("all");
  const [dateRange, setDateRange] = useState(null);
  const [activeTab, setActiveTab] = useState("in_progress");
  const [bookingListData, setBookingListData] = useState(tutorInProgressBookingData);

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isOpenDetailsModal, setOpenDetailsModal] = useState(false);

  const handleDateSelect = (selectedRange) => {
    setDateRange(selectedRange);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName); // Update active tab based on clicked tab name
  };

  useEffect(() => {
    switch (activeTab) {
      case "in_progress": {
        setBookingListData(tutorInProgressBookingData);
        break;
      }
      case "completed": {
        setBookingListData(tutorCompletedBookingData);
        break;
      }
      case "canceled": {
        setBookingListData(tutorCanceledBookingData);
        break;
      }
      default:
        setBookingListData(tutorInProgressBookingData);
    }
  }, [activeTab]);

  const handleDetailsModalOpen = (booking) => {
    setSelectedBooking(booking);
    setOpenDetailsModal(true);
  };

  return (
    <>
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
                {dateRange?.from && dateRange?.to ? `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}` : "選擇日期範圍"}
              </button>
              <ul className="dropdown-menu">
                <DayPicker mode="range" selected={dateRange} onSelect={handleDateSelect} showOutsideDays />
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
          {Object.entries(bookingListData).map(([month, bookings]) => (
            <div key={month} className="mt-8">
              <h4 className="mb-6">{month.replace("-", "年")}月</h4>
              <div className="row flex-wrap g-2 row">
                {bookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} handleClick={() => handleDetailsModalOpen(booking)} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedBooking && <BookingDetailsModal isOpen={isOpenDetailsModal} setOpenModal={setOpenDetailsModal} booking={selectedBooking} setOpenDetailsModal={setOpenDetailsModal} />}
    </>
  );
}
