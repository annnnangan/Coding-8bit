import apiClient from "./apiClient";

// 取得所有需求列表
const getAllCustomRequests = async (sortBy = "created_at", order = "DESC", search = "", limit) => {
  const response = await apiClient.get(`/custom-requests/?sortBy=${sortBy}&order=${order}&search=${search}&limit=${limit}`);
  return response.data.data;
};

// 取得單一使用者需求列表
const getUserCustomRequests = async (id, page = 1, limit = 6) => {
  const response = await apiClient.get(`/custom-requests/?user_id=${id}&page=${page}&limit=${limit}`);
  return response.data.data;
};

// 新增需求列表
const addCustomRequest = async (data) => {
  const response = await apiClient.post(`/custom-requests/`, data);
  return response.data;
};

// 新增需求圖片
const addCustomRequestImg = async (data) => {
  const response = await apiClient.post(`/custom-request-photos/`, data);
  return response.data.data;
};

// 刪除需求列表
const deleteCustomRequest = async (id) => {
  const response = await apiClient.delete(`/custom-requests/${id}`);
  return response.data;
};

export default {
  getAllCustomRequests,
  getUserCustomRequests,
  addCustomRequest,
  addCustomRequestImg,
  deleteCustomRequest,
};
