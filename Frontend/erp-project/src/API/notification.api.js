import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_baseURL,
  withCredentials: true,
});
export const createNotification=async(data)=>{
    const res=await API.post('/notification/create',data)
    return res.data
}
export const getAllNotifications=async()=>{
    const res=await API.get('/notification')
    return res.data
}
export const getNotificationById=async(id)=>{
    const res=await API.get(`/notification/${id}`)
    return res.data
}
export const deleteNotification=async(id)=>{
    const res=await API.delete(`/notification/delete/${id}`)
    return res.data
}