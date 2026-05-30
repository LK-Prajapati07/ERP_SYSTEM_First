import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_baseURL,
  withCredentials: true,
});
export const createExamSchedule = async (data) => {
  const res = await API.post("/examSchedule", data);
  return res.data;
}
export const getAllExamSchedules = async () => {
  const res = await API.get("/examSchedule");
  return res.data;
}
export const getExamScheduleById = async (id) => {
  const res = await API.get(`/examSchedule/${id}`);
  return res.data;
}
export const getExamScheduleBySemester = async (semester) => {
  const res = await API.get(`/examSchedule/semester/${semester}`);
  return res.data;
}
export const updateExamSchedule = async (id, data) => {
  const res = await API.put(`/examSchedule/${id}`, data);
  return res.data;
}
export const publishExamSchedule = async (id) => {
  const res = await API.put(`/examSchedule/${id}/publish`);
  return res.data;
}
export const deleteExamSchedule = async (id) => {
  const res = await API.delete(`/examSchedule/${id}`);
  return res.data;
}