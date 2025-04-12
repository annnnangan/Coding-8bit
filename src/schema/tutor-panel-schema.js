import * as z from "zod";
import { formatHour } from "@/utils/timeFormatted-utils";

const validateNoOverlapTimeslots = (slots, ctx) => {
  if (slots.length > 0) {
    // Sort time slots by start time
    const sortedSlots = [...slots].sort((a, b) => a.start_hour - b.start_hour);

    for (let i = 0; i < sortedSlots.length - 1; i++) {
      const current = sortedSlots[i];
      const next = sortedSlots[i + 1];

      if (current.start_hour != null && current.end_hour != null && next.start_hour != null && next.end_hour != null) {
        if (next.start_hour < current.end_hour) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `時段 ${formatHour(current.start_hour)} - ${formatHour(current.end_hour)} 和 時段 ${formatHour(next.start_hour)} - ${formatHour(next.end_hour)} 有重疊。`,
          });
        }
      }
    }
  }
};

export const TimeslotSchema = z
  .object({
    start_hour: z
      .union([z.string(), z.number()]) // Accept both string and number
      .transform((val) => Number(val)) // Convert to number
      .refine((val) => val >= 0 && val <= 23, "開始時間必須在 0-23 之間。"),

    end_hour: z
      .union([z.string(), z.number()]) // Accept both string and number
      .transform((val) => Number(val)) // Convert to number
      .refine((val) => val >= 1 && val <= 24, "結束時間必須在 1-24 之間。"),
  })
  .superRefine((slot, ctx) => {
    if (slot.start_hour >= slot.end_hour) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "開始時間需早於結束時間。",
        path: ["start_hour"],
      });
    }
  });

export const BusinessHourSchema = z
  .object({
    is_open: z.boolean().default(false),
    time_slots: z.array(TimeslotSchema).optional().default([]).superRefine(validateNoOverlapTimeslots),
  })
  .refine((data) => !data.is_open || (data.time_slots && data.time_slots.length > 0), {
    message: "若該日營業，請至少提供一個時段。",
    path: ["time_slots"],
  });
