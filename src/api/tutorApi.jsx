import apiClient from './apiClient';

// 取得講師列表
const getAllTutor = async () => {
  const response = await apiClient.get(`/api/v1/tutors`);
  return response.data;
};

// 取得單一講師
const getTutorDetail = async (id) => {
  const response = await apiClient.get(`/api/v1/tutor/${id}`);
  return response.data;
};

export default {
  getAllTutor,
  getTutorDetail
};