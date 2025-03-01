import apiClient from "./apiClient";

// 新增預約
const addBooking = async (data) => {
  const response = await apiClient.post("/booking", data);
  return response.data.data;
};

export default {
  addBooking,
};
