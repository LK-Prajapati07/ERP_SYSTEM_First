import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_baseURL,
  withCredentials: true,
});
export const markAttendance = async (data) => {
    const response = await API.post("/attendence/mark-attendance", data);
    return response.data;
}
export const getAttendanceByStudentId = async (id) => {
    const res=await API.get(`/attendence/student/${id}`);
    return res.data;
}
export const getAttendanceBySubjectId = async (id) => {
    const res=await API.get(`/attendence/subject/${id}`);
    return res.data;
}
export const updateAttendance = async (id,data) => {
    const res=await API.put(`/attendence/update/${id}`,data);
    return res.data;
}
export const deleteAttendance = async (id) => {
    const res=await API.delete(`/attendence/delete/${id}`);
    return res.data;
}
