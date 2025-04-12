import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import Swal from "sweetalert2";
import PropTypes from "prop-types";

import tutorApi from "@/api/tutorApi";

import FormSubmitButton from "@/components/common/FormSubmitButton";

import { generateTimeslots } from "@/utils/generate-timeslots-utils";
import { BusinessHourSchema } from "@/utils/schema/tutor-panel-schema";
import { daysOfWeekInChinese, formatHour } from "@/utils/timeFormatted-utils";

export default function BusinessHour({ type, day, defaultValue, revalidateAvailability, removeNewSpecificDate }) {
  const tutorId = useSelector((state) => state.auth?.userData?.tutor_id);
  const [isEdit, setEdit] = useState(false);
  const [isLoading, setLoadingState] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    trigger,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(BusinessHourSchema),
    defaultValues: defaultValue,
  });

  const timeslotsWatch = watch("time_slots") || [];
  const isOpenWatch = watch("is_open");

  const startTimeTimeslots = useMemo(() => generateTimeslots("startTime"), []);
  const endTimeTimeslots = useMemo(() => generateTimeslots("endTime"), []);

  /* -------------------------- Click Handler -------------------------- */
  // UI Interaction - 增加日期裡面的timeslot pair
  const handleAddTimeslot = () => {
    setValue("time_slots", [...(timeslotsWatch || []), { start_hour: 0, end_hour: 1 }]);
    trigger();
  };

  // UI Interaction - 刪除日期裡面的timeslot pair
  const handleRemoveTimeslot = (index) => {
    setValue(
      `time_slots`,
      timeslotsWatch.filter((_, i) => i !== index)
    );
    trigger();
  };

  // UI Interaction
  const handleEditButtonClick = () => {
    // 在Day of Week 和已儲存的 specific date的情況下按取消編輯，會reset到原本的資料
    if ((type === "existingSpecific" || type === "week") && isEdit) {
      reset(defaultValue);
      setEdit((prev) => !prev);
    }

    // 在新加的specific date的情況下按取消編輯，會整個日期remove from list
    if (type === "newSpecific" && isEdit && removeNewSpecificDate) {
      removeNewSpecificDate(day);
    }

    // 所有情況下按編輯，會開始編輯
    if (!isEdit) {
      setEdit((prev) => !prev);
    }
  };

  // 刪除specific date availability
  const handleRemoveSpecificDate = async () => {
    if (type === "newSpecific") {
      removeNewSpecificDate(day);
    }

    if (type === "existingSpecific") {
      Swal.fire({
        title: "確定要刪除嗎？",
        showCancelButton: true,
        confirmButtonText: "刪除",
        denyButtonText: "不要刪除",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setLoadingState(true);
          try {
            await tutorApi.deleteSpecificDateAvailability(tutorId, day);
            Swal.fire({
              icon: "success",
              title: "刪除成功",
            });
            revalidateAvailability();
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "刪除失敗",
              text: error.response?.data?.message || "發生錯誤，請稍後再試",
            });
          } finally {
            setLoadingState(false);
          }
        }
      });
    }
  };

  // 儲存可預約時間
  const onSubmit = async (data) => {
    setLoadingState(true);
    try {
      // Day of Week
      if (type === "week") {
        if (data.is_open && data.time_slots.length > 0) {
          await tutorApi.updateDayOfWeekAvailability(tutorId, daysOfWeekInChinese.indexOf(day), { time_slots: data.time_slots });
        } else {
          await tutorApi.deleteDayOfWeekAvailability(tutorId, daysOfWeekInChinese.indexOf(day));
        }
      }

      // Specific Date
      if (type === "existingSpecific" || type === "newSpecific") {
        if (data.is_open && data.time_slots.length > 0) {
          await tutorApi.updateSpecificDateAvailability(tutorId, day, {
            time_slots: data.time_slots.map((slot) => ({
              ...slot,
              action_type: "add", // Add the new action_type property for API
            })),
          });
        } else {
          await tutorApi.updateSpecificDateAvailability(tutorId, day, {
            time_slots: [{ start_hour: 0, end_hour: 24, action_type: "cancel" }],
          });
        }

        // 儲存後，把日期從正在設定的列表移除
        if (type === "newSpecific") {
          removeNewSpecificDate(day);
        }
      }

      revalidateAvailability();
      Swal.fire({
        icon: "success",
        title: "修改成功",
        text: `你已成功修改${day}的可預約時間`,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "修改失敗",
        text: error.response?.data?.message || "發生錯誤，請稍後再試",
      });
    } finally {
      setLoadingState(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="tutor-booking">
      <div className="d-flex align-items-center gap-2">
        <div className="flex-grow-1">
          <div key={`${day}-${type}`} className="accordion" id={`accordion${day}-${type}`}>
            <div className="accordion-item border-0 rounded-5">
              {/* Accordion Header */}
              <h2 className="accordion-header">
                <button
                  className={`accordion-button ${type === "newSpecific" ? "" : "collapsed"} ps-2`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${day}-${type}`}
                  aria-expanded={type === "newSpecific" ? "true" : "false"}
                  aria-controls={`collapse${day}-${type}`}
                  style={{ backgroundColor: "transparent", boxShadow: "none" }}
                >
                  <div className="w-100 d-flex align-items-center justify-content-between mx-4">
                    <div className="d-flex align-items-center">
                      <p className="fs-6 fs-md-5 me-4 me-lg-5 me-xxl-10"> {day}</p>

                      {!isOpenWatch && type !== "newSpecific" && <p className="text-gray-03 fs-7">沒有可預約時間</p>}
                    </div>
                  </div>
                </button>
              </h2>

              {/* Accordion Body */}
              <div id={`collapse${day}-${type}`} className={`accordion-collapse collapse ${type === "newSpecific" ? "show" : ""}`} data-bs-parent={`#accordion${day}-${type}`}>
                <div className="accordion-body pt-0">
                  <Controller
                    name={`is_open`}
                    control={control}
                    render={({ field }) => (
                      <div className="form-check form-switch mb-5">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id={`flexSwitchCheck${day}`}
                          checked={field.value ?? false}
                          disabled={!isEdit || isLoading}
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            field.onChange(isChecked);
                            setValue(`is_open`, isChecked);
                            if (!isChecked) {
                              setValue(`time_slots`, []);
                            }
                            trigger();
                          }}
                        />
                        <label className="form-check-label fs-7" htmlFor={`flexSwitchCheck${day}`}>
                          是否開放預約？
                        </label>
                      </div>
                    )}
                  />

                  {errors?.time_slots && <div className="text-danger mb-5 fs-7">{errors?.time_slots?.message || errors?.time_slots?.root?.message}</div>}

                  {/* Timeslots Pair */}
                  {timeslotsWatch.length > 0 &&
                    timeslotsWatch.map((slot, index) => (
                      <div className="mb-2" key={index}>
                        <div className="d-flex align-items-center gap-2 mb-1 flex-wrap">
                          {/* Start Time */}
                          <Controller
                            name={`time_slots.${index}.start_hour`}
                            control={control}
                            render={({ field }) => (
                              <div className="form-floating" id="floatingSelect">
                                <select
                                  className={`form-select ps-3 pe-11 pt-4 fs-7 pb-0${errors?.time_slots?.[index]?.start_hour ? " is-invalid" : ""}`}
                                  value={field.value}
                                  onChange={(e) => {
                                    field.onChange(e);
                                    trigger();
                                  }}
                                  disabled={!isEdit || isLoading}
                                >
                                  {startTimeTimeslots.map((time) => (
                                    <option key={time} value={time}>
                                      {formatHour(time)}
                                    </option>
                                  ))}
                                </select>
                                <label htmlFor="floatingSelect" className="fs-8">
                                  開始時間
                                </label>
                              </div>
                            )}
                          />

                          <p>-</p>

                          {/* End Time */}
                          <Controller
                            name={`time_slots.${index}.end_hour`}
                            control={control}
                            render={({ field }) => (
                              <div className="form-floating">
                                <select
                                  className={`form-select ps-3 pe-11 pt-4 fs-7 pb-0${errors?.time_slots?.[index]?.end_hour ? " is-invalid" : ""}`}
                                  value={field.value}
                                  onChange={(e) => {
                                    field.onChange(e);
                                    trigger();
                                  }}
                                  disabled={!isEdit || isLoading}
                                >
                                  {endTimeTimeslots.map((time) => (
                                    <option key={time} value={time}>
                                      {formatHour(time)}
                                    </option>
                                  ))}
                                </select>
                                <label htmlFor="floatingSelect" className="fs-8 ps-3">
                                  結束時間
                                </label>
                              </div>
                            )}
                          />

                          {isEdit && (
                            <span className="material-symbols-outlined cursor-pointer" onClick={() => handleRemoveTimeslot(index)} disabled={isLoading}>
                              delete
                            </span>
                          )}
                        </div>
                        {errors?.time_slots?.[index]?.start_hour && <div className="text-danger fs-8">{errors?.time_slots[index]?.start_hour?.message}</div>}
                        {errors?.time_slots?.[index]?.end_hour && <div className="text-danger fs-8">{errors?.time_slots[index]?.end_hour?.message}</div>}
                      </div>
                    ))}

                  {/* Action Button */}
                  <div className="w-full d-flex justify-content-between flex-wrap gap-2 mt-5">
                    <div className="d-flex gap-2">
                      {isOpenWatch && isEdit && (
                        <button className="px-5 py-2 fs-8 btn btn-outline-brand-03 rounded-4 border-2" onClick={handleAddTimeslot} disabled={isLoading} type="button">
                          新增
                        </button>
                      )}

                      {isEdit && <FormSubmitButton buttonStyle={"px-5 py-2 fs-8"} isLoading={isLoading} buttonText="儲存" loadingText="儲存中..." roundedRadius={4} />}
                    </div>

                    <div className="ms-auto">
                      <button className="px-5 py-2 fs-8 btn btn-outline-brand-03 rounded-4 border-2" onClick={handleEditButtonClick} type="button">
                        {isEdit ? "取消編輯" : "編輯"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {(type === "existingSpecific" || type === "newSpecific") && (
          <span className="material-symbols-outlined cursor-pointer ms-auto" onClick={handleRemoveSpecificDate}>
            delete
          </span>
        )}
      </div>
    </form>
  );
}

BusinessHour.propTypes = {
  type: PropTypes.oneOf(["week", "newSpecific", "existingSpecific"]).isRequired,
  day: PropTypes.string.isRequired,
  defaultValue: PropTypes.shape({
    is_open: PropTypes.bool.isRequired,
    time_slots: PropTypes.arrayOf(
      PropTypes.shape({
        start_hour: PropTypes.number.isRequired,
        end_hour: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
  revalidateAvailability: PropTypes.func.isRequired,
  removeNewSpecificDate: PropTypes.func,
};
