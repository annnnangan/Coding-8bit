import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "./slice/bookingSlice";

export const store = configureStore({
  reducer: {
    booking: bookingReducer,
  },
});
