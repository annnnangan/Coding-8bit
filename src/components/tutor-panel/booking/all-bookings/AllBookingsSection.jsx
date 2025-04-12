import { useEffect, useState, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import { DayPicker } from "react-day-picker";
import Swal from "sweetalert2";
import "react-day-picker/dist/style.css";
import debounce from "lodash/debounce";

import BookingCard from "@/components/common/booking-record/BookingCard";
import BookingDetailsModal from "@/components/common/booking-record/BookingDetailsModal";
import SectionFallback from "@/components/common/SectionFallback";

import bookingApi from "@/api/bookingApi";
import { formatDateDash } from "@/utils/timeFormatted-utils";

const serviceTypeList = [
  { name: "所有類別", value: "all" },
  { name: "一對一教學", value: "courseSession" },
  { name: "程式碼檢視", value: "codeReview" },
];

export default function AllBookingsSection({ role }) {
  const tutorId = useSelector((state) => state.auth?.userData?.tutor_id);
  const studentId = useSelector((state) => state.auth?.userData?.id);

  const [isLoading, setLoadingState] = useState();
  const [serviceType, setServiceType] = useState("all");
  const [dateRange, setDateRange] = useState(null); // for updating the day picker ui
  const [debounceDateRange, setDebounceDateRange] = useState(null); // for debounce usage
  const [activeTab, setActiveTab] = useState("in_progress");
  const [bookingListData, setBookingListData] = useState({});

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isOpenDetailsModal, setOpenDetailsModal] = useState(false);

  /* ---------------------------- Get Data From API --------------------------- */

  const getBookingListData = useCallback(
    async ({ activeTab, startDate, endDate, serviceType }) => {
      setLoadingState(true);

      try {
        let result;

        if (role === "tutor") {
          result = (await bookingApi.getTutorBookings({ tutorId, status: activeTab, startDate, endDate, serviceType })).bookings;
        }

        if (role === "student") {
          result = (await bookingApi.getStudentBookings({ studentId, status: activeTab, startDate, endDate, serviceType })).bookings;
        }

        // Group booking data from API by yyyy-mm
        const formatData = result.reduce((acc, item) => {
          const date = new Date(item.booking_date);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");

          // Filter only true timeslots (booked timeslots)
          const timeslots = Object.keys(item.hourly_availability)
            .filter((hour) => item.hourly_availability[hour])
            .map(Number);

          // eslint-disable-next-line no-unused-vars
          const { hourly_availability, ...dataWithoutHourlyAvailability } = item;

          const key = `${year}-${month}`; // Group key

          if (!acc[key]) {
            acc[key] = [];
          }

          acc[key].push({ ...dataWithoutHourlyAvailability, timeslots });
          return acc;
        }, {});

        setBookingListData(formatData);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "取得資料失敗",
          text: error.response?.data?.message || "發生錯誤，請稍後再試",
        });
      } finally {
        setLoadingState(false);
      }
    },
    [role, studentId, tutorId]
  );

  useEffect(() => {
    if ((role === "tutor" && tutorId) || (role === "student" && studentId)) {
      getBookingListData({ activeTab, startDate: debounceDateRange?.from, endDate: debounceDateRange?.to, serviceType });
    }
  }, [activeTab, tutorId, serviceType, debounceDateRange, studentId, role, getBookingListData]);

  /* ---------------------------- Click Handler --------------------------- */
  // Set debounce for date range selection
  const debouncedSetSelectedDateRange = useMemo(
    () =>
      debounce((range) => {
        setDebounceDateRange(range);
      }, 1000),
    []
  );

  const handleDateSelect = (selectedRange) => {
    setDateRange(selectedRange);
    debouncedSetSelectedDateRange(selectedRange);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleDetailsModalOpen = (booking) => {
    setSelectedBooking(booking);
    setOpenDetailsModal(true);
  };

  return (
    <>
      <div>
        {/* Filter */}
        <div className="row flex-wrap gap-xs-5 gap-3">
          <div className="col-12 col-xs-6 col-md-6">
            <label className="form-label">預約日期</label>
            <div className="dropdown">
              <button
                className="btn btn-outline-gray-03 border-1 dropdown-toggle d-block w-100 text-start px-4"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                data-bs-config='{"autoClose": "outside"}'
              >
                {dateRange?.from && dateRange?.to ? `${formatDateDash(dateRange.from)} - ${formatDateDash(dateRange.to)}` : "選擇日期範圍"}
              </button>
              <ul className="dropdown-menu">
                <DayPicker mode="range" selected={dateRange} onSelect={handleDateSelect} showOutsideDays />
              </ul>
            </div>
          </div>

          <div className="col-12 col-xs-6 col-md-4">
            <label className="form-label">預約類別</label>
            <div className="dropdown">
              <button type="button" className="btn btn-outline-gray-03 border-1 dropdown-toggle d-block w-100 text-start px-4" data-bs-toggle="dropdown" aria-expanded="false">
                {serviceType ? serviceTypeList.find((item) => item.value === serviceType)?.name : "請選擇類別"}
              </button>
              <ul className="dropdown-menu w-100 mt-1">
                <li></li>
                {serviceTypeList.map((item) => (
                  <li key={item.value}>
                    <button type="button" className="dropdown-item" onClick={() => setServiceType(item.value)}>
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
            <p className={`nav-link ${activeTab === "canceled" ? "active bg-gray-04 rounded-top-3" : ""}`} onClick={() => handleTabClick("cancelled")}>
              已取消
            </p>
          </li>
        </ul>

        {/* Booking List based on the tab name*/}
        <div>
          {isLoading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              {Object?.keys(bookingListData)?.length === 0 && (
                <div className="mt-10">
                  <SectionFallback materialIconName="calendar_clock" fallbackText={`未有此狀態之預約`} />
                </div>
              )}

              {Object.entries(bookingListData).map(([month, bookings]) => (
                <div key={month} className="mt-8">
                  <h4 className="mb-6">{month.replace("-", "年")}月</h4>
                  <div className="row flex-wrap g-2 row">
                    {bookings.map((booking) => (
                      <div className="col-12 col-lg-6 col-xl-4" key={booking.id}>
                        <BookingCard role={role} booking={booking} handleClick={() => handleDetailsModalOpen(booking)} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {selectedBooking && <BookingDetailsModal role={role} isOpen={isOpenDetailsModal} setOpenModal={setOpenDetailsModal} booking={selectedBooking} setOpenDetailsModal={setOpenDetailsModal} />}
    </>
  );
}

AllBookingsSection.propTypes = {
  role: PropTypes.oneOf(["tutor", "student"]),
};
