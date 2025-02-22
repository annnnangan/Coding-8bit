import * as z from "zod";
import { PaymentSchema } from "@/utils/schema/payment-schema";
export const serviceTypeMap = {
  courseSession: "一對一教學",
  codeReview: "程式碼檢視",
};

// 需要有以下資料才可以開始填寫booking step 1
export const bookingStep1PreCheck = {
  tutor_id: "講師",
  booking_date: "預約日期",
  start_time: "預約時段",
  service_type: "預約服務",
};

// 需要有以下資料才可以開始填寫booking step 2
export const bookingStep2PreCheckCodeReview = {
  ...bookingStep1PreCheck,
  source_code_url: "程式碼儲存庫",
  instruction_details: "指導的項目",
};

export const bookingStep2PreCheckCourseSession = {
  ...bookingStep1PreCheck,
  instruction_details: "指導的項目",
};

const BookingInformationSchema = z
  .object({
    booking_date: z.string(),
    start_time: z.string().min(1, "請選擇預約時段。"),
    service_type: z.enum(Object.keys(serviceTypeMap), {
      errorMap: () => ({
        message: "暫時只提供選擇一對一教學或程式碼檢視之預約服務。",
      }),
    }),
    tutor_name: z.string().min(1, "請選擇講師。"),
    tutor_id: z.string().min(1, "請選擇講師。"),
    source_code_url: z.string().url({ message: "請輸入有效連結。" }).optional(),
    instruction_details: z.string().min(30, "請輸入至少輸入30字來描述你的問題。"),
    coupon_code: z.string().optional(),
  })
  .refine(
    (data) => {
      // If service_type is "codeReview", source_code_url should not be undefined or null
      if (data.service_type === "codeReview" && !data.source_code_url) {
        return false; // Source code URL is required if service_type is "codeReview"
      }
      return true;
    },
    {
      message: "當選擇程式碼檢視服務時，必須提供 source_code_url。",
      path: ["source_code_url"],
    }
  );

export const BookingSchema = z.object({
  booking: BookingInformationSchema,
  ...PaymentSchema.shape,
});
