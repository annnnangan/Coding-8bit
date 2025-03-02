import apiClient from './apiClient';

// 取得使用者資料
const getUserData = async () => {
  const response = await apiClient.get(`/user/users/me`);
  return response.data;
};

// 更新使用者資料
const updateUserData = async (userData) => {
  const response = await apiClient.put(`/user/users/me`, userData);
  return response.data;
};

// 新增使用者角色
const addRole = async (id, role) => {
  const response = await apiClient.post(`/user/users/${id}/role`, { role: role });
  return response.data;
};

// 切換使用者角色
const changeUserRole = async (role) => {
  const response = await apiClient.put(`/user/users/me/role`, { role: role });
  return response.data;
};

export default {
  getUserData,
  updateUserData,
  addRole,
  changeUserRole
};