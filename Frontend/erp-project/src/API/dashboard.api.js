import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_baseURL,
  withCredentials: true,
});
export const createDashboardAnalytics=async(data)=>{
    const response=await API.post('/dashboard',data)
    return response.data
}
export const getAllDashboardAnalytics=async()=>{
    const res=await API.get('/dashboard')
    return res.data
}
export const getDashboardAnalyticsById=async(id)=>{
    const res=await API.get(`/dashboard/${id}`)
    return res.data
}
export const getStudentDashboard=async()=>{
    const res=await API.get('/dashboard/student')
    return res.data
}
export const getTeacherDashboard=async()=>{
    const res=await API.get('/dashboard/teacher')
    return res.data
}
export const deleteDashboardAnalytics=async(id)=>{
    const res=await API.delete(`/dashboard/${id}`)
    return res.data
};