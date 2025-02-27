import axios from 'axios';

import apiClient from './apiClient';

// import { store } from '../utils/store';
// import { setUser } from '../utils/slice/userInfoSlice';

// 驗證身分
const loginCheck = async () => {
  await apiClient.get(`/auth/check`);
  return;
};

// 註冊
const signup = async (userData) => {
  await apiClient.post(`/auth/register`, userData);
  return;
};

// 登入
const login = async (formData) => {
  const response = await apiClient.post(`/auth/login`, formData);
  const { token } = response.data;
  document.cookie = `authToken=${token}; path=/`;
  axios.defaults.headers.common.Authorization = token;
  return;
};

// 啟用帳號
const activateAccount = async (token) => {
  await apiClient.get(`/auth/activate?token=${token}`);
  return
};

// 傳送忘記密碼信件
const sendForgotPasswordEmail = async(email) => {
  await apiClient.post(`/password/forgot-password`, email);
  return
}

// 重設密碼
const resetPassword = async(data) => {
  await apiClient.post(`/password/reset-password`, data);
  return
}

export default {
  loginCheck,
  signup,
  login,
  activateAccount,
  sendForgotPasswordEmail,
  resetPassword
};
