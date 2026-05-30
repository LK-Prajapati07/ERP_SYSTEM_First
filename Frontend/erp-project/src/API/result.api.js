import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_baseURL,
  withCredentials: true,
});
export const createResult=async(data)=>{
    const res=await API.post('/result/create',data)
    return res.data
}
export const GetStudentResult=async(studentId)=>{
    const res=await API.get(`/result/student/${studentId}`)
    return res.data
}
export const GetAllResults=async()=>{
    const res=await API.get('/result/')
    return res.data
}
export const UpdateResult=async(id,data)=>{
    const res=await API.put(`/result/update/${id}`,data)
    return res.data
}
export const DeleteResult=async(id)=>{
    const res=await API.delete(`/result/delete/${id}`)
    return res.data
}