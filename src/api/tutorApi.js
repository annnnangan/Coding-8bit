import apiClient from './apiClient';

// 取得講師列表
const getAllTutor = async () => {
  const response = await apiClient.get(`/tutors`);
  return response.data;
};

// 取得單一講師資料
const getTutorDetail = async (tutorId) => {
  const response = await apiClient.get(`/tutor/${tutorId}`);
  return response.data;
};

export default {
  getAllTutor,
  getTutorDetail
};