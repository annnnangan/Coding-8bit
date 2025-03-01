import { useState, useEffect } from "react";
import BusinessHour from "./BusinessHour";
import { DayPicker } from "react-day-picker";
import { useSelector } from "react-redux";

import { daysOfWeekInChinese } from "@/utils/timeFormatted-utils";
import tutorApi from "@/api/tutorApi";

import "react-day-picker/dist/style.css";

export default function AvailableTimeSection() {
  const tutorId = useSelector((state) => state.auth?.userData?.tutor_id);
  const [isLoadingDayOfWeekAvailability, setLoadingDayOfWeekAvailability] = useState(false);
  const [isLoadingSpecificDateAvailability, setLoadingSpecificDateAvailability] = useState(false);

  const [dayOfWeekAvailability, setDayOfWeekAvailability] = useState(null);
  const [specificDateAvailability, setSpecificDateAvailability] = useState(null);

  const getAllDayOfWeekAvailability = async () => {
    setLoadingDayOfWeekAvailability(true);
    try {
      const result = await tutorApi.getAllDayOfWeekAvailability(tutorId);
      setDayOfWeekAvailability(result);
      // data.map(({ start_hour, end_hour }) => ({ start_hour, end_hour }));
    } catch (error) {
      console.log("錯誤", error);
    } finally {
      setLoadingDayOfWeekAvailability(false);
    }
  };

  useEffect(() => {
    getAllDayOfWeekAvailability();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="row tutor-booking">
      <div className="pb-6 pb-xxl-0 pe-xxl-8 col-12 col-xxl-6 sub-section">
        <h4 className="mb-3">設定每週可預約時間</h4>
        <p className="text-gray-02 mb-6">在此設定每週恆常可預約時間。</p>
        <div className="d-flex flex-column gap-5">
          {isLoadingDayOfWeekAvailability ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            daysOfWeekInChinese.map((day, index) => {
              const filterDayData = Array.isArray(dayOfWeekAvailability) ? dayOfWeekAvailability.filter((item) => item.day_of_week === index) : [];
              const defaultValue =
                filterDayData.length > 0 ? { is_open: true, time_slots: filterDayData.map(({ start_hour, end_hour }) => ({ start_hour, end_hour })) } : { is_open: false, time_slots: [] };

              return <BusinessHour type="week" day={day} key={day} defaultValue={defaultValue} revalidateAvailability={getAllDayOfWeekAvailability} />;
            })
          )}
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
          {isLoadingSpecificDateAvailability ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              <BusinessHour type="specific" day={"2025-03-02"} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
