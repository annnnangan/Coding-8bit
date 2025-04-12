import { createSlice } from "@reduxjs/toolkit";

export const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    tutor_id: "",
    tutor_name: "",
    booking_date: "",
    timeslots: [],
    price: "",
    service_type: "",
    source_code_url: "",
    instruction_details: "",
  },
  reducers: {
    updateFormData(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateFormData } = bookingSlice.actions;

export default bookingSlice.reducer;
