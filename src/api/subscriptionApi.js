import apiClient from './apiClient';

// 取得使用者資料
const addSubscription = async (subscriptionData) => {
  const response = await apiClient.post(`/subscriptions/`, subscriptionData);
  return response.data;
};


export default {
  addSubscription,
};