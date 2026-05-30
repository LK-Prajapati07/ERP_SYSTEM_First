import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_baseURL,
  withCredentials: true,
});
export const uploadNotes = async (formData) =>{
    const res = await API.post("/notes/upload", formData);
    return res.data;
}
export const getAllNotes=async()=>{
    const res = await API.get("/notes");
    return res.data;
}
export const getNotesBySubject=async(subjectId)=>{
    const res = await API.get(`/notes/subject/${subjectId}`);
    return res.data;
}
export const updateNotes=async(id,updatedData)=>{
    const res = await API.put(`/notes/update/${id}`,updatedData);
    return res.data;
}
export const deleteNote=async(id)=>{
    const res = await API.delete(`/notes/delete/${id}`);
    return res.data;
}