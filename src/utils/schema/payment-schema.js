import * as z from "zod";

// 信用卡卡號驗證
const luhnCheck = (cardNumber) => {
  // 移除空格和非數字字符
  const sanitizedNumber = cardNumber.replace(/\D/g, "");

  const digits = sanitizedNumber.split("").reverse().map(Number);

  const checkDigit = digits.splice(0, 1)[0];
  const sum = digits
    .map((digit, index) => (index % 2 === 0 ? digit * 2 : digit))
    .map((digit) => (digit > 9 ? digit - 9 : digit))
    .reduce((total, current) => total + current, 0);

  return (sum + checkDigit) % 10 === 0;
};

const CreditCardSchema = z.object({
  userCreditCardNumber: z
    .string()
    .min(19, "信用卡號碼應為 16 位數（含空格）")
    .max(19, "信用卡號碼應為 16 位數（含空格）")
    .regex(/^\d{4} \d{4} \d{4} \d{4}$/, "信用卡號碼格式錯誤")
    .refine((num) => luhnCheck(num), {
      message: "無效的信用卡號碼",
    }),

  creditCardExpiration: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "過期日格式錯誤 (MM / YY)"),

  creditCardCvc: z.string().regex(/^\d{3,4}$/, "CVC / CVV 格式錯誤"),
});

const BuyerSchema = z.object({
  buyerEmail: z.string().min(1, "信箱為必填").email("請輸入有效的 Email"),
  buyerName: z.string().min(1, "姓名為必填"),
  buyerTel: z.string().min(1, "電話號碼為必填").min(8, "電話不少於 8 碼").max(12, "電話不多於 12 碼"),
});

export const PaymentSchema = z.object({
  ...BuyerSchema.shape,
  ...CreditCardSchema.shape,
});
