export const API_URL = "http://localhost:5000/api";

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// <-- ADD THIS FUNCTION
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
