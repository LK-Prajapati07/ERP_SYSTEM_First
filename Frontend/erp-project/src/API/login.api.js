import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_baseURL,
  withCredentials: true,
});

export const apiPostFirebaseLogin = async (data) => {
  const response = await API.post("/login/firebase-login", data);
  return response.data;
};
export const apiPostLogout=async(data)=>{
  const res=await API.post("/login/logout",data)
  return res.data
}

export const apiGetLogin=async()=>{
  const res=await API.get('/login/me')
  return res.data
}



