import axios from "axios";

export const API_URL = "http://localhost:5000/api";

export const register = async (email, password, userType) => {
  return axios.post(`${API_URL}/register`, { email, password, userType });
};

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email,
    password,
  });
  if (response.data.user) {
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("userType", JSON.stringify(response.data.userType));
    localStorage.setItem("stream", JSON.stringify(response.data.stream));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
