import { createSlice } from "@reduxjs/toolkit";

export const bookingSlice = createSlice({
  name: "booking",
  initialState: [
    {
      date: "2025-02-02",
      start_time: "10:00",
      end_time: "11:00",
      teacher: "2",
    },
  ],
});

export default bookingSlice.reducer;
