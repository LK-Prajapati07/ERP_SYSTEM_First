import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_baseURL,
  withCredentials: true,
});
export const createExam=async (examData) => {
  try {
    const response = await API.post("/exam", examData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAllExams = async () => {
  try {
    const response = await API.get("/exam");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const getExamById = async (id) => {
  try {
    const response = await API.get(`/exam/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
export const updateExam = async (id, examData) => {
  try {
    const response = await API.put(`/exam/${id}`, examData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
export const deleteExam = async (id) => {
  try {
    const response = await API.delete(`/exam/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
export const getExamsBySubject = async (subjectId) => {
  try {
    const response = await API.get(`/exam/subject/${subjectId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}