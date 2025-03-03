import apiClient from "./apiClient";
import { formatDateDash } from "@/utils/timeFormatted-utils";

// 新增預約
const addBooking = async (data) => {
  const response = await apiClient.post("/booking", data);
  return response.data.data;
};

// 講師後台 - 取得預約
const getTutorBookings = async ({ tutorId, status, startDate, endDate, serviceType }) => {
  const params = new URLSearchParams({ status });
  serviceType = serviceType === "all" ? undefined : serviceType;
  if (startDate) params.append("startDate", formatDateDash(startDate));
  if (endDate) params.append("endDate", formatDateDash(endDate));
  if (serviceType) params.append("service_type", serviceType);

  const response = await apiClient.get(`/booking/tutor/${tutorId}?${params.toString()}`);
  return response.data.data;
};

export default {
  addBooking,
  getTutorBookings,
};
