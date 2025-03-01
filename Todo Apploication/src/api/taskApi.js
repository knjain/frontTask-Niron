import axiosInstance from "./axiosInstance";

export const fetchTasks = async () => {
  const response = await axiosInstance.get("/tasks");
  return response.data;
};

export const updateTaskAPI = async (taskId, updatedData) => {
  const response = await axiosInstance.put(`/tasks/${taskId}`, updatedData);
  return response.data;
};

export const deleteTask = async (taskId) => {
  await axiosInstance.delete(`/tasks/${taskId}`);
};

export const createTask = async (taskData) => {
  const response = await axiosInstance.post("/tasks",taskData);
  return response.data;
};