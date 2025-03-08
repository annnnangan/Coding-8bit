import apiClient from './apiClient';

// 建立訂單
const addOrder = async (orderData) => {
  const response = await apiClient.post(`/orders/`, orderData);
  return response.data;
};

// 更新訂單狀態
const updateOrder = async (id, orderData) => {
  const response = await apiClient.put(`/orders/${id}`, orderData);
  return response.data;
};

export default {
  addOrder,
  updateOrder
};