import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";

import { DayPicker } from "react-day-picker";
import Swal from "sweetalert2";

import SectionFallback from "@/components/common/SectionFallback";
import BusinessHour from "./BusinessHour";

import tutorApi from "@/api/tutorApi";
import { daysOfWeekInChinese, formatDateDash } from "@/utils/timeFormatted-utils";

import "react-day-picker/dist/style.css";

export default function AvailableTimeSection() {
  const tutorId = useSelector((state) => state.auth?.userData?.tutor_id);

  const [date, setSelectedDate] = useState();

  const [isLoadingDayOfWeekAvailability, setLoadingDayOfWeekAvailability] = useState(false);
  const [isLoadingSpecificDateAvailability, setLoadingSpecificDateAvailability] = useState(false);

  const [dayOfWeekAvailability, setDayOfWeekAvailability] = useState(null);
  const [specificDateAvailability, setSpecificDateAvailability] = useState({});
  const [newAddSpecificDateAvailability, setNewAddSpecificDateAvailability] = useState({});

  /* ------------------------------ Get Initial Availability Data ----------------------------- */
  const getAllDayOfWeekAvailability = useCallback(async () => {
    setLoadingDayOfWeekAvailability(true);
    try {
      const result = await tutorApi.getAllDayOfWeekAvailability(tutorId);

      setDayOfWeekAvailability(result);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "取得資料失敗",
        text: error.response?.data?.message || "發生錯誤，請稍後再試",
      });
    } finally {
      setLoadingDayOfWeekAvailability(false);
    }
  }, [tutorId]);

  const getAllSpecificDateAvailability = useCallback(async () => {
    setLoadingSpecificDateAvailability(true);
    try {
      const result = await tutorApi.getAllSpecificDateAvailability(tutorId);
      // Group all timeslots from row by date
      const transformData = result.reduce((acc, item) => {
        const { date, is_open, start_hour, end_hour, action_type } = item;

        // If the action_type === cancel, it represents that date is closed
        const newIsOpenValue = action_type === "cancel" ? false : is_open;

        // If the date key doesn't exist, initialize it
        if (!acc[date]) {
          acc[date] = { is_open: newIsOpenValue, time_slots: [] };
        }

        // Push the timeslot into the array
        if (action_type !== "cancel") {
          acc[date].time_slots.push({ start_hour, end_hour, action_type });
        }

        return acc;
      }, {});

      setSpecificDateAvailability(transformData);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "取得資料失敗",
        text: error.response?.data?.message || "發生錯誤，請稍後再試",
      });
    } finally {
      setLoadingSpecificDateAvailability(false);
    }
  }, [tutorId]);

  useEffect(() => {
    getAllDayOfWeekAvailability();
  }, [getAllDayOfWeekAvailability]);

  useEffect(() => {
    getAllSpecificDateAvailability();
  }, [getAllSpecificDateAvailability]);

  /* ------------------------------ Add New Specific Date Availability Click Handler ----------------------------- */

  const handleDateSelect = (date) => {
    if (date) {
      setSelectedDate(date);
      setNewAddSpecificDateAvailability((prev) => {
        const newDateKey = formatDateDash(date); // Format date to "yyyy-mm-dd"
        return {
          [newDateKey]: { is_open: false, time_slots: [] }, // Add new date first
          ...prev, // Spread previous state to keep all the existing dates
        };
      });
    }
  };

  const handleRemoveNewAddSpecificDateAvailability = (date) => {
    setNewAddSpecificDateAvailability((prev) => {
      // eslint-disable-next-line no-unused-vars
      const { [date]: _, ...updatedAvailability } = prev;
      return updatedAvailability;
    });
  };

  return (
    <div className="row tutor-panel-booking">
      {/* 設定每週可預約時間 */}
      <div className="col-12 col-md-6 col-lg-12 col-xl-6 sub-section">
        <h4 className="fs-5 fs-md-4 mb-3">設定每週可預約時間</h4>
        <p className="fs-7 fs-md-6 text-gray-02 mb-6">在此設定每週恆常可預約時間。</p>
        <div className="d-flex flex-column gap-5">
          {isLoadingDayOfWeekAvailability ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "100vh" }}
            >
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            daysOfWeekInChinese.map((day, index) => {
              const filterDayData = Array.isArray(dayOfWeekAvailability)
                ? dayOfWeekAvailability.filter((item) => item.day_of_week === index)
                : [];
              const defaultValue =
                filterDayData.length > 0
                  ? {
                      is_open: true,
                      time_slots: filterDayData.map(({ start_hour, end_hour }) => ({
                        start_hour,
                        end_hour,
                      })),
                    }
                  : { is_open: false, time_slots: [] };

              return (
                <BusinessHour
                  type="week"
                  day={day}
                  key={day}
                  defaultValue={defaultValue}
                  revalidateAvailability={getAllDayOfWeekAvailability}
                />
              );
            })
          )}
        </div>
      </div>
      {/* 設定特定日期可預約時間 */}
      <div className="col-12 col-md-6 col-lg-12 col-xl-6 sub-section">
        <div className="d-flex justify-content-between align-items-center mb-6">
          <div>
            <h4 className="fs-5 fs-md-4 mb-3">設定特定日期可預約時間</h4>
            <p className="fs-7 fs-md-6 text-gray-02">針對特定日期設定不同的時間 / 關閉時段。</p>
          </div>

          <div className="dropdown">
            <button
              className="dropdown-toggle rounded-circle btn btn-brand-02 p-6 f-center add-btn"
              type="button"
              data-bs-toggle="dropdown"
              data-bs-auto-close="false"
              aria-expanded="false"
              style={{ width: "40px", height: "40px" }}
            >
              <span className="material-symbols-outlined icon-fill text-brand-01 fs-2">add</span>
            </button>
            <ul className="dropdown-menu">
              <DayPicker
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                showOutsideDays
                disabled={{ before: new Date() }}
                startMonth={new Date()}
              />
            </ul>
          </div>
        </div>

        <div className="d-flex flex-column gap-5">
          {isLoadingSpecificDateAvailability ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "100vh" }}
            >
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              {/* 尚未新增特定日期 */}
              {Object.keys(specificDateAvailability)?.length === 0 &&
                Object.keys(newAddSpecificDateAvailability)?.length === 0 && (
                  <div className="f-center mt-5">
                    <SectionFallback
                      materialIconName="calendar_clock"
                      fallbackText="尚未新增特定日期"
                    />
                  </div>
                )}

              {/* 正在新增 */}
              {Object.keys(newAddSpecificDateAvailability)?.length > 0 && (
                <div className="d-flex flex-column gap-5 bg-brand-02 p-4 rounded-4">
                  <p className="d-flex align-items-center">
                    <span className="material-symbols-outlined me-1">edit_calendar</span>正在新增
                  </p>
                  {Object.entries(newAddSpecificDateAvailability).map((item) => (
                    <BusinessHour
                      type="newSpecific"
                      day={item[0]}
                      key={item[0]}
                      defaultValue={item[1]}
                      revalidateAvailability={getAllSpecificDateAvailability}
                      removeNewSpecificDate={handleRemoveNewAddSpecificDateAvailability}
                    />
                  ))}
                </div>
              )}

              {/* 已儲存的日期 */}
              {Object.keys(specificDateAvailability)?.length > 0 && (
                <div className="d-flex flex-column gap-5">
                  {Object.keys(newAddSpecificDateAvailability)?.length > 0 && (
                    <p className="d-flex align-items-center">
                      <span className="material-symbols-outlined me-1">save</span>已儲存
                    </p>
                  )}

                  {Object.entries(specificDateAvailability).map((item) => (
                    <BusinessHour
                      type="existingSpecific"
                      day={item[0]}
                      key={item[0]}
                      defaultValue={item[1]}
                      revalidateAvailability={getAllSpecificDateAvailability}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
