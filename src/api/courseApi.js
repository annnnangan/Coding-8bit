import apiClient from "./apiClient";

// 取得所有課程列表
const getAllCourses = async (page = 1, sortBy = "rating", order = "DESC", limit = 9) => {
  const response = await apiClient.get(`/course?page=${page}&sortBy=${sortBy}&order=${order}&limit=${limit}`);
  return response.data.data;
};

// 取得特定類別所有影片列表
const getAllVideos = async (video_type, page = 1, limit = 9) => {
  const response = await apiClient.get(`/video/?video_type=${video_type}&page=${page}&limit=${limit}`);
  return response.data.data;
};

// 取得單一課程
const getCourseDetail = async (id) => {
  const response = await apiClient.get(`/course/${id}`);
  return response.data.data;
};

// 取得課程所有章節
const getCourseChapter = async (id) => {
  const response = await apiClient.get(`/course/${id}/chapters`);
  return response.data.sort((a, b) => a.sort_order - b.sort_order);
};

// 取得單一影片
const getVideoDetail = async (id) => {
  const response = await apiClient.get(`/video/${id}`);
  return response.data.data;
};

// 取得單一課程的留言
const getCourseComments = async (id) => {
  const response = await apiClient.get(`/videos/${id}/comments`);
  return response.data.data;
};

// 講師預約 - 取得單一講師6條影片影片
const getTutorVideosInBooking = async (tutorId = "", page = 1, sortBy = "rating", order = "DESC", limit = 6) => {
  const response = await apiClient.get(`/video?tutor_id=${tutorId}&page=${page}&sortBy=${sortBy}&order=${order}&limit=${limit}`);
  return response.data.data;
};

// 後台 - 取得單一講師所有課程
const getTutorCourses = async (tutorId = "", page = 1, sortBy = "rating", order = "DESC", limit = 6) => {
  const response = await apiClient.get(`/course?tutor_id=${tutorId}&page=${page}&sortBy=${sortBy}&order=${order}&limit=${limit}`);
  return response.data.data;
};

// 後台 - 取得單一講師所有影片
const getTutorVideos = async (tutorId = "", video_type = "", page = 1, sortBy = "rating", order = "DESC", limit = 6) => {
  const response = await apiClient.get(`/video?tutor_id=${tutorId}&video_type=${video_type}&page=${page}&sortBy=${sortBy}&order=${order}&limit=${limit}`);
  return response.data.data;
};

// 後台 - 新增課程
const addCourse = async (courseData) => {
  const response = await apiClient.post(`/course/`, courseData);
  return response;
};

// 後台 - 修改課程
const updateCourse = async (courseId, courseData) => {
  const response = await apiClient.put(`/course/${courseId}`, courseData);
  return response;
};

// 後台 - 刪除課程
const deleteCourse = async (courseId) => {
  const response = await apiClient.delete(`/course/${courseId}`);
  return response;
};

// 後台 - 新增章節
const addChapter = async (courseId, data) => {
  const response = await apiClient.post(`/course/${courseId}/chapters`, data);
  return response;
};

// 後台 - 刪除章節
const deleteChapter = async (courseId, chapterId) => {
  const response = await apiClient.delete(`/course/${courseId}/chapters/${chapterId}`);
  return response;
};

// 後台 - 新增影片
const addVideo = async (videoData) => {
  const response = await apiClient.post(`/video/`, videoData);
  return response;
};

// 後台 - 修改影片
const updateVideo = async (videoId, data) => {
  const response = await apiClient.put(`/video/${videoId}`, data);
  return response;
};

// 後台 - 刪除影片
const deleteVideo = async (videoId) => {
  const response = await apiClient.delete(`/video/${videoId}`);
  return response;
};

export default {
  getAllCourses,
  getAllVideos,
  getCourseDetail,
  getCourseChapter,
  getVideoDetail,
  getCourseComments,
  getTutorCourses,
  getTutorVideos,
  getTutorVideosInBooking,
  addCourse,
  updateCourse,
  deleteCourse,
  addChapter,
  deleteChapter,
  addVideo,
  updateVideo,
  deleteVideo,
};
