import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import BookingCard from "../../../common/booking-record/BookingCard";
import BookingDetailsModal from "../../../common/booking-record/BookingDetailsModal";
import SectionFallback from "@/components/common/SectionFallback";

import bookingApi from "@/api/bookingApi";

// import { tutorInProgressBookingData, tutorCompletedBookingData, tutorCanceledBookingData } from "../../../../data/bookings";

const bookingTypeList = [
  { name: "所有種類", value: "all" },
  { name: "一對一教學", value: "courseSession" },
  { name: "程式碼檢視", value: "codeReview" },
];

export default function AllBookingsSection() {
  const tutorId = useSelector((state) => state.auth?.userData?.tutor_id);

  const [isLoading, setLoadingState] = useState();
  const [bookingType, setBookingType] = useState("all");
  const [dateRange, setDateRange] = useState(null);
  const [activeTab, setActiveTab] = useState("in_progress");
  const [bookingListData, setBookingListData] = useState({});

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isOpenDetailsModal, setOpenDetailsModal] = useState(false);

  const handleDateSelect = (selectedRange) => {
    setDateRange(selectedRange);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName); // Update active tab based on clicked tab name
  };

  const getBookingListData = async (activeTab) => {
    setLoadingState(true);
    try {
      const result = await bookingApi.getTutorBookings(tutorId);
      // Group booking data from API by yyyy-mm
      const formatData = result.reduce((acc, item) => {
        const date = new Date(item.booking_date);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");

        // Filter only true timeslots (booked timeslots)
        const timeslots = Object.keys(item.hourly_availability)
          .filter((hour) => item.hourly_availability[hour])
          .map(Number);

        const { hourly_availability, ...dataWithoutHourlyAvailability } = item;

        const key = `${year}-${month}`; // Group key

        if (!acc[key]) {
          acc[key] = [];
        }

        acc[key].push({ ...dataWithoutHourlyAvailability, timeslots });
        return acc;
      }, {});
      console.log(formatData);
      setBookingListData(formatData);
    } catch (error) {
      console.log("錯誤", error);
    } finally {
      setLoadingState(false);
    }
  };

  useEffect(() => {
    if (tutorId) {
      getBookingListData(activeTab);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, tutorId]);

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
          {isLoading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              {Object?.keys(bookingListData)?.length === 0 && (
                <div className="mt-1">
                  <SectionFallback materialIconName="calendar_clock" fallbackText="尚未有預約" />
                </div>
              )}

              {Object.entries(bookingListData).map(([month, bookings]) => (
                <div key={month} className="mt-8">
                  <h4 className="mb-6">{month.replace("-", "年")}月</h4>
                  <div className="row flex-wrap g-2 row">
                    {bookings.map((booking) => (
                      <div className="col-12 col-lg-6 col-xl-4" key={booking.id}>
                        <BookingCard booking={booking} handleClick={() => handleDetailsModalOpen(booking)} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {selectedBooking && <BookingDetailsModal isOpen={isOpenDetailsModal} setOpenModal={setOpenDetailsModal} booking={selectedBooking} setOpenDetailsModal={setOpenDetailsModal} />}
    </>
  );
}
