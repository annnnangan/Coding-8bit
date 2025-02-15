import * as z from "zod";

const startTimeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
const endTimeRegex = /^([01]\d|2[0-4]):([0-5]\d)$/;

const validateNoOverlapTimeslots = (slots, ctx) => {
  if (slots.length > 0) {
    // Sort time slots by start time
    const sortedSlots = [...slots].sort((a, b) => a.startTime.localeCompare(b.startTime));

    for (let i = 0; i < sortedSlots.length - 1; i++) {
      const current = sortedSlots[i];
      const next = sortedSlots[i + 1];

      // Check for overlap: next.startTime should be >= current.endTime
      if (next.startTime < current.endTime) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `時段${current.startTime} - ${current.endTime} 和 時段${next.startTime} - ${next.endTime}有重疊。`,
        });
      }
    }
  }
};

export const TimeslotSchema = z
  .object({
    startTime: z.string().regex(startTimeRegex, "請填寫開始時間。"),
    endTime: z.string().regex(endTimeRegex, "請填寫結束時間。"),
  })
  .superRefine((slot, ctx) => {
    if (slot.startTime >= slot.endTime) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "開始時間需早於結束時間。",
        path: ["startTime"],
      });
    }
  });

export const BusinessHourSchema = z
  .object({
    is_open: z.boolean().default(false),
    timeslots: z.array(TimeslotSchema).optional().default([]).superRefine(validateNoOverlapTimeslots),
  })
  .refine((data) => !data.is_open || data.timeslots.length > 0, {
    message: "若該日營業，請至少提供一個時段。",
    path: ["timeslots"],
  });
