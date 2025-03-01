import axiosInstance from "./axiosInstance.js ";

export const fetchTasks = async () => {
  const response = await axiosInstance.get("/tasks");
  return response.data;
};

export const updateTask = async (taskId, updatedData) => {
  const response = await axiosInstance.put(`/tasks/${taskId}`, updatedData);
  return response.data;
};

export const deleteTask = async (taskId) => {
  await axiosInstance.delete(`/tasks/${taskId}`);
};
