import apiClient from "./apiClient";

// 取得所有需求列表
const getAllCustomRequests = async (sortBy = "created_at", order = "DESC", search = "", limit = 8) => {
  const response = await apiClient.get(`/custom-requests/?sortBy=${sortBy}&order=${order}&search=${search}&limit=${limit}`);
  return response.data.data;
};

// 新增需求列表
const addCustomRequest = async (data) => {
  const response = await apiClient.post(`/custom-requests/`, data);
  return response.data.data;
};

export default {
  getAllCustomRequests,
  addCustomRequest,
};
