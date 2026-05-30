const API = axios.create({
  baseURL: import.meta.env.VITE_baseURL,
  withCredentials: true,
});
export const createSubmission=async(data)=>{
    const res=await API.post('/submission',data)
    return res.data
}
export const getAllSubmissions=async()=>{
    const res=await API.get('/submission')
    return res.data
}
export const updateSubmission=async(id,data)=>{
    const res=await API.put(`/submission/${id}`,data)
    return res.data
}
export const deleteSubmission=async(id)=>{
    const res=await API.delete(`/submission/${id}`)
    return res.data
}
export const evaluateSubmission=async(id,data)=>{
    const res=await API.put(`/submission/${id}/evaluate`,data)
    return res.data
}