import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_baseURL,
  withCredentials: true,
});
export const createCheatingLog = async (data) => {
  const res = await API.post("/cheating", data);
  return res.data;
};
export const getAllCheatingLogs = async () => {
  const res = await API.get("/cheating");
  return res.data;
};
export const getCheatingLogById=async(id)=>{
    const res=await API.get(`/cheating/${id}`)
    return res.data
}
export const getStudentCheatingLogs=async(studentId)=>{
    const res=await API.get(`/cheating/student/${studentId}`)
    return res.data
}
export const updateCheatingLog=async(id,data)=>{
    const res=await API.put(`/cheating/${id}`,data)
    return res.data
}
export const deleteCheatingLog=async(id)=>{
    const res=await API.delete(`/cheating/${id}`)
    return res.data
}
