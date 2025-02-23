import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "./slice/bookingSlice";
import userInfoSlice from "./slice/userInfoSlice";

export const store = configureStore({
  reducer: {
    booking: bookingReducer,
    user: userInfoSlice,
  },
});
