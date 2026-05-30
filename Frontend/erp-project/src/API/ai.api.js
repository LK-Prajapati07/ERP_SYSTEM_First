import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_baseURL,
  withCredentials: true,
});
export const evaluateAssignmentAI=async (submissionId) => {
  try {
    const response = await API.post(`/ai/evaluate-assignment/${submissionId}`);
    return response.data;
    } catch (error) {
    console.error("Error evaluating assignment:", error);
    throw error;
  }
};
export const generateSummaryAI=async (documentId) => {
  try {
    const response = await API.post(`/ai/generate-summary`, { documentId });
    return response.data;
    } catch (error) {
    console.error("Error generating summary:", error);
    throw error;
  }
};
export const chatWithNotesAI=async (question, documentId, studentId) => {
  try {
    const response = await API.post(`/ai/chat-with-notes`, { question, documentId, studentId });
    return response.data;
    } catch (error) {
    console.error("Error chatting with notes:", error);
    throw error;
  }
}
export const plagiarismCheckAI=async (submissionId) => {
  try {
    const response = await API.post(`/ai/check-plagiarism/${submissionId}`);
    return response.data;
    }catch(error) {
    console.error("Error checking plagiarism:", error);
    throw error;
  }
}
