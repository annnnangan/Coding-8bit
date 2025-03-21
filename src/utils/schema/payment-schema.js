import * as z from "zod";

const BuyerSchema = z.object({
  buyerEmail: z.string().min(1, "信箱為必填").email("請輸入有效的 Email"),
  buyerName: z.string().min(1, "姓名為必填"),
  buyerTel: z.string().min(1, "電話號碼為必填").min(8, "電話不少於 8 碼").max(12, "電話不多於 12 碼"),
});

export const PaymentSchema = z.object({
  ...BuyerSchema.shape,
});
