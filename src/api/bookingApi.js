import apiClient from "./apiClient";
import { formatDateDash } from "@/utils/timeFormatted-utils";

// 新增預約
const addBooking = async (data) => {
  const response = await apiClient.post("/booking", data);
  return response.data.data;
};

// 講師後台 - 取得預約
const getTutorBookings = async ({ tutorId, status, startDate, endDate, serviceType, limit }) => {
  const params = new URLSearchParams({ status });
  serviceType = serviceType === "all" ? undefined : serviceType;
  if (startDate) params.append("startDate", formatDateDash(startDate));
  if (endDate) params.append("endDate", formatDateDash(endDate));
  if (serviceType) params.append("service_type", serviceType);
  if (limit) params.append("limit", limit);

  const response = await apiClient.get(`/booking/tutor/${tutorId}?${params.toString()}`);
  return response.data.data;
};

// 取得單一預約
const getBooking = async (bookingId) => {
  const response = await apiClient.get(`/booking/${bookingId}`);
  return response.data.data;
};

// 講師後台 - 儲存預約講師筆記
const saveTutorNotes = async (bookingId, tutorNotes) => {
  const response = await apiClient.put(`/booking/${bookingId}`, { tutor_notes: tutorNotes });
  return response.data.data;
};

// 學生後台 - 儲存學生評價
const saveStudentComment = async (bookingId, studentComment) => {
  const response = await apiClient.put(`/booking/${bookingId}/comment`, studentComment);
  return response.data.data;
};

// 學生後台 - 取得預約
const getStudentBookings = async ({ studentId, status, startDate, endDate, serviceType }) => {
  const params = new URLSearchParams({ status });
  serviceType = serviceType === "all" ? undefined : serviceType;
  if (startDate) params.append("startDate", formatDateDash(startDate));
  if (endDate) params.append("endDate", formatDateDash(endDate));
  if (serviceType) params.append("service_type", serviceType);

  const response = await apiClient.get(`/booking/student/${studentId}?${params.toString()}`);
  return response.data.data;
};

export default {
  addBooking,
  getTutorBookings,
  getBooking,
  saveTutorNotes,
  saveStudentComment,
  getStudentBookings,
};
