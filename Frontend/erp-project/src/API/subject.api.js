import axios from 'axios'
const API = axios.create({
  baseURL: import.meta.env.VITE_baseURL,
  withCredentials: true,
});
export const createSubject=async(data)=>{
    const res=await API.post("/subject", data);
    return res.data
}
export const getAllSubject=async()=>{
    const res=await API.get('/subject')
    return res.data
}
export const getSignalSubject=async(id)=>{
    const res=await API.get(`/subject/${id}`)
        return res.data
}
export const UpdateSubjectAPI=async(id,data)=>{
    const res=await API.put(`/subject/${id}`,data)
    return res.data
}
export const AssignTeacherToSubject=async(id,data)=>{
    const res=await API.post(`/subject/${id}/assign-teacher`,data)
    return res.data
}

export const deleteSubjectAPI=async(id)=>{
    const res=await API.delete(`/subject/${id}`)
    return res.data
}