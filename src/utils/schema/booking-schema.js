import * as z from "zod";
import { PaymentSchema } from "@/utils/schema/payment-schema";

export const serviceTypeMap = {
  courseSession: "一對一教學",
  codeReview: "程式碼檢視",
};

const BookingInformationSchema = z
  .object({
    date: z.string(),
    timeslots: z.array(z.number()).min(1, "請選擇預約時段。"),
    serviceType: z.enum(Object.keys(serviceTypeMap), {
      errorMap: () => ({
        message: "暫時只提供選擇一對一教學或程式碼檢視之預約服務。",
      }),
    }),
    tutorId: z.string().min(1, "請選擇講師。"),
    sourceCodeUrl: z.string().url({ message: "請輸入有效連結。" }).optional(),
    instructionDetails: z.string().min(30, "請輸入至少輸入30字來描述你的問題。"),
  })
  .refine(
    (data) => {
      // If service_type is "codeReview", source_code_url should not be undefined or null
      if (data.serviceType === "codeReview" && !data.sourceCodeUrl) {
        return false; // Source code URL is required if service_type is "codeReview"
      }
      return true;
    },
    {
      message: "當選擇程式碼檢視服務時，必須提供程式庫連結。",
      path: ["sourceCodeUrl"],
    }
  );

export const BookingSchema = z.object({
  booking: BookingInformationSchema,
  ...PaymentSchema.shape,
});
