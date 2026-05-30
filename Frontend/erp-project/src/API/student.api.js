import axios from 'axios'
const API = axios.create({
  baseURL: import.meta.env.VITE_baseURL,
  withCredentials: true,
});
export const createStudentAPI=async(data)=>{
    const res=await API.post("/student", data);
    return res.data
}
export const getSignalStudent=async(id)=>{
    const res=await API.get(`/student/${id}`)
        return res.data
} 
export const getAllStudent=async()=>{
    const res=await API.get('/student')
    return res.data
}
export const UpdateStudnetAPI=async(data,id)=>{
    const res=await API.put(`/student/${id}`)
    return res.data
}
export const deleteStudentAPI=async(id)=>{
    const res=await API.delete(`/student/${id}`)
    return res.data
}