import { createSlice } from "@reduxjs/toolkit";

export const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    tutorId: "",
    tutorName: "",
    date: "",
    timeslots: [],
    price: "",
    serviceType: "",
    sourceCodeUrl: "",
    instructionDetails: "",
  },
  reducers: {
    updateFormData(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateFormData } = bookingSlice.actions;

export default bookingSlice.reducer;
