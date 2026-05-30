import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_baseURL,
  withCredentials: true,
});
export const createAssignment=async(data)=>{
    const res=await API.post("/assignment/create/assignment",data)
    return res.data;
}
export const getAllAssignments=async()=>{
    const res=await API.get("/assignment/")
    return res.data;
}
export const getAssignmentById=async(id)=>{
    const res=await API.get(`/assignment/${id}`)
    return res.data;
}
export const updateAssignment=async(id,data)=>{
    const res=await API.put(`/assignment/update/${id}`,data)
    return res.data;
}
export const deleteAssignment=async(id)=>{
    const res=await API.delete(`/assignment/delete/${id}`)
    return res.data;
}
