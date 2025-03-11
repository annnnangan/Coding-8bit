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

// 建立付款
const addPay = async (orderId, url) => {
  const response = await apiClient.post(`/payment/orders/${orderId}/pay`, {
    "frontendReturnUrl": url
  });
  return response.data.data;
};

// 查詢付款結果
const checkPayResult = async (transactionId) => {
  const response = await apiClient.get(`/payment/transactions/${transactionId}`);
  return response.data.data;
};

export default {
  addOrder,
  updateOrder,
  addPay,
  checkPayResult
};