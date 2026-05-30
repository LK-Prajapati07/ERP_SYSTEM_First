import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_baseURL,
  withCredentials: true,
});

export const apiPostFirebaseLogin = async (data) => {
  const response = await API.post("/login/firebase-login", data);
  return response.data;
};

export default API;
