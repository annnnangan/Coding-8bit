import apiClient from './apiClient';

// 取得所有訂閱方案
const getPlans = async () => {
  const response = await apiClient.get(`/plans/`);
  return response.data;
};

// 建立訂閱
const addSubscription = async (subscriptionData) => {
  const response = await apiClient.post(`/subscriptions/`, subscriptionData);
  return response.data;
};

// 更新訂閱狀態
const updateSubscription = async (id, subscriptionData) => {
  const response = await apiClient.put(`/subscriptions/${id}`, subscriptionData);
  return response.data;
};

export default {
  getPlans,
  addSubscription,
  updateSubscription,
};