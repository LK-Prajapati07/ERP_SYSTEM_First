import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_baseURL,
  withCredentials: true,
});
export const createTeacher=async(data)=>{
    const res=await API.post('/teacher',data)
    return res.data
}
export const getAllTeacher=async()=>{
    const res=await API.get('/teacher')
    return res.data
}
export const getTeacherById=async(id)=>{
    const res=await API.get(`/teacher/${id}`)
    return res.data
}
export const getTeacherSubjects=async(id)=>{
    const res=await API.get(`/teacher/${id}/subjects`)
    return res.data
}
export const updateTeacher=async(id,data)=>{
    const res=await API.put(`/teacher/${id}`,data)
    return res.data
}
export const deleteTeacher=async(id)=>{
    const res=await API.delete(`/teacher/${id}`)
    return res.data
}