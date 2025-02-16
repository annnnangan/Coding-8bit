import apiClient from './apiClient';

// 取得課程列表
const getAllCourses = async () => {
  const response = await apiClient.get(`/course`);
  return response.data;
};

// 取得各類別課程列表
const getCourses = async (category) => {
  const response = await apiClient.get(`/course/?category=${category}`);
  return response.data;
};

// 取得單一課程
const getCourseDetail = async (id) => {
  const response = await apiClient.get(`/videos/${id}`);
  return response.data;
};

// 取得單一課程的留言
const getCourseComments = async (id) => {
  const response = await apiClient.get(`/videos/${id}/comments`);
  return response.data;
};

// 取得單一課程的章節
const getCourseChapters = async (id) => {
  const response = await apiClient.get(`/videos/${id}/chapters`);
  return response.data;
};

export default {
  getAllCourses,
  getCourses,
  getCourseDetail,
  getCourseComments,
  getCourseChapters
};