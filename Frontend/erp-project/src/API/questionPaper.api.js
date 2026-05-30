import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_baseURL,
  withCredentials: true,
});
export const createQuestionPaper = async (data) => {
  const response = await API.post("/questionPaper/create", data);
  return response.data;
};
export const generateQuestionPaperAI = async (data) => {
  const response = await API.post("/questionPaper/generate-ai", data);
  return response.data;
};
export const getAllQuestionPapers = async () => {
  const response = await API.get("/questionPaper");
  return response.data;
};
export const getQuestionPaperById = async (id) => {
  const response = await API.get(`/questionPaper/${id}`);
  return response.data;
};
export const updateQuestionPaper = async (id, data) => {
  const response = await API.put(`/questionPaper/update/${id}`, data);
  return response.data;
};
export const deleteQuestionPaper = async (id) => {
  const response = await API.delete(`/questionPaper/delete/${id}`);
  return response.data;
}