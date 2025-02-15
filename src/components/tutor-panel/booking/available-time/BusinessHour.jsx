import { generateTimeslots } from "../../../../utils/generate-timeslots-utils";
import { BusinessHourSchema } from "../../../../utils/schema/tutor-panel-schema";
import FormSubmitButton from "../../../common/FormSubmitButton";

import { zodResolver } from "@hookform/resolvers/zod";
import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function BusinessHour({ type, day }) {
  const [isEdit, setEdit] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(BusinessHourSchema),
  });

  const timeslotsWatch = watch("timeslots") || [];
  const isOpenWatch = watch("isOpen");

  const startTimeTimeslots = useMemo(() => generateTimeslots("startTime"), []);
  const endTimeTimeslots = useMemo(() => generateTimeslots("endTime"), []);

  // Trigger when user clicks the button to add a new timeslot row to specific day of week
  const handleAddTimeslot = () => {
    setValue("timeslots", [...(timeslotsWatch || []), { startTime: "", endTime: "" }]);
  };

  const handleRemoveTimeslot = (index) => {
    setValue(
      `timeslots`,
      timeslotsWatch.filter((_, i) => i !== index)
    );
  };

  const onSubmit = (data) => {
    console.log(day.value || day, data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="tutor-booking">
      <div key={day.value} className="accordion" id={`accordion${day.value}`}>
        <div className="accordion-item border-0 rounded-5">
          {/* Header */}
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed ps-2"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse${type === "week" ? day.value : day}`}
              aria-expanded={isEdit || isOpenWatch ? "true" : "false"}
              aria-controls={`collapse${type === "week" ? day.value : day}`}
              style={{ backgroundColor: "transparent", boxShadow: "none" }}
            >
              <div className="w-100 d-flex align-items-center justify-content-between mx-4">
                <div className="d-flex align-items-center">
                  <p className="fs-6 fs-md-5 me-4 me-lg-5 me-xxl-10"> {type === "week" ? day.label : day}</p>

                  {!isOpenWatch && <p className="text-gray-03 fs-7">沒有可預約時間</p>}
                </div>

                <div className="btn btn-outline-brand-03 rounded-4 border-2" onClick={() => setEdit((prev) => !prev)} onMouseDown={(e) => e.preventDefault()}>
                  {isEdit ? "取消編輯" : "編輯"}
                </div>
              </div>
            </button>
          </h2>
          {/* body */}
          <div
            id={`collapse${type === "week" ? day.value : day}`}
            className={`accordion-collapse collapse ${isEdit || isOpenWatch ? "show" : ""}`}
            data-bs-parent={`#accordion${type === "week" ? day.value : day}`}
          >
            <div className="accordion-body pt-0">
              <Controller
                name={`isOpen`}
                control={control}
                render={({ field }) => (
                  <div className="form-check form-switch mb-5">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id={`flexSwitchCheck${type === "week" ? day.value : day}`}
                      checked={field.value ?? false}
                      disabled={!isEdit}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        field.onChange(isChecked);
                        setValue(`isOpen`, isChecked);
                        if (!isChecked) {
                          setValue(`timeslots`, []);
                        }
                      }}
                    />
                    <label className="form-check-label" htmlFor={`flexSwitchCheck${type === "week" ? day.value : day}`}>
                      是否開放預約？
                    </label>
                  </div>
                )}
              />
              {errors?.timeslots?.root && <div className="text-danger mb-2">{errors?.timeslots?.root?.message}</div>}
              {timeslotsWatch.length > 0 &&
                timeslotsWatch.map((slot, index) => (
                  <div key={index} className="d-flex align-items-center gap-2 mb-5 flex-wrap">
                    {/* Start Time */}
                    <Controller
                      name={`timeslots.${index}.startTime`}
                      control={control}
                      render={({ field }) => (
                        <div
                          className="d-flex flex-column"
                          style={{
                            transform: errors?.timeslots?.[index]?.endTime ? "translateY(-10px)" : "translateY(0)",
                          }}
                        >
                          <select
                            className={`form-select ${errors?.timeslots?.[index]?.startTime ? "is-invalid" : ""} px-4 py-3`}
                            value={field.value || ""}
                            onChange={field.onChange}
                            disabled={!isEdit}
                          >
                            <option value="" disabled>
                              開始時間
                            </option>
                            {startTimeTimeslots.map((time) => (
                              <option key={time} value={time}>
                                {time}
                              </option>
                            ))}
                          </select>
                          {errors?.timeslots?.[index]?.startTime && <div className="invalid-feedback">{errors?.timeslots[index]?.startTime?.message}</div>}
                        </div>
                      )}
                    />

                    <p
                      style={{
                        transform:
                          errors?.timeslots?.[index]?.startTime || errors?.timeslots?.[index]?.endTime
                            ? errors?.timeslots?.[index]?.startTime && errors?.timeslots?.[index]?.endTime
                              ? "translateY(-20px)"
                              : "translateY(-10px)"
                            : "translateY(0)",
                      }}
                    >
                      -
                    </p>

                    {/* End Time */}
                    <Controller
                      name={`timeslots.${index}.endTime`}
                      control={control}
                      render={({ field }) => (
                        <div
                          className="d-flex flex-column"
                          style={{
                            transform: errors?.timeslots?.[index]?.startTime ? "translateY(-10px)" : "translateY(0)",
                          }}
                        >
                          <select className={`form-select px-4 py-3 ${errors?.timeslots?.[index]?.endTime ? "is-invalid" : ""}`} value={field.value || ""} onChange={field.onChange} disabled={!isEdit}>
                            <option value="" disabled>
                              結束時間
                            </option>
                            {endTimeTimeslots.map((time) => (
                              <option key={time} value={time}>
                                {time}
                              </option>
                            ))}
                          </select>
                          {errors?.timeslots?.[index]?.endTime && <div className="invalid-feedback">{errors?.timeslots[index]?.endTime?.message}</div>}
                        </div>
                      )}
                    />

                    {isEdit && (
                      <span
                        className="material-symbols-outlined cursor-pointer"
                        onClick={() => handleRemoveTimeslot(index)}
                        style={{
                          transform:
                            errors?.timeslots?.[index]?.startTime || errors?.timeslots?.[index]?.endTime
                              ? errors?.timeslots?.[index]?.startTime && errors?.timeslots?.[index]?.endTime
                                ? "translateY(-20px)"
                                : "translateY(-10px)"
                              : "translateY(0)",
                        }}
                      >
                        delete
                      </span>
                    )}
                  </div>
                ))}

              {isEdit && isOpenWatch && (
                <div>
                  <button className="btn btn-outline-brand-03 rounded-4 border-2 me-4" onClick={handleAddTimeslot}>
                    新增
                  </button>
                  <FormSubmitButton isLoading={isSubmitting} buttonText="儲存" loadingText="儲存中..." roundedRadius={4} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

BusinessHour.propTypes = {
  type: PropTypes.oneOf(["week", "specific"]).isRequired,
  day: PropTypes.oneOfType([
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }), // For week-based scheduling
    PropTypes.string, // For specific date scheduling
  ]).isRequired,
};
