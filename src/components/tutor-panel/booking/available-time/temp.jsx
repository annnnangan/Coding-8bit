import React from "react";

const temp = () => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        {daysOfWeekMap.map((day) => {
          // Watch the timeslots for this specific day
          const timeslots = watch(`${day.value}.timeslots`) || [];

          return (
            <div key={day.value} className="accordion" id={`accordion${day.value}`}>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${day.value}`} aria-expanded="false" aria-controls={`collapse${day.value}`}>
                    <Controller
                      name={`${day.value}.is_enabled`}
                      control={control}
                      render={({ field }) => (
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id={`flexSwitchCheck${day.value}`}
                            checked={field.value ?? false}
                            onChange={(e) => {
                              const isChecked = e.target.checked;
                              field.onChange(isChecked);
                              setValue(`${day.value}.is_enabled`, isChecked);
                              if (!isChecked) {
                                setValue(`${day.value}.timeslots`, []);
                              }
                            }}
                          />
                          <label className="form-check-label" htmlFor={`flexSwitchCheck${day.value}`}>
                            {day.label}
                          </label>
                        </div>
                      )}
                    />
                  </button>
                </h2>
                <div id={`collapse${day.value}`} className="accordion-collapse collapse" data-bs-parent={`#accordion${day.value}`}>
                  <div className="accordion-body">
                    {timeslots.length > 0 ? (
                      timeslots.map((slot, index) => (
                        <div key={index} className="d-flex align-items-center gap-2 mb-3">
                          {/* From Time */}
                          <Controller
                            name={`${day.value}.timeslots.${index}.from`}
                            control={control}
                            render={({ field }) => (
                              <select className="form-select" style={{ maxWidth: "180px" }} value={field.value || ""} onChange={(e) => field.onChange(e.target.value)}>
                                <option value="" disabled>
                                  開始時間
                                </option>
                                {fromTimeslots.map((time) => (
                                  <option key={time} value={time}>
                                    {time}
                                  </option>
                                ))}
                              </select>
                            )}
                          />

                          <span> - </span>

                          {/* To Time */}
                          <Controller
                            name={`${day.value}.timeslots.${index}.to`}
                            control={control}
                            render={({ field }) => (
                              <select className="form-select" style={{ maxWidth: "180px" }} value={field.value || ""} onChange={(e) => field.onChange(e.target.value)}>
                                <option value="" disabled>
                                  結束時間
                                </option>
                                {toTimeslots.map((time) => (
                                  <option key={time} value={time}>
                                    {time}
                                  </option>
                                ))}
                              </select>
                            )}
                          />
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">沒有時段，請點擊按鈕新增。</p>
                    )}

                    <button
                      type="button"
                      className="btn btn-primary mt-2"
                      onClick={() => {
                        setValue(`${day.value}.timeslots`, [...(timeslots || []), { from: "", to: "" }]);
                      }}
                    >
                      + 新增時段
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </form>
  );
};

export default temp;
