import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_baseURL,
  withCredentials: true,
});
export const startQuizAttempt=async(data)=>{
    const res=await API.post('/quizAttempt/start',data)
    return res.data
}
export const submitQuizAttempt=async(attemptId,data)=>{
    const res=await API.put(`/quizAttempt/${attemptId}/submit`,data)
    return res.data
}
export const getAttemptById=async(id)=>{
    const res=await API.get(`/quizAttempt/${id}`)
    return res.data
}
export const GetStudentQuizAttempts=async(studentId)=>{
    const res=await API.get(`/quizAttempt/student/${studentId}`)
    return res.data
}
export const getupdateCheatingData=async(attemptId,data)=>{
    const res=await API.put(`/quizAttempt/${attemptId}/cheating`,data)
    return res.data
}
export const deleteQuizAttempt=async(id)=>{
    const res=await API.delete(`/quizAttempt/${id}`)
    return res.data
}