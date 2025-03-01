import apiClient from "./apiClient";

/* ---------------------------------- 基本資料 ---------------------------------- */

// 取得講師列表
const getAllTutor = async (page = 1, sortBy = "rating", order = "DESC", search = "", limit = 9) => {
  const response = await apiClient.get(`/tutor?page=${page}&sortBy=${sortBy}&order=${order}&search=${search}&limit=${limit}`);
  return response.data.data;
};

// 取得單一講師資料
const getTutorDetail = async (tutorId) => {
  const response = await apiClient.get(`/tutor/${tutorId}`);
  return response.data;
};

// 更新講師資料 (部分)
const updateTutorData = async (tutorId, data) => {
  const response = await apiClient.patch(`/tutor/${tutorId}`, data);
  return response.data;
};

/* ---------------------------------- 工作經驗 ---------------------------------- */

// 工作經驗 - 取得資料
const getExp = async (tutorId) => {
  const response = await apiClient.get(`/tutor/${tutorId}/experiences`);
  return response.data;
};

// 工作經驗 - 新增資料
const addExp = async (tutorId, data) => {
  const response = await apiClient.post(`/tutor/${tutorId}/experiences`, data);
  return response.data;
};

// 工作經驗 - 更新資料
const updateExp = async (tutorId, data, expId) => {
  const response = await apiClient.put(`/tutor/${tutorId}/experiences/${expId}`, data);
  return response.data;
};

// 工作經驗 - 刪除資料
const deleteExp = async (tutorId, expId) => {
  const response = await apiClient.delete(`/tutor/${tutorId}/experiences/${expId}`);
  return response.data;
};

/* ---------------------------------- 學歷 ---------------------------------- */

// 學歷 - 取得資料
const getEdu = async (tutorId) => {
  const response = await apiClient.get(`/tutor/${tutorId}/educations`);
  return response.data;
};

// 學歷 - 新增資料
const addEdu = async (tutorId, data) => {
  const response = await apiClient.post(`/tutor/${tutorId}/educations`, data);
  return response.data;
};

// 學歷 - 更新資料
const updateEdu = async (tutorId, data, eduId) => {
  const response = await apiClient.put(`/tutor/${tutorId}/educations/${eduId}`, data);
  return response.data;
};

// 學歷 - 刪除資料
const deleteEdu = async (tutorId, eduId) => {
  const response = await apiClient.delete(`/tutor/${tutorId}/educations/${eduId}`);
  return response.data;
};

/* ---------------------------------- 證照 ---------------------------------- */

// 證照 - 取得資料
const getCertificate = async (tutorId) => {
  const response = await apiClient.get(`/tutor/${tutorId}/certificates`);
  return response.data;
};

// 證照 - 新增資料
const addCertificate = async (tutorId, data) => {
  const response = await apiClient.post(`/tutor/${tutorId}/certificates`, data);
  return response.data;
};

// 證照 - 更新資料
const updateCertificate = async (tutorId, data, certificateId) => {
  const response = await apiClient.put(`/tutor/${tutorId}/certificates/${certificateId}`, data);
  return response.data;
};

// 證照 - 刪除資料
const deleteCertificate = async (tutorId, certificateId) => {
  const response = await apiClient.delete(`/tutor/${tutorId}/certificates/${certificateId}`);
  return response.data;
};

/* ---------------------------------- 可預約時段 ---------------------------------- */

// 講師頁面的Timetable
const getAvailability = async (tutorId, baseDate) => {
  const response = await apiClient.get(`/tutor/${tutorId}/availability/?baseDate=${baseDate}`);
  return response.data;
};

// 講師後台的設定可預約時間
const getAllDayOfWeekAvailability = async (tutorId) => {
  const response = await apiClient.get(`/tutor/${tutorId}/businessHours`);
  return response.data.data;
};

// 講師後台的設定可預約時間 - 更新一個day of week的時間
const updateDayOfWeekAvailability = async (tutorId, dayOfWeek, timeslots) => {
  const response = await apiClient.put(`/tutor/${tutorId}/time-blocks/${dayOfWeek}`, timeslots);
  return response.data;
};

// 講師後台的設定可預約時間 - 刪除整個一個day of week的所有時間
const deleteDayOfWeekAvailability = async (tutorId, dayOfWeek) => {
  const response = await apiClient.delete(`/tutor/${tutorId}/time-blocks/${dayOfWeek}`);
  return response.data;
};

export default {
  getAllTutor,
  getTutorDetail,
  updateTutorData,
  getExp,
  addExp,
  updateExp,
  deleteExp,
  getEdu,
  addEdu,
  updateEdu,
  deleteEdu,
  getCertificate,
  addCertificate,
  updateCertificate,
  deleteCertificate,
  getAvailability,
  updateDayOfWeekAvailability,
  getAllDayOfWeekAvailability,
  deleteDayOfWeekAvailability,
};
