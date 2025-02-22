import { createSlice } from "@reduxjs/toolkit";

export const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    tutor_id: "1",
    tutor_name: "老師妳好",
    booking_date: "2025/03/20",
    start_time: "10:00",
    end_time: "11:00",
    price: "200",
    service_type: "codeReview",
    source_code_url: "",
    instruction_details: "",
    coupon_code: "",
  },
  reducers: {
    updateFormData(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateFormData } = bookingSlice.actions;

export default bookingSlice.reducer;
