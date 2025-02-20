import apiClient from './apiClient';

// 取得所有課程列表
const getAllCourses = async (page = 1, sortBy = "rating", order = "DESC", limit = 9) => {
  const response = await apiClient
  .get(`/course?page=${page}&sortBy=${sortBy}&order=${order}&limit=${limit}`);
  return response.data;
};

// 取得特定類別所有影片列表
const getAllVideos = async (video_type, page = 1, limit = 9 ) => {
  const response = await apiClient.get(`/video/?video_type=${video_type}&page=${page}&limit=${limit}`);
  return response.data;
};

// 取得單一課程
const getCourseDetail = async (id) => {
  const response = await apiClient.get(`/course/${id}`);
  return response.data;
};

// 取得課程所有章節
const getCourseChapter = async (id) => {
  const response = await apiClient.get(`/course/${id}/chapters`);
  return response.data.sort((a, b) => a.sort_order - b.sort_order);
};

// 取得單一影片
const getVideoDetail = async (id) => {
  const response = await apiClient.get(`/video/${id}`);
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
  getAllVideos,
  getCourseDetail,
  getCourseChapter,
  getVideoDetail, 
  getCourseComments,
  getCourseChapters
};