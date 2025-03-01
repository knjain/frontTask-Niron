import axiosInstance from "./axiosInstance.js ";

export const loginUser = async (userData) => {
  const response = await axiosInstance.post("/loginUser", userData);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await axiosInstance.post("/createNewUser", userData);
  return response.data;
};
