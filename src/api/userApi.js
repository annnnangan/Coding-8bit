import apiClient from './apiClient';

// 取得使用者資料
const getUserData = async () => {
  const response = await apiClient.get(`/user/users/me`);
  return response.data;
};

// 更新使用者資料
const updateUserData = async (userData) => {
  const response = await apiClient.apiClient.put(`/user/users/me, ${userData}`);
  return response.data;
};

// 切換使用者角色
const changeUserRole = async (role) => {
  const response = await apiClient.apiClient.put(`/user/users/me/role, ${role}`);
  return response.data;
};

export default {
  getUserData,
  updateUserData,
  changeUserRole
};