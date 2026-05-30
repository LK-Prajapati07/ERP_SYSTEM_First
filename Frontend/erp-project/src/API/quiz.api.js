import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_baseURL,
  withCredentials: true,
});
export const createQuiz=async()=>{
    const response=await API.post("/quiz",data)
    return response.data
}
export const generateQuizAI=async(data)=>{
    const response=await API.post("/quiz/generate-ai",data)
    return response.data
}
export const getAllQuizzes=async()=>{
    const response=await API.get("/quiz")
    return response.data
}
export const getQuizById=async(id)=>{
    const response=await API.get(`/quiz/${id}`)
    return response.data
}
export const updateQuiz=async(id,data)=>{
    const response=await API.put(`/quiz/${id}`,data)
    return response.data
}
export const deleteQuiz=async(id)=>{
    const response=await API.delete(`/quiz/${id}`)
    return response.data
}
export const startQuiz=async(data)=>{
    const response=await API.post("/quiz/start",data)
    return response.data
}