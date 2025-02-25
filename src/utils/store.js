import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "./slice/bookingSlice";
import authReducer from "./slice/authSlice"

export const store = configureStore({
  reducer: {
    booking: bookingReducer,
    auth: authReducer
  },
});
