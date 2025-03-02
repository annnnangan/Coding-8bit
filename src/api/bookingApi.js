import apiClient from "./apiClient";

// 新增預約
const addBooking = async (data) => {
  const response = await apiClient.post("/booking", data);
  return response.data.data;
};

// 講師後台 - 取得所有預約
const getTutorBookings = async (tutorId) => {
  const response = await apiClient.get(`/booking/tutor/${tutorId}`);
  return response.data.data;
};

export default {
  addBooking,
  getTutorBookings,
};
